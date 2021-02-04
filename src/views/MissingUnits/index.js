import React from "react";
import {
  Button,
  IconButton,
  MenuItem,
  Input,
  Checkbox,
  Container,
  Select,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  FormHelperText,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import CallIcon from "@material-ui/icons/Call";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import SvgIcon from "@material-ui/core/SvgIcon";

import DateFnsUtils from "@date-io/date-fns";
import _ from "lodash";
import { Link } from "react-router-dom";
import moment from "moment";

import { _getLocation } from "../../components/FilteredResults/utils";
import UnitComp from "./UnitComp";
import { Lock } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  container: {
    padding: theme.spacing(2),
    background: "#F4F5F8",
  },
  showMore: {
    textAlign: "center",
    color: "#1B3C92",
    fontSize: "10px",
    fontWeight: 700,
  },
  cardActions: {
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  paper: {
    padding: theme.spacing(3),
  },
  datePickerContainer: {
    display: "flex",
    flexWrap: "wrap",
    padding: 0,
  },
  dateField: {
    pading: 0,
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    width: "100%",
  },
  radioLabel: {
    fontSize: "12px",
    fontWeight: "bold",
  },
  helperText: {
    padding: theme.spacing(0),
    marginLeft: "32px",
    marginTop: "-14px",
  },
  checkRoot: {},
  button: {
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
    width: "100%",
  },
  // location info styles
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
  divider: { marginLeft: "0", marginRight: "0" },
  formControl: {
    width: "100%",
  },
  paperGrid: {
    minWidth: "380px",
    [theme.breakpoints.down("xs")]: { minWidth: "340px" },
  },
}));

