import React from "react";
import {
  FindStorage,
  ThreeSteps,
  NearbyLocations,
  StorageFeatures,
  HalfRowSections,
  Testimonials,
} from "../../components";

export const Home = (props) => {

  const {
    components = {},
    sizes,
    types,
    sizeFormDetails,
    typeFormDetails,
    sizeChange,
    typeChange,
    setSearchField,
    setSearchLatLng,
    searchLatLng,
    queryString,
    setQueryString,
    latLng,
    setSearching
  } = props;

  const {
    homeSearch,
    threeSteps,
    storageFeatures,
    halfRowSections,
    testimonialsSection,
  } = components;

  return (
    <>
      <FindStorage
        content={homeSearch}
        sizes={sizes}
        types={types}
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
      <ThreeSteps setSearching={setSearching} searchLatLng={searchLatLng} latLng={latLng} content={threeSteps} />
      { latLng &&
        <NearbyLocations type='home' latLng={latLng} />
      }
      <StorageFeatures content={storageFeatures} />
      <HalfRowSections setSearching={setSearching} searchLatLng={searchLatLng} latLng={latLng} content={halfRowSections} />
      <Testimonials content={testimonialsSection} />
    </>
  );
};