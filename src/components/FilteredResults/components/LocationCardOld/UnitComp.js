import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Button,
  ButtonBase,
  Hidden,
} from "@material-ui/core";
import { _getIntersection } from "../../utils";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  unitShowAll: { display: "flex", borderTop: "1px solid rgba(0, 0, 0, 0.12)" },
  unitShowTwo: {
    display: "none",
    "&:nth-child(1)": {
      display: "flex",
      borderTop: "1px solid rgba(0, 0, 0, 0.12)",
    },
    "&:nth-child(2)": {
      display: "flex",
      borderTop: "1px solid rgba(0, 0, 0, 0.12)",
    },
  },
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
  divider: { marginLeft: "-8px", marginRight: "-8px", display: "flex" },
  dividerNo: { display: "none" },
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

export default function UnitComp({
  unit = false,
  locationCode = "",
  filters = [],
  promo,
  activePropFilterTags,
  defaultAmenityFilterTags,
  defaultSizeFilterTags,
  showAllUnits = false,
}) {
  const classes = useStyles();
  const generateTag = (tag) => {
    let filter = filters.filter((x) => x.tag === tag);
    filter = filter[0];

    return !!filter ? (
      <div className={classes.unit_tag} key={filter.name}>
        <img src={filter.image} alt={"icon"} />
        <Hidden xsDown>
          <Typography
            children={tag === "pr" && promo ? promo : filter.name}
            className={
              tag === "pr" && promo
                ? classes.unit_tagNamePromo
                : classes.unit_tagName
            }
          />
        </Hidden>
      </div>
    ) : null;
  };

  const [show, setShow] = React.useState(true);

  // check active filters and determine which units to display per location.
  // if no units in location match filters then hide location as well.
  React.useEffect(() => {
    if (activePropFilterTags.size.length === 0) {
      activePropFilterTags.size = defaultSizeFilterTags;
    }
    if (activePropFilterTags.type.length === 0) {
      activePropFilterTags.type = defaultAmenityFilterTags;
    }

    const sizeMatch = !!(
      _getIntersection(activePropFilterTags.size, unit.tags).length > 0
    );
    let amenityMatch = !!(
      _getIntersection(activePropFilterTags.type, unit.tags).length > 0
    );
    if (activePropFilterTags.type.length < defaultAmenityFilterTags.length) {
      const n_amenityMatch = _getIntersection(
        activePropFilterTags.type,
        unit.tags
      ).filter((x) => unit.tags.indexOf(x) > -1);
      amenityMatch =
        _getIntersection(n_amenityMatch, activePropFilterTags.type).length ===
        activePropFilterTags.type.length;
    }
    const result = !!(sizeMatch && amenityMatch);
    unit.show = result;
    setShow(result);
  }, [
    unit,
    activePropFilterTags,
    defaultAmenityFilterTags,
    defaultSizeFilterTags,
  ]);

  return (
    unit &&
    show && (
      <div
        key={unit.id}
        className={showAllUnits ? classes.unitShowAll : classes.unitShowTwo}
      >
        <Grid
          item
          container
          direction="row"
          alignItems="center"
          className={classes.unit_wrapper}
        >
          <Grid item md={2} container justify="center">
            <ButtonBase className={classes.unit_image}>
              <img
                className={classes.unit_img}
                alt="complex"
                src={unit.image}
              />
            </ButtonBase>
          </Grid>
          <Grid
            item
            md={7}
            sm
            container
            className={classes.bodyWrapper}
            direction="column"
            justify="space-evenly"
            alignItems="stretch"
          >
            <Grid
              item
              xs
              className={classes.unit_topRow}
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <div className={classes.unit_firstRow}>
                <span className={classes.unit_dimensions}>
                  {unit.dimensions}
                </span>
                |<span className={classes.unit_size}>{unit.size}</span>
                <span className={classes.unit_price}>${unit.price}</span>
              </div>
            </Grid>
            <Grid
              item
              xs
              container
              direction="row"
              className={classes.unit_bottomRow}
              justify="space-between"
              alignItems="center"
            >
              <Grid
                item
                md={9}
                sm={9}
                xs={8}
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                className={classes.unit_tagsWrapper}
              >
                {unit.tags.map((tag) => generateTag(tag))}
              </Grid>

              <Grid item>
                <span className={classes.unit_storePrice}>
                  ${unit.storePrice}
                </span>
              </Grid>
            </Grid>
          </Grid>
          <Hidden smDown>
            <Grid item md={3} className={classes.unit_buttonWrapper}>
              <Link
                to={{
                  pathname: `/reserve/${unit.id}`,
                  state: {
                    locationCode: locationCode,
                    unitCode: unit.id,
                    unit: unit,
                    locationObj: "locationObj",
                  },
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.unit_button}
                >
                  Continue
                </Button>
              </Link>
              <Typography className={classes.unit_hurryTextSM}>
                {unit.hurryText}
              </Typography>
            </Grid>
          </Hidden>
        </Grid>
      </div>
    )
  );
}
