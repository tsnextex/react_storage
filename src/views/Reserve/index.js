import React from "react";
import {
  Button,
  ButtonBase,
  ButtonGroup,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
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

import DateFnsUtils from "@date-io/date-fns";
import _ from "lodash";
import moment from "moment";

import { _getLocation } from "../../components/FilteredResults/utils";
import UnitComp from "./UnitComp";

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
}));

export default function Reserve() {

  // useeffect and grab location object if it's nut here
  const currentRoute = useLocation();

  const [locationObj, setLocationObj] = React.useState(false);
  const [selectedUnit, setUnit] = React.useState(false);

  React.useEffect(() => {

    const locationCode = _.get(currentRoute, ["state", "locationCode"], false);
    const selectedUnit = _.get(currentRoute, ["state", "unit"], false);
    const lo = _getLocation({ code: locationCode });

    console.log(lo, selectedUnit)

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

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid
        item
        xs={12}
        container
        spacing={2}
        direction="row"
        justify="center"
        alignItems="flex-start"
      >
        {currentStep === 1 && (
          <Grid item xs={12} md={8}>
            <Paper className={classes.paper}>
              <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
                spacing={2}
              >
                <Grid item>
                  <Typography
                    variant="h4"
                    style={{
                      color: "#4A4A4A",
                      fontFamily: "Montserrat",
                      fontSize: "25px",
                    }}
                    children={"Reserve Your Unit"}
                  />
                  <Typography
                    variant="body1"
                    style={{
                      color: "#4A4A4A",
                      fontFamily: "Montserrat",
                      fontSize: "12px",
                    }}
                    children={
                      "Lock in this rate for the storage unit you selected. No credit card or obligation needed."
                    }
                  />
                  <Typography
                    variant="body1"
                    style={{
                      color: "#4A4A4A",
                      fontFamily: "Montserrat",
                      fontSize: "12px",
                    }}
                    children={"Already have an account? Sign In"}
                  />
                </Grid>
                <Grid item container spacing={2}>
                  <Grid item md={6}>
                    <TextField
                      label="First Name"
                      id="standard-size-small"
                      defaultValue=""
                      size="small"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      label="Last Name"
                      id="standard-size-small"
                      defaultValue=""
                      size="small"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid item container spacing={2}>
                  <Grid item md={6}>
                    <TextField
                      label="Email"
                      id="standard-size-small"
                      defaultValue=""
                      size="small"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      label="Phone"
                      id="standard-size-small"
                      defaultValue=""
                      size="small"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <Grid item container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormControl component="fieldset">
                      <FormLabel
                        style={{
                          color: "#4A4A4A",
                          fontFamily: "Montserrat",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                        component="legend"
                      >
                        Reserve or Move In?
                      </FormLabel>
                      <RadioGroup
                        aria-label="reserve"
                        name="reserveormovein"
                        value={radioValue}
                        onChange={handleRadioChange}
                      >
                        <FormControlLabel
                          value="reserve"
                          control={<Radio />}
                          label="Reserve Unit"
                          classes={{ label: classes.radioLabel }}
                        />
                        <FormHelperText className={classes.helperText}>
                          Lock in your price for 7 days, no credit card or
                          obligation.
                        </FormHelperText>
                        <FormControlLabel
                          value="movein"
                          control={<Radio />}
                          label="Express Move In"
                          color="default"
                          classes={{ label: classes.radioLabel }}
                        />
                        <FormHelperText className={classes.helperText}>
                          Save time on your move in day and sign your lease
                          online.
                        </FormHelperText>
                      </RadioGroup>
                    </FormControl>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={acceptTC}
                          onChange={handleTCChange}
                          name="acceptTC"
                          color="default"
                        />
                      }
                      classes={{
                        root: classes.checkRoot,
                        label: classes.radioLabel,
                      }}
                      label="I accept the terms and conditions"
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={() => setCurrentStep(2)}
                      disabled={acceptTC === false}
                    >
                      Lock In Price
                    </Button>
                  </Grid>
                  <Grid item md={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <form className={classes.datePickerContainer} noValidate>
                        <KeyboardDatePicker
                          fullWidth
                          disablePast
                          disabled={radioValue === "movein"}
                          margin="normal"
                          id="date-picker-dialog"
                          label="Desired move in date"
                          format="MM/dd/yyyy"
                          maxDate={maxDate}
                          value={selectedDate}
                          onChange={handleDateChange}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                      </form>
                    </MuiPickersUtilsProvider>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        )}
        {currentStep === 2 && (
          <Grid item xs={12} md={8}>
            <Paper className={classes.paper}>
              <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
                spacing={3}
              >
                <Grid item>
                  <Typography
                    variant="h4"
                    style={{
                      color: "#4A4A4A",
                      fontFamily: "Montserrat",
                      fontSize: "25px",
                    }}
                    children={"Next Steps"}
                  />
                  <Typography
                    variant="body1"
                    style={{
                      color: "#4A4A4A",
                      fontFamily: "Montserrat",
                      fontSize: "12px",
                    }}
                    children={
                      "Now that we locked in your unit’s price you can confirm your move-in or wait for one of our  representative to reach out."
                    }
                  />
                </Grid>
                <Grid item container direction="column" spacing={2}>
                  <Grid item md={6}>
                    <Typography
                      variant="body1"
                      style={{
                        color: "#4A4A4A",
                        fontFamily: "Montserrat",
                        fontSize: "12px",
                      }}
                      children={"Billing Address"}
                    />
                  </Grid>
                  <Grid item container spacing={2}>
                    <Grid item md={6}>
                      <TextField
                        label="Street Address"
                        id="standard-size-small"
                        defaultValue=""
                        size="small"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={6}>
                      <TextField
                        label="Street Address 2"
                        id="standard-size-small"
                        defaultValue=""
                        size="small"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <Grid item container spacing={2}>
                    <Grid item md={6}>
                      <TextField
                        label="City"
                        id="standard-size-small"
                        defaultValue=""
                        size="small"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      container
                      spacing={2}
                      justify="space-between"
                    >
                      <Grid item md={6}>
                        <TextField
                          label="State"
                          id="standard-size-small"
                          defaultValue=""
                          size="small"
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={6}>
                        <TextField
                          label="Zip Code"
                          id="standard-size-small"
                          defaultValue=""
                          size="small"
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item container direction="column" spacing={2}>
                  <Grid item md={6}>
                    <Typography
                      variant="body1"
                      style={{
                        color: "#4A4A4A",
                        fontFamily: "Montserrat",
                        fontSize: "12px",
                      }}
                      children={"Payment Details"}
                    />
                  </Grid>
                  <Grid item container spacing={2}>
                    <Grid item md={6}>
                      <TextField
                        label="Name on Card"
                        id="standard-size-small"
                        defaultValue=""
                        size="small"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={6}>
                      <TextField
                        label="Card Number"
                        id="standard-size-small"
                        defaultValue=""
                        size="small"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <Grid item container spacing={2}>
                    <Grid item md={6}>
                      <TextField
                        label="Expiration Date"
                        id="standard-size-small"
                        defaultValue=""
                        size="small"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={6}>
                      <TextField
                        label="Security Code (CVV)"
                        id="standard-size-small"
                        defaultValue=""
                        size="small"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                  </Grid>

                  <Grid item container spacing={2}>
                    <Grid item md={6} container justify="space-between">
                      <Grid item md={12}>
                        <FormLabel
                          style={{
                            color: "#4A4A4A",
                            fontFamily: "Montserrat",
                            fontSize: "12px",
                            fontWeight: "bold",
                          }}
                          component="legend"
                        >
                          Do you want to enable AutoPay?
                        </FormLabel>
                      </Grid>
                      <Grid item md={12}>
                        <ButtonGroup fullWidth aria-label="auto-pay">
                          <Button
                            variant={enableAutoPay ? "contained" : "outlined"}
                            color={enableAutoPay ? "primary" : "default"}
                            onClick={() => changeAutoPay(true)}
                          >
                            Yes
                          </Button>
                          <Button
                            variant={!enableAutoPay ? "contained" : "outlined"}
                            color={!enableAutoPay ? "primary" : "default"}
                            onClick={() => changeAutoPay(false)}
                          >
                            No
                          </Button>
                        </ButtonGroup>
                      </Grid>
                    </Grid>
                    <Grid item md={6} container justify="space-between">
                      <Grid item md={12}>
                        <FormLabel
                          style={{
                            color: "#4A4A4A",
                            fontFamily: "Montserrat",
                            fontSize: "12px",
                            fontWeight: "bold",
                          }}
                          component="legend"
                        >
                          Active Military?
                        </FormLabel>
                      </Grid>
                      <Grid item md={12}>
                        <ButtonGroup fullWidth aria-label="military">
                          <Button
                            variant={activeMilitary ? "contained" : "outlined"}
                            color={activeMilitary ? "primary" : "default"}
                            onClick={() => changeActiveMilitary(true)}
                          >
                            Yes
                          </Button>
                          <Button
                            variant={!activeMilitary ? "contained" : "outlined"}
                            color={!activeMilitary ? "primary" : "default"}
                            onClick={() => changeActiveMilitary(false)}
                          >
                            No
                          </Button>
                        </ButtonGroup>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Create a Password"
                        id="standard-size-small"
                        defaultValue=""
                        size="small"
                        variant="outlined"
                        type="password"
                        fullWidth
                        style={{ paddingBottom: "1.5em" }}
                      />
                      <Typography
                        variant="body1"
                        style={{
                          color: "#4A4A4A",
                          fontFamily: "Montserrat",
                          fontSize: "12px",
                          marginTop: "3em",
                        }}
                        component="span"
                        children={"Amount due today: "}
                      />
                      <Typography
                        variant="body1"
                        style={{
                          color: "#4A4A4A",
                          fontFamily: "Montserrat",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                        component="span"
                        children={"$39.32"}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        style={{ marginTop: "1.5em" }}
                        onClick={() => setCurrentStep(2)}
                      >
                        Rent Unit
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        )}
        <Grid item xs={12} md={3} container direction="column">
          {locationObj && (
            <Paper>
              <Grid container direction="column">
                <Grid
                  item
                  container
                  direction="row"
                  alignItems="center"
                  className={classes.wrapper}
                >
                  <Grid item xs={4} className={classes.imageWrapper}>
                    <img
                      className={classes.img}
                      alt="locationImage"
                      src={locationObj.image}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={8}
                    container
                    className={classes.bodyWrapper}
                    direction="column"
                    justify="space-evenly"
                    alignItems="stretch"
                  >
                    <Typography
                      className={classes.name}
                      children={locationObj.name}
                    />
                    <Typography className={classes.distance}>
                      <LocationOnIcon className={classes.icon} />
                      {locationObj.distance}
                    </Typography>
                    <Typography
                      className={classes.location}
                      children={locationObj.location}
                    />
                    <Typography className={classes.phone}>
                      <CallIcon className={classes.icon} />
                      {locationObj.phone}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container direction="column">
                  {selectedUnit && (
                    <UnitComp
                      locationCode={selectedUnit.code}
                      unit={selectedUnit}
                      promo={selectedUnit.promo}
                    />
                  )}
                  <React.Fragment>
                    <Divider className={classes.divider} />
                    <ButtonBase onClick={() => setShowDetails((x) => !x)}>
                      <Grid item>
                        <Typography className={classes.showMore}>
                          {showDetails
                            ? "- Hide unit details"
                            : "+ View unit details"}
                        </Typography>
                      </Grid>
                    </ButtonBase>
                  </React.Fragment>
                </Grid>
              </Grid>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
