import React, { useEffect, useState } from "react";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import {
  Home,
  Search,
  SearchMap,
  DynamicViewTypeStatic,
  Reserve,
  MyAccount,
  StorageCalculator
} from "../../views";
import { SignIn } from "../../views/SignIn";
import { ForgotPassword } from "../../views/ForgotPassword";
import MissingUnits from "../../views/MissingUnits";
import MissingUnitsNew from "../../views/MissingUnitsNew";
import _ from "lodash";
import SelectedLocation from "../../views/SelectedLocation";
import { gqlRequest } from "../../utils";
import client from "../../apollo";
import { SearchResultsQuery } from "../../graphql/searchResults";
import { SearchAutocomplete } from '../../graphql/searchAutocomplete';
import AppHeader from "../../components/AppHeader";
import Footer from "../../components/Footer";
import { Hidden } from "@material-ui/core";

export const MainView = (props) => {

  const {
    components,
    sizes,
    types,
    locationsData,
    latLng,
    footer,
    nav,
    routes,
    loggedIn
  } = props;

  const [currentUser, setCurrentUser] = useState(false);
  const [searching, setSearching] = useState(false);
  const [fullPropertyList, setFullPropertyList] = useState(null);
  const [propertyList, setPropertyList] = useState(null);
  const [queryString, setQueryString] = useState('');
  const [searchLatLng, setSearchLatLng] = useState(null);
  const [typeFormDetails, setTypeFormDetails] = useState({ 
    cc: false,
    pk: false,
    du: false,
    wn: false,
    pr: false,
    ff: false
  });
  const [sizeFormDetails, setSizeFormDetails] = useState({
    sm: false,
    md: false,
    lg: false,
    xl: false
  });

  let history = useHistory();

  useEffect(() => {

    // if signing in set current user and navigate to my account
    // if refresh check local storage and stay on current page
    // else nothing
    console.log(
      'current user',
      JSON.parse(localStorage.getItem('currentUser')),
      currentUser
    );

    if (JSON.parse(localStorage.getItem('currentUser')) && !currentUser) {

      console.log('current user from localstorage');
      setCurrentUser(JSON.parse(localStorage.getItem('currentUser')));
    }
    
  }, []);

  useEffect(() => {

    // --- GET NEW PROPERTIES ---

    // validate search attempt
    if (searching) {

      // set any filters
      addFiltersFromLocalStorage();

      // determine if a selection has been made
      if (searchLatLng?.city || searchLatLng?.zip) {

        // try by selection
        getLocationsBySelectedLocation();

      } else if (searchLatLng?.state_id) {

        // try by state
        getLocationsByState();

      } else if (
        JSON.parse(localStorage.getItem('lastProperties')) && 
        window.location.href.includes('find-storage')
      ) {

        // local storage locations
        getLocationsByLocalStorage();

      } else if (latLng.length > 0) {

        // no selection: try by user position
        getLocationsByUserPosition();

      } else {

        // searching set, but nothing to search by, show map
        navigateToMap();
      }

      // toggle searching
      setSearching(false);
    }

  }, [searching]);

  useEffect(() => {

    // --- APPLY ANY FILTERS ---

    if (fullPropertyList) {

      console.log('PROCESS LOCATIONS WITH FILTERS');
      // set propertties
      setProperties();
    }

  }, [fullPropertyList]);

  useEffect(() => {

    if (propertyList) {

      console.log('NAVIGATE TO SEARCH');
      // valid location selected
      const newLocation = {
        pathname: `/find-storage`
      };
  
      history.push(newLocation);
    }

  }, [propertyList]);

  useEffect(() => {

    // --- Filter Change ---

    if (propertyList && window.location.href.includes('find-storage')) {

      console.log('FILTER CHANGE EFFECT');
      // refresh properties
      setProperties();

      // save current fitler state
      localStorage.setItem('typeFilters', JSON.stringify(typeFormDetails));
      localStorage.setItem('sizeFilters', JSON.stringify(sizeFormDetails));
    }

  }, [typeFormDetails, sizeFormDetails]);

  const getLocationsByLocalStorage = () => {

    console.log('GET LOCATIONS BY LOCAL STORAGE');

    // localStorage - Properties, Query String for search bar and Lat Lng obj of last search
    const localProperties = JSON.parse(localStorage.getItem('lastProperties'));
    const locationQueryString = JSON.parse(localStorage.getItem('locationQueryString'));
    const latLngObj = JSON.parse(localStorage.getItem('latLngObj'));
    const queryString = JSON.parse(localStorage.getItem('locationQueryString'));

    if (localProperties) setFullPropertyList(localProperties)
    if (locationQueryString) setQueryString(locationQueryString)
    if (latLngObj) setSearchLatLng(latLngObj)
    if (queryString) setQueryString(queryString)
  };

  const getLocationsBySelectedLocation = () => {

    // city / zip
    gqlRequest(client, SearchResultsQuery(searchLatLng.lat, searchLatLng.lng, latLng[0], latLng[1], 50, 10))
      .then(res => {

        console.log('location res', res)

        // search results
        const removeNonTypes = res.data.getLocationsByCoordinates.filter(x => x.types?.length > 0);

        if (removeNonTypes.length > 0) {

          console.log('RESULTS FOUND BY CITY / ZIP', removeNonTypes);

          // properties found for city or zip
          setFullPropertyList(removeNonTypes);
          localStorage.setItem('lastProperties', JSON.stringify(removeNonTypes));

        } else {
          
          console.log('NO RESULTS BY CITY / ZIP');
          // properties not found for city or zip: search by state
          getLocationsByState();
        }
      });
  };

  const getLocationsByState = () => {

    // state
    gqlRequest(client, SearchResultsQuery(searchLatLng.lat, searchLatLng.lng, searchLatLng.lat, searchLatLng.lng, 10000, 25))
      .then(res => {

        // search results: filter for state
        const onlyState = res.data.getLocationsByCoordinates.filter(x => (!!x.types && x.state === searchLatLng?.state_id));

        if (onlyState.length > 0) {

          console.log('RESULTS BY STATE', onlyState);

          setFullPropertyList(onlyState);
          localStorage.setItem('lastProperties', JSON.stringify(onlyState));
          localStorage.setItem('locationQueryString', JSON.stringify(searchLatLng?.state_name));
          localStorage.setItem('latLngObj', JSON.stringify(onlyState[0]));

        } else {

          console.log('NO RESULTS BY STATE');
          navigateToMap();
        }
      });
  };

  const searchByState = state => {

    // Search by state from footer or drawer
    console.log('STATE SEARCHING', state);
    setQueryString(state);
    gqlRequest(client, SearchAutocomplete(state, null, null))
      .then(res => {

        console.log('STATE SEARCHING AUTOCOMPLETE', res);

        const result = res.data.searchAutoComplete.filter(x => x.state_name === state)[0];
        setSearchLatLng({...result});
        localStorage.setItem('locationQueryString', JSON.stringify(state));
        localStorage.setItem('latLngObj', JSON.stringify(result));

        console.log('SEARCHED BY STATE LINK', result);
        setSearching(true);
      });
  };

  const getLocationsByUserPosition = () => {

    // user lat lng
    gqlRequest(client, SearchResultsQuery(latLng[0], latLng[1], latLng[0], latLng[1], 50, 10))
      .then(res => {

        // search results
        const removeNonTypes = res.data.getLocationsByCoordinates.filter(x => x.types?.length > 0);

        if (removeNonTypes.length > 0) {

          console.log('RESULTS FOUND BY USER LAT LNG', removeNonTypes);

          // properties found for city or zip
          setFullPropertyList(removeNonTypes);
          localStorage.setItem('lastProperties', JSON.stringify(removeNonTypes));

        } else {
          
          // no results by user position: show map
          navigateToMap();
        }
      });
  };

  const navigateToMap = () => {

    // location not valid
    const newLocation = {
      pathname: '/map',
    };

    history.push(newLocation);
  };

  const setProperties = () => {

    console.log('APPLY FILTERS TO RESULTS', fullPropertyList);

    // check for all unselected
    let allTypeUnselect = [];
    Object.entries(typeFormDetails).map(x => allTypeUnselect = [...allTypeUnselect, x[1]]);

    // filter by type
    let filteredByTypeProperties = [];
    if (allTypeUnselect.includes(true)) {

      [...fullPropertyList].map(property => {

        // check for types
        property.tags.map(tag => {

          if (typeFormDetails[tag]) {
            filteredByTypeProperties = [...filteredByTypeProperties, property];
          }
        });
      });
    } else filteredByTypeProperties = fullPropertyList;

    // check for all unselected
    let allSizeUnselect = [];
    Object.entries(sizeFormDetails).map(x => allSizeUnselect = [...allSizeUnselect, x[1]]);

    // filter by size
    let filteredBySizeProperties = [];
    if (allSizeUnselect.includes(true)) {

      [...filteredByTypeProperties].map(property => {

        // check for types
        property.tags.map((tag, i) => {

          if (sizeFormDetails[tag]) {
            filteredBySizeProperties = [...filteredBySizeProperties, property];
          }
        });
      });
    } else filteredBySizeProperties = filteredByTypeProperties;

    // remove any duplicates
    const removeDuplicates = filteredBySizeProperties.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i);


    // --- Filter Types ---

    // selected filters
    let typeFilters = [];
    Object.entries(typeFormDetails).map(filter => {
      if (filter[1]) typeFilters = [...typeFilters, filter[0]];
    });

    let sizeFilters = [];
    Object.entries(sizeFormDetails).map(filter => {
      if (filter[1]) sizeFilters = [...sizeFilters, filter[0]];
    });

    // update which types to show
    let finalFilter = removeDuplicates.map(property => {

      if (property.types) {

        // determine if type has correct active tag
        let filterOne = property.types.map(type => {

          let hasFilter = false;

          if (type) {

            type.tags.map(tag => {
              if (typeFilters.includes(tag)) hasFilter = true;
            });
  
            if (hasFilter || typeFilters.length === 0) return type;
          }

        }).filter(x => (!!x && x.price !== 0 && x.length !== 0 && x.width !== 0));

        // determine if type has correct size tag
        let filterTwo = filterOne.map(type => {

          let hasFilter = false;

          if (type) {

            type.tags.map(tag => {
              if (sizeFilters.includes(tag)) hasFilter = true;
            });
  
            if (hasFilter || sizeFilters.length === 0) return type;
          }

        }).filter(x => (!!x && x.price !== 0 && x.length !== 0 && x.width !== 0));

        // only show one per size
        const small = filterTwo.filter(type => type.tags.includes('sm'));
        const medium = filterTwo.filter(type => type.tags.includes('md'));
        const large = filterTwo.filter(type => type.tags.includes('lg'));
        const extraLarge = filterTwo.filter(type => type.tags.includes('xl'));

        // get vacant count for size
        let smallCount = 0;
        let mediumCount = 0;
        let largeCount = 0;
        let extraLargeCount = 0;
        
        small.map(type => smallCount = smallCount + type.total_vacant);
        medium.map(type => mediumCount = mediumCount + type.total_vacant);
        large.map(type => largeCount = largeCount + type.total_vacant);
        extraLarge.map(type => extraLargeCount = extraLargeCount + type.total_vacant);

        // deterrmine whether to show single or 4 types
        // no filters: 1 of each available
        // 1 size selected: up to 4 of specific size
        const isFiltered = allSizeUnselect.includes(true);
        console.log('is filtered', isFiltered);
        const types = isFiltered ? filterTwo.map((x, i) => {
          if (i < 4) return { ...x, count: x.total_vacant }
        }).filter(x => x) :
        [
          { ...small[0], count: smallCount },
          { ...medium[0], count: mediumCount },
          { ...large[0], count: largeCount },
          { ...extraLarge[0], count: extraLargeCount }
        ].filter(x => x.id);

        return {
          ...property,
          types,
          totalVacantCount: smallCount + mediumCount + largeCount + extraLargeCount,
        }
      }
    });

    // remove any locations with no types available
    finalFilter = [...finalFilter].filter(x => x.types.length > 0);

    console.log('PROPERTIES READY TO RENDER', finalFilter);
    setPropertyList(finalFilter);
  };


  // --- Filters ---
  const addFiltersFromLocalStorage = () => {

    console.log('ADD FILTERS FROM LOCAL STORAGE');
    const typeFilters = JSON.parse(localStorage.getItem('typeFilters'));
    const sizeFilters = JSON.parse(localStorage.getItem('sizeFilters'));
    if (typeFilters) setTypeFormDetails(typeFilters)
    if (sizeFilters) setSizeFormDetails(sizeFilters)
  }

  const typeChange = tag => {

    let newVal = { ...typeFormDetails };
    newVal[`${tag}`] = !newVal[tag];
    setTypeFormDetails(newVal);
    
    console.log('UPDATE TYPE FILTER LOCAL STORAGE');
    localStorage.setItem('typeFilters', JSON.stringify(newVal));
  };

  const sizeChange = tag => {

    let newVal = { ...sizeFormDetails };
    newVal[`${tag}`] = !newVal[tag];
    setSizeFormDetails(newVal);

    console.log('UPDATE SIZE FILTER LOCAL STORAGE');
    localStorage.setItem('sizeFilters', JSON.stringify(newVal));
  };

  const clearAllSize = () => {

    setSizeFormDetails({
      sm: false,
      md: false,
      lg: false,
      xl: false
    });

    localStorage.removeItem('sizeFilters');
  };

  const clearAllType = () => {
    
    setTypeFormDetails({ 
      cc: false,
      pk: false,
      du: false,
      wn: false,
      pr: false,
      ff: false
    });

    localStorage.removeItem('typeFilters');
  };

  const applyAllSize = size => {

    setSizeFormDetails(size);
    localStorage.setItem('sizeFilters', JSON.stringify(size));
  }

  const applyAllType = type => {

    setTypeFormDetails(type);
    localStorage.setItem('typeFilters', JSON.stringify(type));
  }

  // --- Search Autocomplete Select ---
  const setSearchField = (event, data) => {

    setQueryString(data.result.title);
    setSearchLatLng(data.result);

    localStorage.setItem('locationQueryString', JSON.stringify(data.result.title));
    localStorage.setItem('latLngObj', JSON.stringify(data.result));

    if (window.location.href.includes('find-storage')) {
      console.log('SELECTED FROM SEARCH PAGE');
      setSearching(true);
    }
  };

  const homeComponents = {
    homeSearch: "home search",
    threeSteps: "three steps",
    storageFeatures: "storage features",
    halfRowSections: "half_row_sections",
    testimonialsSection: "testimonials section",
    storageAssistant: "storage assistant",
  };

  Object.entries(homeComponents).forEach(k => {
    homeComponents[k[0]] = {
      ...components.filter(z => z.name === k[1])[0],
    };
  });

  
  const featuredCalculatorData = { 
    storageFeatures: "storage features" 
  };

  Object.entries(featuredCalculatorData).forEach(k => {
    featuredCalculatorData[k[0]] = {
      ...components.filter(z => z.name === k[1])[0],
    };
  });

  const searchComponents = {
    homeSearch: "home search",
    storageAssistant: "storage assistant",
  };

  Object.entries(searchComponents).forEach(k => {
    searchComponents[k[0]] = {
      ...components.filter(z => z.name === k[1])[0],
    };
  });

  const currentRoute = useLocation();
  const pathname = currentRoute.pathname.replace("/", "");
  const routeComponentMap = [
    {
      path: ["/privacy-policy", "/terms-of-service"],
      component: () => <DynamicViewTypeStatic pathname={pathname} />,
    },
    {
      path: "/storage_units/:state/:slug",
      component: () => (
        <SelectedLocation
          sizes={sizes}
          types={types}
          typeChange={typeChange}
          sizeChange={sizeChange}
          sizeFormDetails={sizeFormDetails}
          typeFormDetails={typeFormDetails}
          clearAllSize={clearAllSize}
          clearAllType={clearAllType}
          applyAllSize={applyAllSize}
          applyAllType={applyAllType}
          latLng={latLng}
        />
      ),
    },
    {
      path: "/reserve",
      component: () => <Reserve />,
    },
    {
      path: "/login",
      component: () => <SignIn setCurrentUser={setCurrentUser} />,
    },
    {
      path: "/forgot-password",
      component: () => <ForgotPassword />,
    },
    {
      path: "/missing",
      component: () => <MissingUnits pathname={pathname} locationsData={locationsData} />
    }, {
      path: "/map",
      component: () => <SearchMap searchByState={searchByState} />
    },
    {
      path: "/missing-new",
      component: () => <MissingUnitsNew setCurrentUser={setCurrentUser} pathname={pathname} locationsData={locationsData} />
    },
  ];

  return (
    <>
      <AppHeader
        footerItems={footer}
        nav={nav}
        routes={routes}
        loggedIn={loggedIn}
        searchByState={searchByState}
        setSearching={setSearching}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />

      <Switch>
        { routeComponentMap.map((x, y) => (
          <Route key={x.path + y} path={x.path} component={x.component} />
        ))}

        { routes.map((r) => (
          <Route exact key={r.path} path={r.path}>
            {r.path === "/" ? (
              <Home
                components={homeComponents}
                sizeFormDetails={sizeFormDetails}
                typeFormDetails={typeFormDetails}
                sizeChange={sizeChange}
                typeChange={typeChange}
                setSearchField={setSearchField}
                searchLatLng={searchLatLng}
                setSearchLatLng={setSearchLatLng}
                queryString={queryString}
                setQueryString={setQueryString}
                latLng={latLng}
                setSearching={setSearching}
              />
            ) : r.path === "/find-storage" ? (
              <Search
                sizes={sizes}
                types={types}
                routeState={currentRoute}
                components={searchComponents}
                sizeFormDetails={sizeFormDetails}
                typeFormDetails={typeFormDetails}
                latLng={latLng}
                sizeChange={sizeChange}
                typeChange={typeChange}
                setSearchField={setSearchField}
                searchLatLng={searchLatLng}
                setSearchLatLng={setSearchLatLng}
                queryString={queryString}
                setQueryString={setQueryString}
                propertyList={propertyList}
                setPropertyList={setPropertyList}
                clearAllSize={clearAllSize}
                clearAllType={clearAllType}
                applyAllSize={applyAllSize}
                applyAllType={applyAllType}
                searchByState={searchByState}
                setSearching={setSearching}
              />
            ) : r.path === "/my-account" ? (
              <MyAccount
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                setSearching={setSearching}
              />
            ) : r.path === "/storage-calculator" ? (
              <StorageCalculator featuredCalculatorData={featuredCalculatorData} />
            ) : null}
          </Route>
        ))}
      </Switch>

      <Hidden smDown>
        <section style={{ visibility: window.location.href.includes('find-storage') ? 'hidden' : 'visible' }}>
          <Footer searchByState={searchByState} items={footer} />
        </section>
      </Hidden>
    </>
  );
};
