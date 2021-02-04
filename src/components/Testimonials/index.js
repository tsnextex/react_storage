import React from "react";
import {
  CustomRating,
  CustomStepper,
  StyledTestimonialsContainer
} from './style';
import {
  Box,
  Grid,
  Hidden,
  Typography,
} from "@material-ui/core";
import { Swipeable } from "react-swipeable";
import { autoPlay } from "react-swipeable-views-utils";
import SwipeableViews from "react-swipeable-views";
import testimonials_1 from '../../img/home/testimonials_1.jpg';
import testimonials_2 from '../../img/home/testimonials_2.png';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export const Testimonials = ({ content = {} }) => {

  const [activeStep, setActiveStep] = React.useState(0);

  const sizes = [4, 8, 8, 4, 4, 8, 8, 4];

  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep === content.testimonials.length - 1
        ? 0
        : prevActiveStep + 1
    );
  };

  if (activeStep > 5) setActiveStep(0);

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

  if (activeStep > 5) setActiveStep(0);

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

  const getImage = (x, i) => {

    let img;
    img = i === 0 ? testimonials_1 : img;
    img = i === 1 ? x.background_image : img;
    img = i === 2 ? x.background_image : img;
    img = i === 3 ? testimonials_2 : img;
    return img;
  };

  return (
    <StyledTestimonialsContainer>
      <Swipeable onSwiped={() => eventHandler} {...config}>
        <Grid
          alignItems="center"
          className="root"
          container
          justify="center"
        >
          <Grid
            alignItems="center"
            container
            direction="column"
            item
            justify="center"
            md={10}
          >
            <Grid className="titleRow" item>
              <Typography className="title" variant="button">
                {content.title}
              </Typography>
              <Typography className="subtitle" variant="h4">
                {content.subtitle}
              </Typography>
            </Grid>
            <Grid
              alignItems="center"
              className="reviewsRow"
              container
              item
              justify="center"
            >
              <Hidden mdUp>
                {content.testimonials !== undefined && (
                  <Grid
                    className="review"
                    key={content.testimonials[activeStep].name}
                    item
                    xs={12}
                  >
                    <AutoPlaySwipeableViews
                      axis={"x"}
                      index={activeStep}
                      onChangeIndex={handleStepChange}
                      enableMouseEvents
                    >
                      {content.testimonials.map((x, i) => (
                        <Box
                          key={i}
                          className="box"
                          style={{ 
                            background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${getImage(x, i)})` 
                          }}
                        >
                          <Typography
                            className="reviewTitle"
                            variant="body1"
                          >
                            {x.text}
                          </Typography>
                          <Typography
                            className="reviewContent"
                            variant="body2"
                          >
                            {x.author}
                          </Typography>
                          <CustomRating
                            name="read-only"
                            value={Number(x.stars)}
                            className="rating"
                            readOnly
                          />
                        </Box>
                      ))}
                    </AutoPlaySwipeableViews>
                    <CustomStepper
                      activeStep={activeStep}
                      position="static"
                      steps={content.testimonials.length}
                      variant="dots"
                    />
                  </Grid>
                )}
              </Hidden>
              <Hidden smDown>
                {content.testimonials !== undefined &&
                  content.testimonials.map((x, i) => (
                    <Grid
                      className="review"
                      key={x.name}
                      item
                      xs={12}
                      md={sizes[i]}
                    >
                      <Box
                        className="box"
                        style={{ 
                          background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${getImage(x, i)})` 
                        }}
                      >
                        <Typography
                          className="reviewTitle"
                          variant="body1"
                        >
                          {x.text}
                        </Typography>
                        <Typography
                          className="reviewContent"
                          variant="body2"
                        >
                          {x.author}
                        </Typography>
                        <CustomRating
                          name="read-only"
                          value={Number(x.stars)}
                          className="rating"
                          readOnly
                        />
                      </Box>
                    </Grid>
                  ))}
              </Hidden>
            </Grid>
          </Grid>
        </Grid>
      </Swipeable>
    </StyledTestimonialsContainer>
  );
};