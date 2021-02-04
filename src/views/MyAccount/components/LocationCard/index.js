import React from "react";
import { Link } from "react-router-dom";
import {
  makeStyles,
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  Grid,
  Paper,
  Typography,
  Divider,
  Button,
  ButtonBase,
  Collapse,
  Hidden,
} from "@material-ui/core";
import Image from "../../../../img/card-bg.png";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import CallIcon from "@material-ui/icons/Call";

import UnitComp from "./UnitComp";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
    marginBottom: "1em",
    height: "fit-content",
    fontFamily: "Montserrat Regular",
    margin: "auto",
    width: "fill-available",
    padding: theme.spacing(1),
    boxShadow: "0 2px 4px 0 rgba(191, 191, 191, 0.5)",
  },
  rootForLocationView: {
    display: "flex",
    flexGrow: 1,
    marginBottom: "1em",
    height: "fit-content",
    fontFamily: "Montserrat Regular",
    margin: "auto",
    width: "fill-available",
    padding: 0,
    boxShadow: "0 2px 4px 0 rgba(191, 191, 191, 0.5)",
  },
  wrapper: { padding: 15 },
  img: {
    margin: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  bodyWrapper: {
    fontSize: "1em",
    paddingLeft: "14px",
    paddingRight: "24px",
    color: "#4a4a4a",
  },
  name: { color: "#4a4a4a", fontSize: "15px" },
  distance: { fontSize: "10px", fontWeight: 700 },
  location: { fontSize: "9px" },
  phone: { fontSize: "10px" },
  icon: {
    height: "13px",
    width: "13px",
    position: "relative",
    top: "2px",
    left: "-2px",
  },
  button: {
    paddingTop: "12px",
    paddingBottom: "12px",
    textTransform: "capitalize",
    color: "#1B3C92",
    fontFamily: "Montserrat",
    fontSize: "10px",
    fontWeight: "bold",
    letterSpacing: 0,
    lineHeight: "11px",
    textAlign: "center",
    width: "fill-available",
  },
  buttonWrapper: {
    justifyContent: "flex-end",
  },
  browseUnitsButton: {
    fontFamily: "Montserrat",
    backgroundColor: "#CE3138",
    width: "fit-contents",
    color: "#FFF",
    textTransform: "capitalize",
    fontSize: "12px",
    fontWeight: "bold",
  },
  divider: { marginLeft: "-8px", marginRight: "-8px" },
  showMore: {
    textAlign: "center",
    color: "#1B3C92",
    fontSize: "10px",
    fontWeight: 700,
    paddingTop: ".8em",
  },
  // unit styles:
  unit_wrapper: { paddingTop: "10px", paddingBottom: "10px" },
  unit_image: {
    width: 54,
  },
  unit_img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  unit_bodyWrapper: {
    padding: theme.spacing(0),
  },
  unit_firstRow: {
    fontSize: "18px",
    width: "fill-available",
    // [theme.breakpoints.up("md")]: { paddingBottom: "1em" },
    // [theme.breakpoints.up("sm")]: { paddingBottom: ".4em" },
    // [theme.breakpoints.down("sm")]: {
    //   fontSize: "1.6em",
    // },
    // [theme.breakpoints.down("xs")]: {
    //   fontSize: "1.4em",
    // },
  },
  unit_price: {
    float: "right",
    fontWeight: 800,
    "&:after": {
      content: "'/mo'",
      fontWeight: 300,
      fontSize: ".7em",
    },
  },
  unit_storePrice: {
    textDecoration: "line-through",
    width: "fill-available",
    textAlign: "right",
    float: "right",
    fontWeight: 300,
    fontSize: ".7em",
    "&:after": {
      content: "'/mo in store'",
      textDecoration: "line-through",
      fontWeight: 300,
      fontSize: ".7em",
    },
  },
  unit_dimensions: {
    fontWeight: 800,
    paddingRight: ".4em",
  },
  unit_size: {
    fontWeight: 300,
    paddingLeft: ".4em",
  },
  unit_tagsWrapper: {
    paddingTop: 0,
  },
  unit_tag: {
    color: "#4a4a4a",
    fontSize: "10px",
    fontWeight: 300,
    display: "flex",
    height: 14,
    marginRight: ".8em",
    marginBottom: ".3em",
    "& img": {
      width: "14px",
      margin: "0 .2em 0 0",
    },
  },
  unit_tagName: { color: "#4a4a4a", fontSize: "10px" },
  unit_tagNamePromo: { color: "#377D21", fontSize: "10px" },
  unit_buttonWrapperSM: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 0,
  },
  unit_hurryTextSM: {
    fontSize: "10px",
    fontWeight: 600,
    color: "#CE3138",
    fontStyle: "italic",
    textAlign: "center",
  },
  unit_button: {
    paddingTop: "12px",
    paddingBottom: "12px",
    textTransform: "capitalize",
    background: "#1B3C92",
    fontFamily: "Montserrat",
    fontSize: "10px",
    fontWeight: "bold",
    letterSpacing: 0,
    lineHeight: "11px",
    textAlign: "center",
    width: "fill-available",
  },
}));