export default function MissingUnits({ locationsData }) {
  const locations = locationsData.filter((x) => x.type === "location");

  // useeffect and grab location object if it's nut here
  const currentRoute = useLocation();

  const [locationObj, setLocationObj] = React.useState(false);
  const [selectedUnit, setUnit] = React.useState(false);
  React.useEffect(() => {
    const locationCode = _.get(currentRoute, ["state", "locationCode"], false);
    const selectedUnit = _.get(currentRoute, ["state", "unit"], false);
    const lo = _getLocation({ code: locationCode });
    setLocationObj(lo);
    setUnit(selectedUnit);
  }, [currentRoute]);

  const classes = useStyles();

  const [radioValue, setRadioValue] = React.useState("reserve");

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  React.useEffect(() => {
    if (radioValue === "movein") setSelectedDate(moment());
  }, [radioValue]);

  let today = moment();
  const maxDate = moment().add(7, "days");
  const [selectedDate, setSelectedDate] = React.useState(today);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [acceptTC, setTCChecked] = React.useState(false);

  const handleTCChange = (event) => {
    setTCChecked(event.target.checked);
  };

  const [showDetails, setShowDetails] = React.useState(false);

  //state var for current step (1 or 2)
  const [currentStep, setCurrentStep] = React.useState(1);

  const [enableAutoPay, changeAutoPay] = React.useState(true);
  const [activeMilitary, changeActiveMilitary] = React.useState(false);

  const [locked, setLocked] = React.useState(false);
  const lock = () => setLocked(true);
  const unlock = () => setLocked(false);

  return (
    <Container maxWidth="sm" className={classes.container}>
      {currentStep === 1 && (
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="center"
              spacing={2}
            >
              <Grid item style={{}}>
                <SvgIcon viewBox="0 0 50 50" style={{ fontSize: "4em" }}>
                  <g transform="translate(4.612245, 0.000000)">
                    <path
                      d="M19.8877551,0 C30.6573077,0 39.3877551,8.72105084 39.3877551,19.4790122 C39.3877551,24.6346369 36.813281,28.5954681 34.108903,32.8067419 C30.8714878,37.8480644 26.0799241,43.5791504 19.7342118,50 C13.1668564,43.5791504 8.24945452,37.5920423 4.98200611,32.0386755 C2.63316207,28.0465719 0.387755102,24.2648355 0.387755102,19.4790122 C0.387755102,8.72105084 9.11820248,0 19.8877551,0 Z M20.3877551,8 C14.3126229,8 9.3877551,12.9248678 9.3877551,19 C9.3877551,25.0751322 14.3126229,30 20.3877551,30 C26.4628873,30 31.3877551,25.0751322 31.3877551,19 C31.3877551,12.9248678 26.4628873,8 20.3877551,8 Z"
                      id="Combined-Shape"
                      fill="#1B3C92"
                    ></path>
                  </g>
                </SvgIcon>
              </Grid>
              <Grid item>
                <Typography
                  variant="h4"
                  style={{
                    color: "#4A4A4A",
                    fontFamily: "Montserrat",
                    fontSize: "25px",
                    textAlign: "center",
                  }}
                  children={"Let's find your units"}
                />
                <Typography
                  variant="body1"
                  style={{
                    color: "#4A4A4A",
                    fontFamily: "Montserrat",
                    fontSize: "12px",
                    textAlign: "center",
                  }}
                  children={
                    "Select a location. For better results enter the gate access code & unit number."
                  }
                />
              </Grid>
              <Grid
                item
                sm={8}
                container
                direction="column"
                justify="flex-start"
                alignItems="stretch"
                spacing={2}
              >
                <Grid item>
                  <TextField
                    label="Email address"
                    id="standard-size-small"
                    defaultValue=""
                    size="small"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Phone Number"
                    id="standard-size-small"
                    defaultValue=""
                    size="small"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <Typography
                    variant="body1"
                    style={{
                      color: "#4A4A4A",
                      fontFamily: "Montserrat",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                    children={"OR"}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Gate Access Code"
                    id="standard-size-small"
                    defaultValue=""
                    size="small"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Unit Number"
                    id="standard-size-small"
                    defaultValue=""
                    size="small"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid
                item
                sm={4}
                container
                direction="column"
                justify="flex-start"
                alignItems="stretch"
              >
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  className={classes.button}
                  onClick={() => setCurrentStep(2)}
                >
                  Continue
                </Button>
              </Grid>
              <Grid item>
                <Link to="/my-account">
                  <Button
                    color="primary"
                    style={{
                      textTransform: "capitalize",
                      color: "#1B3C92",
                      fontFamily: "Montserrat",
                      fontSize: "12px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      )}
      {currentStep === 2 && (
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="center"
              spacing={2}
            >
              <Grid item style={{}}>
                <SvgIcon viewBox="0 0 50 50" style={{ fontSize: "4em" }}>
                  <g transform="translate(4.612245, 0.000000)">
                    <path
                      d="M19.8877551,0 C30.6573077,0 39.3877551,8.72105084 39.3877551,19.4790122 C39.3877551,24.6346369 36.813281,28.5954681 34.108903,32.8067419 C30.8714878,37.8480644 26.0799241,43.5791504 19.7342118,50 C13.1668564,43.5791504 8.24945452,37.5920423 4.98200611,32.0386755 C2.63316207,28.0465719 0.387755102,24.2648355 0.387755102,19.4790122 C0.387755102,8.72105084 9.11820248,0 19.8877551,0 Z M20.3877551,8 C14.3126229,8 9.3877551,12.9248678 9.3877551,19 C9.3877551,25.0751322 14.3126229,30 20.3877551,30 C26.4628873,30 31.3877551,25.0751322 31.3877551,19 C31.3877551,12.9248678 26.4628873,8 20.3877551,8 Z"
                      id="Combined-Shape"
                      fill="#1B3C92"
                    ></path>
                  </g>
                </SvgIcon>
              </Grid>
              <Grid item>
                <Typography
                  variant="h4"
                  style={{
                    color: "#4A4A4A",
                    fontFamily: "Montserrat",
                    fontSize: "25px",
                    textAlign: "center",
                  }}
                  children={"We found the following units."}
                />
                <Typography
                  variant="body1"
                  style={{
                    color: "#4A4A4A",
                    fontFamily: "Montserrat",
                    fontSize: "12px",
                    textAlign: "center",
                  }}
                  children={
                    "Enter unit access gate code to unlock units and add to your account."
                  }
                />
              </Grid>

              <Grid item className={classes.paperGrid}>
                <Paper
                  style={{
                    backgroundColor: "#F4F5F8",
                    minWidth: "fit-content",
                  }}
                >
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid
                      item
                      xs={8}
                      container
                      direction="row"
                      justify="flex-start"
                      alignItems="center"
                    >
                      <Grid item style={{ padding: "1em" }}>
                        <SvgIcon viewBox="-10 -15 70 70">
                          {!locked ? (
                            <g id="icons/general/locked" fill="#585858">
                              <path
                                d="M37.25,20.8333333 L37.25,12.5 C37.25,5.59791667 31.6520833,0 24.75,0 C17.8479167,0 12.25,5.59791667 12.25,12.5 L12.25,20.8333333 L6,20.8333333 L6,50 L43.5,50 L43.5,20.8333333 L37.25,20.8333333 Z M16.4166667,12.5 C16.4166667,7.90416667 20.1541667,4.16666667 24.75,4.16666667 C29.34375,4.16666667 33.0833333,7.90416667 33.0833333,12.5 L33.0833333,20.8333333 L16.4166667,20.8333333 L16.4166667,12.5 Z"
                                id="Shape"
                              ></path>
                            </g>
                          ) : (
                            <g id="icons/general/lock" fill="#377D21">
                              <path
                                d="M37.25,20.8333333 L37.25,12.5 C37.25,5.59791667 31.6520833,0 24.75,0 C17.8479167,0 12.25,5.59791667 12.25,12.5 L12.25,20.8333333 L6,20.8333333 L6,50 L43.5,50 L43.5,20.8333333 L37.25,20.8333333 Z M16.4166667,12.5 C16.4166667,7.90416667 20.1541667,4.16666667 24.75,4.16666667 C29.34375,4.16666667 33.0833333,7.90416667 33.0833333,12.5 L33.0833333,20.8333333 L16.4166667,20.8333333 L16.4166667,12.5 Z M23.5166667,41.6666667 L17.5958333,35.925 L20.0375,33.48125 L23.5166667,36.7791667 L30.9416667,29.1666667 L33.3875,31.6104167 L23.5166667,41.6666667 L23.5166667,41.6666667 Z"
                                id="Shape"
                              ></path>
                            </g>
                          )}
                        </SvgIcon>
                      </Grid>
                      <Grid
                        item
                        container
                        direction="column"
                        style={{ width: "fit-content", paddingRight: ".4em" }}
                      >
                        <Grid item>
                          <Typography
                            variant="body1"
                            style={{
                              color: "#4A4A4A",
                              fontFamily: "Montserrat",
                              fontSize: "10px",
                            }}
                            children={"Hobe Sound II - #**50"}
                          />
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="body1"
                            style={{
                              color: "#4A4A4A",
                              fontFamily: "Montserrat",
                              fontSize: "10px",
                            }}
                            children={"3' x 3' | Small"}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    {!locked ? (
                      <Grid item xs={4} container direction="row" wrap="nowrap">
                        <Grid item>
                          <Input
                            style={{
                              border: "1px solid #D6D6D6",
                              borderRadius: "3px",
                              background: "#FFFFFF",
                              width: "80px",
                              paddingLeft: ".8em",
                            }}
                            variant="contained"
                            placeholder="Code"
                            inputProps={{ "aria-label": "description" }}
                          />
                        </Grid>
                        <Grid item>
                          <Button
                            style={{
                              minWidth: "fit-content",
                              width: "fit-content",
                            }}
                            onClick={() => lock()}
                          >
                            <SvgIcon viewBox="-10 -15 70 70">
                              <g id="icons/account/my-units" fill="#585858">
                                <path
                                  d="M31.6104943,0 C41.7904233,0 50,8.20954448 50,18.3895057 C50,28.545685 41.7667743,36.7788462 31.6105769,36.7788462 C31.2254179,36.7788462 30.8414025,36.7668444 30.4307692,36.7384615 L30.4307692,36.7384615 L29.7885055,37.4665553 C28.9588182,38.3999606 27.8594555,39.0338351 26.6592098,39.2924092 L26.6592098,39.2924092 L26.1769231,39.3692308 L26.1781006,39.4128012 C25.9258239,42.2088504 23.699235,44.4354393 20.8884615,44.6846154 C20.6373624,47.4973119 18.4107735,49.7239008 15.6147242,49.9761776 L15.6147242,49.9761776 L15.0841346,50 L5.82932692,50 C2.60986484,50 0,47.3901352 0,44.1706731 L0,44.1706731 L0,37.7204853 C0,36.174592 0.614095044,34.6919746 1.70733419,33.5984925 L1.70733419,33.5984925 L13.5346154,21.7692308 L13.3707224,20.7401234 C13.3210721,20.3524913 13.28368,19.9624855 13.2587004,19.5705531 L13.2587004,19.5705531 L13.2211538,18.3894231 C13.2211538,8.23322573 21.454315,0 31.6104943,0 Z M31.6104943,3.84615385 C23.5784781,3.84615385 17.0673077,10.3574069 17.0673077,18.3894231 C17.0673077,19.9818284 17.3241286,21.5140775 17.7970328,22.9480769 L17.7970328,22.9480769 L4.42697566,36.318134 C4.05513071,36.6900616 3.84615385,37.1945312 3.84615385,37.7204853 L3.84615385,37.7204853 L3.84615385,44.1706731 C3.84615385,45.265963 4.73403696,46.1538462 5.82932692,46.1538462 L5.82932692,46.1538462 L15.0841346,46.1538462 C16.1794246,46.1538462 17.0673077,45.265963 17.0673077,44.1706731 L17.0673077,44.1706731 L17.0673077,40.8653846 L20.3725962,40.8653846 C21.4678861,40.8653846 22.3557692,39.9775015 22.3557692,38.8822115 L22.3557692,38.8822115 L22.3557692,35.5769231 L25.431588,35.5769231 C25.9980611,35.5769435 26.537502,35.3347093 26.9138447,34.9113206 L26.9138447,34.9113206 L28.8980093,32.6790941 C29.7769681,32.8449369 30.6834435,32.9326923 31.6105769,32.9326923 C39.6425931,32.9326923 46.1538462,26.4215219 46.1538462,18.3895057 C46.1538462,10.3336914 39.666226,3.84615385 31.6104943,3.84615385 Z M36,10 C38.2091667,10 40,11.7908333 40,14 C40,16.2091667 38.2091667,18 36,18 C33.7908333,18 32,16.2091667 32,14 C32,11.7908333 33.7908333,10 36,10 Z"
                                  id="Combined-Shape"
                                ></path>
                              </g>
                            </SvgIcon>
                          </Button>
                        </Grid>
                      </Grid>
                    ) : (
                      <Grid item xs={4} container direction="row" wrap="nowrap">
                        <Button
                          onClick={() => unlock()}
                          color="primary"
                          style={{
                            textTransform: "capitalize",
                            color: "#1B3C92",
                            fontFamily: "Montserrat",
                            fontSize: "10px",
                            fontWeight: "bold",
                            cursor: "pointer",
                          }}
                        >
                          Re-Lock
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                </Paper>
              </Grid>
              <Grid item>
                <Button
                  disabled={!locked}
                  variant="contained"
                  color="primary"
                  fullWidth
                  className={classes.button}
                  onClick={() => setCurrentStep(2)}
                >
                  Add
                </Button>
              </Grid>
              <Grid item>
                <Link to="/my-account">
                  <Button
                    color="primary"
                    style={{
                      textTransform: "capitalize",
                      color: "#1B3C92",
                      fontFamily: "Montserrat",
                      fontSize: "12px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      )}
    </Container>
  );
}
