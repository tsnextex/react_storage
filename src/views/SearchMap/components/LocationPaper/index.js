import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";

import Rating from "@material-ui/lab/Rating";
import Image from "../../img/card-bg.png";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import CallIcon from "@material-ui/icons/Call";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    fontFamily: "Monserrat",
  },
  content: { textAlign: "left" },
  media: {
    height: 130,
  },
  title: {
    fontWeight: 300,
  },
  icon: {
    fontSize: "1.2em",
    marginRight: ".6em",
    position: "relative",
    top: "2px",
  },
  location: { fontWeight: 200, marginLeft: "2em" },
  phone: { fontWeight: 200 },
  actions: {
    padding: "0 1em 1em 1em",
  },
  button: {
    width: "100%",
  },
  unitsFromWrapper: {
    position: "absolute",
    top: 62,
    right: "1em",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  unitsFrom: {
    opacity: ".9",
    background: "#377D21",
    color: "white",
    padding: "2px 6px",
    width: "fit-content",
  },
  unitsFromText: { fontWeight: 600 },
  unitsFromPriceHolder: {
    padding: "3px 6px 2px",
    background: "white",
    opacity: ".9",
  },
  unitsFromPrice: {},
});

export default function LocationPaper() {
  const classes = useStyles();
  const value = 3.5;
  return (
    <Card className={classes.root} elevation={12}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`${Image}`}
          title="Contemplative Reptile"
        />
        <CardContent className={classes.content}>
          <div className={classes.unitsFromWrapper}>
            <div className={classes.unitsFrom}>
              <Typography variant="subtitle2" className={classes.unutsFromText}>
                Units from
              </Typography>
            </div>
            <div className={classes.unitsFromPriceHolder}>
              <Typography
                variant="h5"
                component="span"
                className={classes.unutsFromPrice}
              >
                $30
              </Typography>
              <Typography
                variant="body2"
                component="span"
                className={classes.perMonth}
              >
                /month
              </Typography>
            </div>
          </div>
          <Typography className={classes.title} variant="h5">
            Hobe Sound II
          </Typography>
          <Rating name="read-only" value={value} readOnly />
          <Typography variant="subtitle2" gutterBottom>
            <LocationOnIcon className={classes.icon} />
            20 miles away
          </Typography>
          <Typography className={classes.location} variant="body2">
            2112 Tilton St Greenwich, OH 44837
          </Typography>
          <Typography className={classes.phone} variant="body2">
            <CallIcon className={classes.icon} />
            973-510-2550
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions justify="center" className={classes.actions}>
        <Button
          className={classes.button}
          color="secondary"
          variant="contained"
        >
          Browse Units
        </Button>
      </CardActions>
    </Card>
  );
}
