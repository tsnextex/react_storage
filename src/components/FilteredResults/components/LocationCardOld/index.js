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
  wrapper: { paddingBottom: "10px" },
  img: {
    margin: "auto",
    display: "block",
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
  location: { fontSize: "9px", paddingLeft: "13px" },
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
    justifyContent: "stretch",
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
      <Collapse
        in={
          count > 0 ||
          window.location.pathname.includes(`location/${locationObj.code}`)
        }
      >
        <Paper
          className={
            window.location.pathname.includes(`location/${locationObj.code}`)
              ? classes.rootForLocationView
              : classes.root
          }
          elevation={3}
        >
          <Grid container direction="column">
            <Grid
              item
              container
              direction={
                window.location.pathname.includes(
                  `location/${locationObj.code}`
                )
                  ? "column"
                  : "row"
              }
              alignItems="center"
              className={classes.wrapper}
            >
              <Grid
                item
                md={
                  window.location.pathname.includes(
                    `location/${locationObj.code}`
                  )
                    ? 12
                    : 2
                }
                className={classes.imageWrapper}
              >
                <img className={classes.img} alt="locationImage" src={image} />
              </Grid>
              <Grid
                item
                md={7}
                container
                className={classes.bodyWrapper}
                direction="column"
                justify="space-evenly"
                alignItems="stretch"
                onClick={onLocationClick}
              >
                <Typography className={classes.name} children={name} />
                <Typography className={classes.distance}>
                  <LocationOnIcon className={classes.icon} />
                  {distance}
                </Typography>
                <Typography className={classes.location} children={location} />
                <Typography className={classes.phone}>
                  <CallIcon className={classes.icon} />
                  {phone}
                </Typography>
              </Grid>
              {window.location.pathname.includes(`find-storage`) && (
                <Grid item md={3} className={classes.buttonWrapper}>
                  <Link
                    to={{
                      pathname: `/location/${code}`,
                      state: {
                        locationObj: locationObj,
                        locationCode: code,
                        units: sortedUnits,
                        collectionType: "units",
                      },
                    }}
                  >
                    <Button
                      variant="outlined"
                      color="primary"
                      className={classes.button}
                      onClick={onLocationButtonClick}
                    >
                      Location & Unit Details
                    </Button>
                  </Link>
                </Grid>
              )}
            </Grid>
            <Hidden smDown>
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
                {count > 2 && (
                  <React.Fragment>
                    <Divider className={classes.divider} />
                    <ButtonBase onClick={() => setShowAllUnits((x) => !x)}>
                      <Grid item>
                        <Typography className={classes.showMore}>
                          {showAllUnits
                            ? "- Hide additional units at this location"
                            : "+ View all matching units at this location"}
                        </Typography>
                      </Grid>
                    </ButtonBase>
                  </React.Fragment>
                )}
              </Grid>
            </Hidden>
          </Grid>
        </Paper>
      </Collapse>
    </ThemeProvider>
  );
}
