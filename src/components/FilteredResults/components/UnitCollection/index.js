import React from "react";
import { Grid, Typography, CircularProgress, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LoadingPaper from "../LoadingPaper";
import _ from "lodash";

import { _getLocation } from "../../utils";
import ExpansionDeltilsPanel from "./ExpansionDeltilsPanel";
import UnitComp from "./UnitComp";
import LocationDetails from "../../../LocationDetails";

const useStyles = makeStyles((theme) => ({
  unitGrid: {
    padding: 0,
    height: "fit-content",
    width: "100%",
  },
  paper: {
    padding: `1px 16px`,
    width: "100%",
  },
}));

const Progress = () => (
  <div
    style={{
      position: "relative",
      fontSize: "2em",
      width: "100%",
      top: "17%",
      display: "flex",
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
      flexDirection: "column",
      height: 0,
      color: "#1B3C92",
      lineHeight: "3em",
    }}
  >
    <CircularProgress />
    <span>Finding Available Units</span>
  </div>
);

export default function UnitCollection({
  locationCode = "",
  title = "Available Units",
  amenityFilters = [],
  activeFilters = [],
  activePropFilterTags = { size: [], type: [] },
  actionableSizeFilters = [],
  actionableAmenityFilters = [],
  defaultSizeFilterTags = [],
  defaultAmenityFilterTags = [],
  loading = true,
  currentRoute,
  storageAssistantContent,
}) {
  const classes = useStyles();
  const [units, setUnits] = React.useState([]);
  const [detailSections, setDetailSections] = React.useState([]);
  const [location, setLocation] = React.useState({});

  React.useEffect(() => {
    // grab location with units on load
    let locationObj = _.get(currentRoute, ["state", "locationObj"], false);
    const locationCode = _.get(currentRoute, ["state", "locationCode"], false);

    if (!locationObj) locationObj = _getLocation(locationCode);
    const units = _.get(locationObj, ["units"], []);
    const detailSections = _.get(locationObj, ["detailSections"], []);
    // console.log({ units });
    setLocation(locationObj);
    setUnits(units);
    setDetailSections(detailSections);
  }, [currentRoute]);

  return (
    <Grid
      item
      xs={12}
      container
      spacing={2}
      direction="row"
      justify="center"
      alignItems="flex-start"
    >
      <Grid item xs={12} md={3} container direction="column">
        <LocationDetails
          locationObj={location}
          locationInfo={_.get(location, ["locationInfo"], false)}
          storageAssistantContent={storageAssistantContent}
        />
      </Grid>
      <Grid item xs={12} md={7} container direction="column" spacing={2}>
        <Grid item>
          <Typography paragraph variant="h4" style={{ fontWeight: 200 }}>
            {title || "Available Units"}
          </Typography>
        </Grid>
        {loading && <Progress />}
        {loading && [0, 1, 2].map((x) => <LoadingPaper />)}
        <Grid
          item
          container
          spacing={2}
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
        >
          {!loading &&
            units &&
            units.map((unit, x) => (
              <Grid item key={`unit-${x}`} className={classes.unitGrid}>
                <Paper className={classes.paper} elevation={2}>
                  <UnitComp
                    key={`unit-comp-${x}`}
                    unit={unit}
                    locationObj={location}
                    locationCode={locationCode}
                    promo={unit["promo"]}
                    filters={amenityFilters}
                    activePropFilterTags={activePropFilterTags}
                    defaultAmenityFilterTags={defaultAmenityFilterTags}
                    defaultSizeFilterTags={defaultSizeFilterTags}
                  />
                </Paper>
              </Grid>
            ))}
        </Grid>

        {!loading &&
          detailSections &&
          detailSections.map((section) => (
            <Grid item key={section.id}>
              <ExpansionDeltilsPanel content={section} />
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
}
