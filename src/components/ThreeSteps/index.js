import React from "react";
import { ThreeStepsContainer, DesktopDivider, MobileDivider } from "./style";
import { Grid, Hidden, Typography, Button } from "@material-ui/core";

export const ThreeSteps = props => {

  const {
    content = {},
    setSearching
  } = props;

  return (
    <ThreeStepsContainer>
      <Grid item className="titleRow">
        <Typography className="title" variant="button">
          FINDING STORAGE IS EASY
        </Typography>
        <Typography className="subtitle" variant="h4">
          3 Simple Steps
        </Typography>
      </Grid>

      <Grid
        item
        className="stepsRow"
        container
        justify="center"
        alignItems="flex-start"
      >
        {["1", "d", "2", "d", "3"].map((x, i) =>
          x === "d" ? (
            <Grid
              item
              xs={8}
              md={1}
              key={`${x}-${i}`}
              className="dividerHolder"
            >
              <Hidden smDown>
                <DesktopDivider>
                  <section className="step-one">
                    <section className="step-two" />
                  </section>
                </DesktopDivider>
              </Hidden>

              <Hidden mdUp>
                <MobileDivider />
              </Hidden>
            </Grid>
          ) : (
            <Grid className="step" key={x} item xs={9} md={3}>
              <img
                className="icon"
                src={content[`step_${x}_icon`]}
                alt={content[`step_${x}_title`]}
              />
              <Typography className="stepTitle" variant="h5">
                {content[`step_${x}_title`]}
              </Typography>
              <Typography className="stepContent" variant="body2">
                {content[`step_${x}_content`]}
              </Typography>
            </Grid>
          )
        )}
      </Grid>

      <Grid item>
        <Button
          onClick={() => setSearching(true)}
          className="button"
          color="secondary"
          variant="contained"
          children={"Let's get started!"}
        />
      </Grid>
    </ThreeStepsContainer>
  );
}