export default function LocationCard({
  code = "",
  image = Image,
  name = "",
  distance = "",
  location = "",
  locationObj = false,
  phone = "000-000-1234",
  rating = 4.5,
  promo = false,
  units = [],
  tags = [],
  filters = [],
  activePropFilters = [],
  activePropFilterTags = [],
  actionableSizeFilters = [],
  actionableAmenityFilters = [],
  defaultSizeFilterTags = [],
  defaultAmenityFilterTags = [],
  handleLocationClick = () => "",
}) {

  const classes = useStyles();
  let theme = createMuiTheme();
  theme = responsiveFontSizes(theme);

  const onLocationClick = () => handleLocationClick(code);

  const [showAllUnits, setShowAllUnits] = React.useState(false);

  const [count, setCount] = React.useState(units.length);

  const onLocationButtonClick = () => {
    // go to new route /location/:locationID
    // grab location fron utils _getLocation(id)
    // pass selected location to new route
    console.log("inside onLocationButtonClick.");
  };

  React.useEffect(() => {
    const c = units.filter((x) => x.show === true).length;
    setCount(c);
  }, [activePropFilterTags, units]);

  let sortedUnits = units;

  return (
    <ThemeProvider theme={theme}>
      <Paper className={classes.root} elevation={3}>
        <Grid container direction="column">
          <Grid
            item
            container
            direction="row"
            alignItems="center"
            className={classes.wrapper}
          >
            <Grid item xs={3} md={2} className={classes.imageWrapper}>
              <img className={classes.img} alt="locationImage" src={image} />
            </Grid>
            <Grid
              item
              xs={6}
              md={7}
              container
              className={classes.bodyWrapper}
              direction="column"
              justify="space-evenly"
              alignItems="stretch"
              onClick={onLocationClick}
            >
              <Typography className={classes.name} children={name} />
              <Typography className={classes.location}>
                <LocationOnIcon className={classes.icon} />
                {location}
              </Typography>
              <Typography className={classes.phone}>
                <CallIcon className={classes.icon} />
                {phone}
              </Typography>
            </Grid>
            <Hidden smDown>
              <Grid
                item
                xs={3}
                container
                alignItems="flex-end"
                className={classes.buttonWrapper}
              >
                <Link
                  to={{
                    pathname: '/storage_units/florida/royal-palm-beach',
                    state: {
                      locationObj: locationObj,
                      locationCode: code,
                      units: sortedUnits,
                      collectionType: "units",
                    },
                  }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.browseUnitsButton}
                    onClick={onLocationButtonClick}
                    style={{ marginBottom: "1em", boxShadow: 'none', height: 36 }}
                  >
                    Browse Units
                  </Button>
                </Link>
              </Grid>
            </Hidden>
          </Grid>
          <Hidden mdUp>
            <Link to='/storage_units/florida/royal-palm-beach'>
              <Button
                variant="contained"
                color="secondary"
                className={classes.browseUnitsButton}
                fullWidth
                style={{ marginBottom: "1em", boxShadow: 'none', height: 36 }}
                onClick={onLocationButtonClick}
              >
                Browse Units
              </Button>
            </Link>
          </Hidden>
          <Grid container direction="column">
            {sortedUnits.map((unit, x) => (
              <UnitComp
                locationCode={code}
                key={`unit-${x}`}
                unit={unit}
                filters={filters}
                promo={promo}
                showAllUnits={showAllUnits}
                activePropFilterTags={activePropFilterTags}
                defaultAmenityFilterTags={defaultAmenityFilterTags}
                defaultSizeFilterTags={defaultSizeFilterTags}
              />
            ))}
          </Grid>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
}
