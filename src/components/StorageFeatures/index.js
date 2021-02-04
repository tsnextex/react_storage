import React from "react";
import { StorageFeaturesContainer } from './style';
import { Card, Container, Grid, Typography } from "@material-ui/core";

export const StorageFeatures = ({ content = {} }) => (
  <StorageFeaturesContainer>
    <Grid
      container
      justify="center"
      alignItems="center"
      className="root"
    >
      <Grid
        item
        md={10}
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item className="titleRow">
          <Container maxWidth="md">
            <Typography className="title" variant="button">
              {content.name}
            </Typography>
            <Typography className="subtitle" variant="h4">
              {content.title}
            </Typography>
            <Typography className="subSubtitle" variant="h4">
              {content.subtitle}
            </Typography>
          </Container>
        </Grid>
        <Grid
          item
          className="stepsRow"
          container
          justify="center"
          alignItems="center"
        >
          {content.features !== undefined &&
            content.features.map((x) => (
              <Grid className="step" key={x.title} item xs={6} md={4}>
                <Card elevation={0} className="card">
                  <img className="icon" src={x.icon} alt="icon" />
                  <Typography className="stepTitle" variant="h5">
                    {x.title}
                  </Typography>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Grid>
  </StorageFeaturesContainer>
);