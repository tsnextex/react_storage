import React, { useEffect } from "react";
import { CustomContentContainer } from './style';
import {
  makeStyles,
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import { CssBaseline, Button } from "@material-ui/core";
import _ from "lodash";
import {
  _getSizeFilters,
  _getAmenityFilters,
  _getUnits,
  _getLocations,
  _getIntersection,
} from "./utils";
import {
  Topbar,
  Sidebar,
  UnitCollection,
  LocationCollection,
} from "./components";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    fontFamily: "Montserrat",
    background: "#F4F5F8",
    width: "100%",
  },
  toolbarSpacer: {
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

const sizeFilters = _getSizeFilters();
const amenityFilters = _getAmenityFilters();
const units = _getUnits();
// TODO: don't get both locations and units every time this component mounts.
const locations = _getLocations();

const defaultSizeFilterTags = [...sizeFilters].map((x) => x.tag);
const defaultAmenityFilterTags = [...amenityFilters].map((x) => x.tag);

export const FilteredResults = (props) => {

  const {
    location,
    showTopBar = false,
    collectionTitle = "Available Units",
    activePropFilters = false,
    activePropFilterTags = false,
    handleLocationClick,
    storageAssistantContent,
    sidebarProps,
    toggleMap,
    propertyList,
    clearAllSize,
    sizeChange
  } = props;

  const classes = useStyles();
  let theme = createMuiTheme();
  theme = responsiveFontSizes(theme);

  const devModeOn = false;

  const [loading, setLoading] = React.useState(false);
  const DevButton = () => (
    <Button
      variant="outlined"
      color="primary"
      children="toggle loading"
      onClick={() => setLoading((x) => !x)}
    />
  );

  const [open, setOpen] = React.useState(false);
  const handleDrawerToggle = () => setOpen((x) => !x);

  // eslint-disable-next-line
  const [activeFilters, setActiveFilters] = React.useState([]);

  // use useEffect to check for activePropFilters
  // to make this work with either external or internal filters
  useEffect(() => {
    if (_.get(location, ["state", "collectionType"]) === "locations") {
      setFiltersFromProps(activePropFilters);
    }
  }, [activePropFilters, location]);

  const setFiltersFromProps = (apf) => {
    // 1. get intersection between activeFilters and defaultSizeFilterTags
    const sizeIntersection = _getIntersection(apf.size, defaultSizeFilterTags);
    // 2. if the length of the intersection is 0, set actionableSizeFilters to defaultSizeFilterTags
    if (sizeIntersection.length === 0) {
      setActSizeFilters(defaultSizeFilterTags);
    } else {
      setActSizeFilters(sizeIntersection);
    }
    // repeat for amenities
    const amenityIntersection = _getIntersection(
      apf.type,
      defaultAmenityFilterTags
    );
    if (amenityIntersection.length === 0) {
      setActAmenityFilters(defaultAmenityFilterTags);
    } else {
      setActAmenityFilters(amenityIntersection);
    }
  };
  // eslint-disable-next-line
  const [actionableSizeFilters, setActSizeFilters] = React.useState([]);
  // eslint-disable-next-line
  const [actionableAmenityFilters, setActAmenityFilters] = React.useState([]);

  useEffect(() => {
    if (_.get(location, ["state", "collectionType"]) === "locations") {
      // 1. get intersection between activeFilters and defaultSizeFilterTags
      const sizeIntersection = _getIntersection(
        activeFilters,
        defaultSizeFilterTags
      );
      // 2. if the length of the intersection is 0, set actionableSizeFilters to defaultSizeFilterTags
      if (sizeIntersection.length === 0) {
        setActSizeFilters(defaultSizeFilterTags);
      } else {
        setActSizeFilters(sizeIntersection);
      }
      // repeat for amenities
      const amenityIntersection = _getIntersection(
        activeFilters,
        defaultAmenityFilterTags
      );
      if (amenityIntersection.length === 0) {
        setActAmenityFilters(defaultAmenityFilterTags);
      } else {
        setActAmenityFilters(amenityIntersection);
      }
    }
  }, [activeFilters, location]);

  const currentRoute = useLocation();

  const childProps = {
    topbarProps: { handleDrawerToggle, open },
    sidebarProps: { ...sidebarProps },
    unitCollectionProps: {
      activePropFilters,
      activePropFilterTags,
      currentRoute,
      amenityFilters,
      defaultAmenityFilterTags,
      defaultSizeFilterTags,
      title: collectionTitle,
      units,
      loading,
      storageAssistantContent,
    },
    locationCollectionProps: {
      activePropFilters,
      activePropFilterTags,
      amenityFilters,
      defaultAmenityFilterTags,
      defaultSizeFilterTags,
      title: collectionTitle,
      locations,
      loading,
      handleLocationClick,
      toggleMap,
    },
  };

  return (
    <ThemeProvider theme={theme}>
      {devModeOn && <DevButton />}
      <CssBaseline />
      <div className={classes.root}>
        {showTopBar && <Topbar {...childProps.topbarProps} />}
        {window.location.pathname.includes("location") && (
          <Sidebar {...sidebarProps} />
        )}
        <CustomContentContainer>
          {showTopBar && <div className={classes.toolbarSpacer} />}
          {window.location.pathname.includes("location") && (
            <UnitCollection {...childProps.unitCollectionProps} />
          )}
          {window.location.pathname.includes("find-storage") && (
            <LocationCollection
              clearAllSize={clearAllSize}
              sizeChange={sizeChange}
              propertyList={propertyList}
              {...childProps.locationCollectionProps}
            />
          )}
        </CustomContentContainer>
      </div>
    </ThemeProvider>
  );
}
