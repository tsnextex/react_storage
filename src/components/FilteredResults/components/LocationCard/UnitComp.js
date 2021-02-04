import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Button,
  ButtonBase,
  Hidden,
} from "@material-ui/core";
import { _getIntersection } from "../../../../components/FilteredResults/utils";
import { Link } from "react-router-dom";
import SvgIcon from "@material-ui/core/SvgIcon";

import MenuButton from "./MenuButton";

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
    [theme.breakpoints.down("xs")]: {
      fontSize: ".7em",
    },
  },
  unit_size: {
    fontWeight: 300,
    paddingLeft: ".4em",
    [theme.breakpoints.down("xs")]: {
      fontSize: ".7em",
    },
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
  unit_hurryTextSM2: {
    fontSize: "10px",
    fontWeight: 600,
    color: "#4a4a4a",
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
  unit_button_2: {
    paddingTop: "12px",
    paddingBottom: "12px",
    textTransform: "capitalize",
    fontFamily: "Montserrat",
    fontSize: "10px",
    fontWeight: "bold",
    letterSpacing: 0,
    lineHeight: "11px",
    textAlign: "center",
    width: "fill-available",
  },
  unit_activeDetails: { paddingTop: "1em" },
  unit_detailLabel: {
    color: "#4a4a4a",
    fontSize: "10px",
    fontWeight: "bold",
  },
  unit_detailValue: {
    paddingLeft: ".3em",
    paddingRight: ".5em",
    color: "#4a4a4a",
    fontSize: "10px",
    fontWeight: 300,
  },
}));

