import React from "react";
import butter from "../../butter-client";
import { PageHero, TextSection } from "../../components";
import _ from "lodash";

export default function DynamicViewTypeStatic({ pathname }) {
  //
  console.log(pathname);
  const [heroFields, setHeroFields] = React.useState(false);
  const [bodyFields, setBodyFields] = React.useState(false);
  React.useEffect(() => {
    let butterPagePromise = butter.page.retrieve("*", pathname);
    Promise.all([butterPagePromise]).then((r) => {
      let butterPage = r[0].data.data;
      const heroFields = _.chain(butterPage)
        .get(["fields", "hero_section"], false)
        .find({ type: "hero" }, false)
        .get(["fields"], false)
        .value();

      const bodyFields = _.chain(butterPage)
        .get(["fields", "main_section"], false)
        .value();

      setHeroFields(heroFields);
      setBodyFields(bodyFields);
    });
  }, [pathname]);

  return (
    <React.Fragment>
      {heroFields && <PageHero {...heroFields} />}
      {bodyFields && <TextSection fields={bodyFields} />}
    </React.Fragment>
  );
}
