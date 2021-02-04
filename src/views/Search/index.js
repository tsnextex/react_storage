import React, { useState, createRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CustomFindStorageContainer } from './style';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import { Grid, Hidden, Collapse } from "@material-ui/core";
import { FiltersRow, SearchBar, Map } from "./components";
import { FilteredResults } from "../../components";
import {
  _getSizeFilters,
  _getAmenityFilters,
  _getLocations,
} from "../../components/FilteredResults/utils";
import _ from "lodash";
import Footer from "../../components/Footer";
import { NoResults } from "../../components/NoResults";

export const Search = (props) => {

  const {
    components: {
      homeSearch: { placeholder = "" },
      storageAssistant = false,
    },
    sizes,
    types,
    pZeroData,
    latLng,
    sizeChange,
    typeChange,
    setSearchField,
    queryString,
    setQueryString,
    propertyList,
    sizeFormDetails,
    typeFormDetails,
    clearAllSize,
    clearAllType,
    applyAllSize,
    applyAllType,
    searchByState,
    setSearchLatLng,
    setSearching
  } = props;

  let history = useHistory();
  const sizeSelectRef = createRef();
  const typeSelectRef = createRef();
  const locations = _getLocations();

  // map-related state variables
  const [selectedPlace, selectPlace] = useState(null);
  const [activeMarker, activateMarker] = useState(null);
  const [showingInfoWindow, showInfoWindow] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);

  useEffect(() => {

    if (!propertyList) {

      console.log('ON SEARCH PAGE WITH NO RESULTS CHECK FOR RESULTS');
      setSearching(true);
    }
  }, []);

  const toggleMap = () => setMapVisible((x) => !x);

  const onMarkerClick = (props, marker, e) => {
    console.log('marker click', e)
    selectPlace(e);
    activateMarker(marker);
    showInfoWindow(true);
  };
  
  const handleLocationClick = (locationId) => {
    try {
      var mev = {
        stop: null,
        latLng: new window.google.maps.LatLng(26.711325, -80.053371),
      };
      window.google.maps.event.trigger("map", "click", mev);
    } catch {}
    const selectedLocation = locations.find((x) => x.code === locationId);
    selectPlace(selectedLocation);
  };

  const browseUnits = selectedLocation => {

    console.log('GO TO', selectedLocation);

    // navigate to location
    const newLocation = {
      pathname: selectedLocation.url
    };

    history.push(newLocation);
  };

  // Active Filters state hooks
  const [activeFilters, setActiveFilters] = useState({ size: [], type: [] });
  const [activeFilterTags, setActiveFilterTags] = useState({
    size: [],
    type: [],
  });

  // Active storage sizes logic
  const onActiveSizesChange = (e) => {
    const value = e.target.value;
    let valueTags = [];
    value.map((x) => {
      valueTags.push(_.chain(sizes).find({ name: x }).get("tag").value());
      return x;
    });

    setActiveFilters((prev) => ({ ...prev, size: value }));
    setActiveFilterTags((prev) => ({ ...prev, size: valueTags }));
  };

  // Active storage types logic
  const onActiveTypesChange = (e) => {
    const value = e.target.value;
    let valueTags = [];
    value.map((x) =>
      valueTags.push(_.chain(types).find({ name: x }).get("tag").value())
    );
    setActiveFilters((prev) => ({ ...prev, type: value }));
    setActiveFilterTags((prev) => ({ ...prev, type: valueTags }));
  };

  const removeFilter = (filter) => {

    let activeSizes = [...activeFilters.size];
    let activeTypes = [...activeFilters.type];
    let activeSizeTags = [...activeFilterTags.size];
    let activeTypeTags = [...activeFilterTags.type];
    let filterTag = _.chain([...sizes, ...types])
      .find({ name: filter })
      .get("tag")
      .value();

    // if filter is part of active size filters...
    if (activeSizes.indexOf(filter) > -1) {
      activeSizes = activeSizes.filter((x) => x !== filter);
    } else if (activeTypes.indexOf(filter) > -1) {
      activeTypes = activeTypes.filter((x) => x !== filter);
    }
    //
    if (activeSizeTags.indexOf(filterTag) > -1) {
      activeSizeTags = activeSizeTags.filter((x) => x !== filterTag);
    } else if (activeTypeTags.indexOf(filterTag) > -1) {
      activeTypeTags = activeTypeTags.filter((x) => x !== filterTag);
    }
    //
    setActiveFilters((prev) => ({ size: activeSizes, type: activeTypes }));
    setActiveFilterTags((prev) => ({
      size: activeSizeTags,
      type: activeTypeTags,
    }));
  };

  // Sidebar
  const [open, setOpen] = useState(false);
  const handleDrawerToggle = () => setOpen((x) => !x);

  const onSizeFilterClick = (tag = false) => {

    if (!!tag) {

      let activeSizes = [...activeFilters.size];
      // eslint-disable-next-line
      let activeTypes = [...activeFilters.type];
      let activeSizeTags = [...activeFilterTags.size];
      // eslint-disable-next-line
      let activeTypeTags = [...activeFilterTags.type];

      console.log(activeSizes);
      console.log(activeSizeTags);

      let filterFromTag = _.chain([...sizes, ...types])
        .find({ tag: tag })
        .value();

      if (activeSizes.indexOf(filterFromTag) > -1) {
        // remove size filter
        activeSizes = activeSizes.filter((x) => x !== filterFromTag);
      } else {
        // add the size filter
        activeSizes.push(filterFromTag);
      }
      console.log(activeSizes);

      if (activeSizeTags.indexOf(tag) > -1) {
        // remove size filter tag
        activeSizeTags = activeSizeTags.filter((x) => x !== tag);
      } else {
        // add the size filter tag
        activeSizeTags.push(tag);
      }

      // setActiveFilters((prev) => ({ size: activeSizes, type: activeTypes }));
      setActiveFilterTags((prev) => ({
        ...prev,
        size: activeSizeTags,
      }));
    }
  };

  const onTypeFilterClick = (tag = false) => {

    if (!!tag) {

      let activeTypes = [...activeFilters.type];
      let activeTypeTags = [...activeFilterTags.type];
      let filterFromTag = _.chain([...sizes, ...types])
        .find({ tag: tag })
        .value();

      if (activeTypes.indexOf(filterFromTag) > -1) {
        // remove type filter
        activeTypes = activeTypes.filter((x) => x !== filterFromTag);
      } else {
        // add the type filter
        activeTypes.push(filterFromTag);
      }
      if (activeTypeTags.indexOf(tag) > -1) {
        // remove type filter tag
        activeTypeTags = activeTypeTags.filter((x) => x !== tag);
      } else {
        // add the type filter tag
        activeTypeTags.push(tag);
      }

      // setActiveFilters((prev) => ({ ...prev, type: activeTypes }));
      setActiveFilterTags((prev) => ({ ...prev, type: activeTypeTags }));
    }
  };

  const onClearFilterClick = () => {
    setActiveFilters({ size: [], type: [] });
    setActiveFilterTags({ size: [], type: [] });
  };

  const childProps = {
    map: {
      locations,
      activeMarker,
      selectedPlace,
      onMarkerClick,
      browseUnits,
      selectPlace,
      activateMarker,
      showingInfoWindow,
      showInfoWindow,
    },
    searchBar: {
      pZeroData,
      sizes,
      types,
      activeSizes: activeFilters.size,
      activeTypes: activeFilters.type,
      onActiveSizesChange,
      onActiveTypesChange,
      sizeSelectRef,
      typeSelectRef,
      placeholder,
      toggleMap,
    },
    filtersRow: { activeFilters, removeFilter },
    sidebarProps: {
      sizeFilters: sizes,
      amenityFilters: types,
      handleDrawerToggle,
      onSizeFilterClick,
      onTypeFilterClick,
      onClearFilterClick,
      open,
      activePropFilterTags: activeFilterTags,
      activePropFilters: activeFilters,
    },
    filteredResults: {
      toggleMap: toggleMap,
      results: [],
      activePropFilters: activeFilters,
      activePropFilterTags: activeFilterTags,
      showTopBar: false,
      showSidebar: false,
      filterStyle: "dropdowns", // ['drawer', 'dropdowns'],
      collectionTitle: "",
      collectionType: "locations",
      handleLocationClick,
      storageAssistantContent: storageAssistant,
    }
  };

  return (
    <CustomFindStorageContainer>

      <Grid container direction="row" className="root">
        { (window.location.pathname.includes("find-storage") && !!propertyList) && (
          <Grid item xs={12} md={4} margin={2}>
            <Hidden mdUp>
              <Collapse in={mapVisible}>
                <Map
                  browseUnits={browseUnits}
                  latLng={latLng}
                  activeMarker={activeMarker}
                  selectedPlace={selectedPlace}
                  showingInfoWindow={showingInfoWindow}
                  onMarkerClick={onMarkerClick}
                  propertyList={propertyList}
                  height="300px"
                  style={{ width: '100%' }}
                />
              </Collapse>
            </Hidden>
            <Hidden smDown>
              <Map
                browseUnits={browseUnits}
                latLng={latLng}
                activeMarker={activeMarker}
                selectedPlace={selectedPlace}
                showingInfoWindow={showingInfoWindow}
                onMarkerClick={onMarkerClick}
                propertyList={propertyList}
                height="calc(100vh - 77px)"
                style={{ width: '100%' }}
              />
            </Hidden>
          </Grid>
        )}
        <Grid
          className="results"
          item
          xs={12}
          md={window.location.pathname.includes("location") ? 12 : 8}
        >
          { !propertyList &&
            <Segment style={{ height: '100vh' }}>
              <Dimmer active inverted>
                <Loader size='massive'></Loader>
              </Dimmer>
            </Segment>
          }
          { (window.location.pathname.includes("find-storage") && (!!sizeFormDetails && !!typeFormDetails)) &&
            <SearchBar 
              {...childProps.searchBar}
              sizeFormDetails={sizeFormDetails}
              typeFormDetails={typeFormDetails}
              queryString={queryString}
              setSearchField={setSearchField}
              setQueryString={setQueryString}
              sizeChange={sizeChange}
              typeChange={typeChange}
              clearAllSize={clearAllSize}
              clearAllType={clearAllType}
              applyAllSize={applyAllSize}
              applyAllType={applyAllType}
              mapVisible={mapVisible}
              setSearchLatLng={setSearchLatLng}
            />
          }

          <FiltersRow 
            {...childProps.filtersRow}
            sizeFormDetails={sizeFormDetails}
            typeFormDetails={typeFormDetails}
            sizeChange={sizeChange}
            typeChange={typeChange}
          />

          { !!propertyList?.length > 0 ?
            (
              <FilteredResults
                {...childProps.filteredResults}
                sidebarProps={childProps.sidebarProps}
                propertyList={propertyList}
                sizeChange={sizeChange}
                clearAllSize={clearAllSize}
              />
            ) : (
              <section style={{ margin: '20px 40px 40px 40px' }}>
                <NoResults />
              </section>
            )
          }

          <Hidden smDown>
            <Footer searchByState={searchByState} items={JSON.parse(localStorage.getItem('footer'))} />
          </Hidden>
        </Grid>
      </Grid>
    </CustomFindStorageContainer>
  );
}
