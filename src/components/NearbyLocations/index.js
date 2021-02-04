import React, { useState, useEffect } from "react";
import { NearbyLocationsContainer, CustomStepper } from './style';
import { Grid, Hidden, Typography } from "@material-ui/core";
import LocationCard from "./LocationCard";
import _ from "lodash";
import { Swipeable } from "react-swipeable";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { gqlRequest } from "../../utils";
import client from "../../apollo";
import { SearchResultsQuery } from "../../graphql/searchResults";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export const NearbyLocations = props => {

  const {
    type,
    content = {},
    latLng,
    refLocation
  } = props;

  const [activeStep, setActiveStep] = useState(0);
  const [locations, setLocations] = useState([]);

  useEffect(() => {

    const lat = type === 'home' ? latLng[0] : refLocation.latitude;
    const lng = type === 'home' ? latLng[1] : refLocation.longitude;

    // get nearby locations by user lat lng
    gqlRequest(client, SearchResultsQuery(lat, lng, lat, lng, 50, 4))
      .then(res => {

        // search results and filter 
        let removeNonTypes = res.data.getLocationsByCoordinates.filter(x => x.types);
        removeNonTypes = type === 'location' ? removeNonTypes.filter(x => x.id !== refLocation.id) : removeNonTypes;
        removeNonTypes = type === 'location' ? removeNonTypes.filter((x, i) => i < 3) : removeNonTypes;

        if (removeNonTypes.length > 0) {

          console.log('NEARBY RESULTS', removeNonTypes);

          // properties found for city or zip
          setLocations(removeNonTypes);
        }
      });

  }, []);

  const handleNext = () => {

    setActiveStep((prevActiveStep) =>
      prevActiveStep === content.testimonials.length - 1
        ? 0
        : prevActiveStep + 1
    );
  };

  if (activeStep > 9) setActiveStep(0);

  const handleBack = () => {

    setActiveStep((prevActiveStep) =>
      prevActiveStep === 0
        ? content.testimonials.length - 1
        : prevActiveStep + 1
    );
  };

  const handleStepChange = (step) => {

    setActiveStep(step);
  };

  const config = {
    delta: 10, // min distance(px) before a swipe starts
    preventDefaultTouchmoveEvent: false, // preventDefault on touchmove, *See Details*
    trackTouch: true, // track touch input
    trackMouse: false, // track mouse input
    rotationAngle: 0, // set a rotation angle
  };

  const eventHandler = (args) => {

    if (args.direction === "right") {
      handleBack();
    } else if (args.direction === "left") {
      handleNext();
    }
    console.log(args);
  };

  return (
    <>
    { locations.length > 0 &&
      <NearbyLocationsContainer>
        <Swipeable onSwiped={() => eventHandler} {...config}>
          <Grid
            container
            justify="center"
            alignItems="center"
            className="groot"
          >
            <Grid item className="titleRow">
              <Typography className="title" variant="button">
                Find Storage
              </Typography>
              <Typography className="subtitle" variant="h4">
                Your Nearby Storage Locations
              </Typography>
            </Grid>
            <Grid
              item
              md={10}
              container
              className="root"
              justify="center"
            >
              <Hidden smDown>
                {locations.map((x, i) => (
                  <Grid key={i * 11} item md={type === 'home' ? 3 : 4}>
                    <LocationCard data={x} />
                  </Grid>
                ))}
              </Hidden>
              <Hidden mdUp>
                <AutoPlaySwipeableViews
                  axis={"x"}
                  index={activeStep}
                  onChangeIndex={handleStepChange}
                  enableMouseEvents
                >
                  {locations.map((x, i) => (
                    <Grid
                      key={i}
                      item
                      xs={12}
                      container
                      justify="center"
                      alignItems="center"
                      className="locationCardContainer"
                    >
                      <LocationCard data={x} />
                    </Grid>
                  ))}
                </AutoPlaySwipeableViews>
                <CustomStepper
                  variant="dots"
                  steps={locations.length}
                  position="static"
                  activeStep={activeStep}
                />
              </Hidden>
            </Grid>
          </Grid>
        </Swipeable>
      </NearbyLocationsContainer>
    }
    </>
  );
};