export default function UnitComp({
  unit = false,
  locationCode = "",
  filters = [],
  promo,
  showAllUnits = false,
}) {
  const classes = useStyles();

  const showInfo = () => {};

  return (
    unit && (
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
          <Grid item xs={2} container justify="center">
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
            xs={10}
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
                  {unit.status === "active"
                    ? `Unit #${unit.unitNumber}: ${unit.dimensions}`
                    : unit.dimensions}
                </span>
                |<span className={classes.unit_size}>{unit.size}</span>
                {unit.status === "reserved" && (
                  <span className={classes.unit_price}>${unit.price}</span>
                )}
              </div>
            </Grid>
            <Hidden mdUp>
              <Grid item>
                <Button
                  style={{
                    color: "#1B3C92",
                    fontFamily: "Montserrat",
                    fontSize: "12px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    textTransform: "capitalize",
                    marginTop: ".4em",
                  }}
                  onClick={showInfo}
                  endIcon={
                    <SvgIcon viewBox="0 0 50 50" style={{ fontSize: "12px" }}>
                      <g id="icons/general/info" fill="#1B3C92">
                        <path
                          d="M25,0 C11.19375,0 0,11.19375 0,25 C0,38.80625 11.19375,50 25,50 C38.80625,50 50,38.80625 50,25 C50,11.19375 38.80625,0 25,0 Z M29,39 L21,39 L21,25 L29,25 L29,39 Z M25,12 C27.208,12 29,13.792 29,16 C29,18.208 27.208,20 25,20 C22.792,20 21,18.208 21,16 C21,13.792 22.792,12 25,12 Z"
                          id="info"
                        ></path>
                      </g>
                    </SvgIcon>
                  }
                >
                  Unit Info
                </Button>
              </Grid>
            </Hidden>
            <Hidden smDown>
              <Grid
                item
                xs
                container
                direction="row"
                className={classes.unit_bottomRow}
                justify="space-between"
                alignItems="center"
              >
                {unit.status === "active" && (
                  <Grid
                    item
                    md={9}
                    sm={9}
                    xs={8}
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    className={classes.unit_activeDetails}
                  >
                    <div>
                      <span className={classes.unit_detailLabel}>
                        Paid Through:{" "}
                      </span>
                      <span className={classes.unit_detailValue}>
                        {unit.paidThru}
                      </span>
                    </div>
                    <div>
                      <span className={classes.unit_detailLabel}>
                        Current Ballance:{" "}
                      </span>
                      <span className={classes.unit_detailValue}>
                        ${unit.currentBallance}
                      </span>
                    </div>
                    <div>
                      <span className={classes.unit_detailLabel}>
                        Gate Code:{" "}
                      </span>
                      <span className={classes.unit_detailValue}>
                        {unit.gateCode}
                      </span>
                    </div>
                  </Grid>
                )}

                {unit.status === "reserved" && (
                  <Grid
                    item
                    md={9}
                    sm={9}
                    xs={8}
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    className={classes.unit_activeDetails}
                  >
                    <div>
                      <span className={classes.unit_detailLabel}>
                        Move in date:{" "}
                      </span>
                      <span className={classes.unit_detailValue}>
                        {unit.moveInDate}
                      </span>
                    </div>
                  </Grid>
                )}

                {unit.status === "available" && (
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
                    tags...
                  </Grid>
                )}

                {unit.status === "available" && (
                  <Grid item>
                    <span className={classes.unit_storePrice}>
                      ${unit.storePrice}
                    </span>
                  </Grid>
                )}
              </Grid>
            </Hidden>
          </Grid>
          <Grid item xs={12} md={3} className={classes.unit_buttonWrapper}>
            {unit.status === "reserved" ? (
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
                  variant={
                    unit.status === "reserved" ? "contained" : "outlined"
                  }
                  color="primary"
                  className={classes.unit_button_2}
                >
                  {unit.status === "reserved" ? `Move In` : `Make Payment`}
                </Button>
              </Link>
            ) : (
              <MenuButton
                label="Make A Payment"
                options={["One-Time Payment", "Setup AutoPay", "PrePay"]}
              />
            )}
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              {unit.status === "reserved" && (
                <SvgIcon viewBox="-10 -15 75 75">
                  <g
                    id="Icons"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g
                      id="icons/general/clock"
                      fill="#CE3138"
                      fillRule="nonzero"
                    >
                      <path
                        d="M25,45 C36.05,45 45,36.05 45,25 C45,13.95 36.05,5 25,5 C13.95,5 5,13.95 5,25 C5,36.05 13.95,45 25,45 L25,45 Z M25,0 C38.8,0 50,11.2 50,25 C50,38.8 38.8,50 25,50 C11.175,50 0,38.75 0,25 C0,11.2 11.2,0 25,0 L25,0 Z M26.25,12.5 L26.25,25.625 L37.5,32.3 L35.625,35.375 L22.5,27.5 L22.5,12.5 L26.25,12.5 Z"
                        id="clock"
                      ></path>
                    </g>
                  </g>
                </SvgIcon>
              )}
              <Typography className={classes.unit_hurryTextSM}>
                {unit.hurryText}
              </Typography>
            </Grid>

            {unit.status === "reserved" && (
              <Typography className={classes.unit_hurryTextSM2}>
                Cancel Reservation
              </Typography>
            )}
            {unit.status === "active" && (
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <SvgIcon viewBox="-10 -15 75 75">
                  <g
                    id="Icons"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g
                      id="icons/general/clock"
                      fill="#4A4A4A"
                      fillRule="nonzero"
                    >
                      <path
                        d="M25,45 C36.05,45 45,36.05 45,25 C45,13.95 36.05,5 25,5 C13.95,5 5,13.95 5,25 C5,36.05 13.95,45 25,45 L25,45 Z M25,0 C38.8,0 50,11.2 50,25 C50,38.8 38.8,50 25,50 C11.175,50 0,38.75 0,25 C0,11.2 11.2,0 25,0 L25,0 Z M26.25,12.5 L26.25,25.625 L37.5,32.3 L35.625,35.375 L22.5,27.5 L22.5,12.5 L26.25,12.5 Z"
                        id="clock"
                      ></path>
                    </g>
                  </g>
                </SvgIcon>
                <Typography className={classes.unit_hurryTextSM2}>
                  Next payment due {unit.nextPayment}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </div>
    )
  );
}
