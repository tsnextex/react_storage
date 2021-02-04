import React, { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Dimmer, Loader, Segment } from "semantic-ui-react";
import _ from "lodash";

import { getToken, getGeoLocation } from "./helpers";
import { gqlRequest } from "./utils";
import client from "./apollo";
import butter from "./butter-client";
import { HomePageQuery } from "./graphql/homePage";
import { MainView } from "./components/MainView";

import "./App.css";

export const App = () => {
  const [loggedIn, setLoggenIn] = useState(true);
  const [footer, setFooter] = useState([]);
  const [nav, setNav] = useState([{ display_text: "loading..." }]);
  const [routes, setRoutes] = useState([
    { display_text: "Home", path: "/" },
    { display_text: "location", path: "/location" },
  ]);
  const [storageSizes, setStorageSizes] = useState([{ id: "0", name: "s" }]);
  const [storageTypes, setStorageTypes] = useState([{ id: "0", name: "s" }]);
  const [components, setComponents] = useState([]);
  const [latLng, setLatLng] = useState([]);
  const [loading, setLoading] = useState(true);

  // check for lat lng
  useEffect(() => {
    (async () => {
      const geo = await getGeoLocation();
      const pos = {
        lat: geo.loc.split(",")[0],
        lng: geo.loc.slice(geo.loc.lastIndexOf(",") + 1),
      };

      console.log("USER GEO", pos);
      setLatLng([pos.lat || null, pos.lng || null]);

      let p1 = butter.content.retrieve(
        [
          "routes",
          "footer",
          "top_navigation",
          "home_search_temp",
          "three_simple_steps",
          "storage_features",
          "half_row_sections",
          "testimonials_section",
          "storage_assistant",
        ],
        {
          "fields.level": "top",
        }
      );

      // Get token
      const token = getToken();
      let p0 = token
        ? token.then(() => gqlRequest(client, HomePageQuery()))
        : null;

      Promise.all([p1, p0]).then((results) => {
        let butterContents = results[0];

        let {
          routes,
          home_search_temp,
          three_simple_steps,
          storage_features,
          half_row_sections,
          testimonials_section,
          storage_assistant,
        } = butterContents.data.data;

        routes.push({ display_text: "Home", path: "/" });

        half_row_sections = {
          name: "half_row_sections",
          sections: half_row_sections,
        };

        const nav = butterContents.data.data.top_navigation;
        const footer = butterContents.data.data.footer;
        localStorage.setItem("footer", JSON.stringify(footer));

        components.push(
          ...[
            ...home_search_temp,
            ...three_simple_steps,
            ...storage_features,
            half_row_sections,
            ...testimonials_section,
            ...storage_assistant,
          ]
        );

        let apolloData = results[1];
        console.log({ APOLLO_DATA: apolloData });

        const storageSizes = _.chain(apolloData)
          .get(["data", "getCategories"], [])
          .find({ slug: "unit-sizes" }, {})
          .get(["subcategories"], [])
          .value();

        const storageTypes = _.chain(apolloData)
          .get(["data", "getCategories"], [])
          .find({ slug: "unit-types" }, {})
          .get(["subcategories"], [])
          .value();

        setComponents(components);
        setRoutes(routes);
        setFooter(footer);
        setNav(nav);
        setStorageSizes(storageSizes);
        setStorageTypes(storageTypes);
        setLoading(false);
      });
    })();
  }, []);

  return (
    <ApolloProvider client={client}>
      <section className="appContainer">
        {!!loading ? (
          <Segment style={{ height: "100vh" }}>
            <Dimmer active inverted>
              <Loader size="massive"></Loader>
            </Dimmer>
          </Segment>
        ) : (
          <Router>
            <MainView
              components={components}
              routes={routes}
              sizes={storageSizes}
              types={storageTypes}
              locationsData={footer}
              latLng={latLng}
              footer={footer}
              nav={nav}
              routes={routes}
              loggedIn={loggedIn}
            />
          </Router>
        )}
      </section>
    </ApolloProvider>
  );
};

export default App;
