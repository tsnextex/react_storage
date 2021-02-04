import React, { useState, useEffect } from 'react';
import { FormLabel, FooterBtnContainer, NewCardContainer } from './style';
import { makeStyles } from "@material-ui/core/styles";
import { Button, Dropdown, Icon, Popup, Table, Radio } from 'semantic-ui-react';
import {
  Grid,
  Typography,
  TextField,
  Hidden
} from "@material-ui/core";
import SvgIcon from "@material-ui/core/SvgIcon";
import cc_tooltip_one from '../../img/cc_tooltip_one.png';
import cc_tooltip_two from '../../img/cc_tooltip_two.png';
import validator from 'validator';
import valid from 'card-validator';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "25px 0 100px 0",
  },
  unitGrid: {
    padding: 0,
    height: "fit-content",
    width: "100%",
  },
  paper: {
    padding: `3em`,
    width: "100%",
    [theme.breakpoints.down("sm")]: { padding: "1em" },
  },
  padOnDesktop: {
    padding: "1em 4em",
    [theme.breakpoints.down("sm")]: { padding: "1em" },
  },
  list: { padding: 0 },
  listItemText: {
    fontFamily: "Montserrat",
    fontWeight: "700 !important",
    fontSize: "12px",
  },
  listItemSelected: {
    backgroundColor: "rgba(27,60,146,0.1) !important",
    borderLeft: "4px solid #1B3C92",
  },
  button22: {
    boxShadow: 'none',
    height: 36,
    fontSize: 14,
    fontWeight: '700',
    width: "fill-available",
    textTransform: "capitalize"
  },
  formControl: {
    width: "100%",
  },
  button: { color: "#1B3C92", fontWeight: "bold", textTransform: "capitalize" },
  autoPayPaper: {
    background: "linear-gradient(0deg, #E9E9E9 0%, #FFFFFF 100%)",
    padding: theme.spacing(2),
  },
  autoPayTitle: {
    color: "#4A4A4A",
    fontFamily: "Montserrat",
    fontSize: "20px",
    marginLeft: "1em",
  },
  autoPayButton: {
    boxShadow: "none",
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
  tableTitle: {
    color: "#4A4A4A",
    fontFamily: "Montserrat",
    fontSize: "25px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "18px",
    },
  },
  tableSubtitle: {
    color: "#4A4A4A",
    fontFamily: "Montserrat",
    fontSize: "14px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "10px",
    },
  },
  apIcon: {
    marginRight: ".6em",
    [theme.breakpoints.down("sm")]: {
      fontSize: "18px",
    },
  },
}));

const states = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
const stateOptions = states.map((state, i) => { 
  return {
    key: i,
    text: state,
    value: state
  }
});

export const EditCard = props => {

  const {
    accountUnits,
    setCardTableStatus,
    selectedPaymentMethod
  } = props;

  const [street, setStreet] = useState(selectedPaymentMethod.billing_address_1);
  const [streetTwo, setStreetTwo] = useState(selectedPaymentMethod.billing_address_2);
  const [city, setCity] = useState(selectedPaymentMethod.billing_city);
  const [state, setState] = useState(selectedPaymentMethod.billing_state);
  const [zip, setZip] = useState(selectedPaymentMethod.billing_zipcode);
  const [cardName, setCardName] = useState(selectedPaymentMethod.cc_holder_name);
  const [cardNumber, setCardNumber] = useState(selectedPaymentMethod.cc_last);
  const [cardExp, setCardExp] = useState(selectedPaymentMethod.cc_expires);
  const [cardCvc, setCardCvc] = useState('');
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const classes = useStyles();

  useEffect(() => {

    console.log('selected payment method', selectedPaymentMethod);

    // valid card form for submission
    const formDisabled = !!(
      validator.isEmpty(street, { ignore_whitespace: true }) ||
      validator.isEmpty(city, { ignore_whitespace: true }) ||
      validator.isEmpty(state, { ignore_whitespace: true }) ||
      validator.isEmpty(zip, { ignore_whitespace: true }) ||
      validator.isEmpty(cardName, { ignore_whitespace: true }) ||
      validator.isEmpty(cardNumber, { ignore_whitespace: true }) ||
      validator.isEmpty(cardExp, { ignore_whitespace: true }) ||
      validator.isEmpty(cardCvc, { ignore_whitespace: true }) ||
      !valid.number(cardNumber).isValid ||
      selectedUnits.length === 0
    );

    setSubmitDisabled(formDisabled);

  }, [street, city, state, zip, cardName, cardNumber, cardExp, cardCvc, selectedUnits]);

  const unitToggle = unitId => {

    // remove unit if previously selected else add to array
    const newUnits = selectedUnits.includes(unitId) ? [...selectedUnits].filter(unit => unit !== unitId) : [...selectedUnits, unitId];
    setSelectedUnits(newUnits);
  }

  return (
    <NewCardContainer className={classes.paper}>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
        <Grid
          item
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography
              variant="h4"
              className={classes.tableTitle}
              children={"Edit Card"}
            />
          </Grid>

          <Hidden smDown>
            <Grid
              item
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
              wrap="nowrap"
              style={{ width: "180px" }}
            >
              <SvgIcon
                viewBox="0 0 50 50"
                style={{ width: "50px", height: "40px" }}
              >
                <g id="icons/account/billing" fill="#585858">
                  <path
                    d="M44.6428571,5 C47.6015254,5 50,7.39847455 50,10.3571429 L50,10.3571429 L50,38.9285714 C50,41.8872397 47.6015254,44.2857143 44.6428571,44.2857143 L44.6428571,44.2857143 L5.35714286,44.2857143 C2.39847455,44.2857143 0,41.8872397 0,38.9285714 L0,38.9285714 L0,10.3571429 C0,7.39847455 2.39847455,5 5.35714286,5 L5.35714286,5 Z M46.428,24.642 L3.571,24.642 L3.57142857,38.9285714 C3.57142857,39.8654831 4.29296967,40.6338697 5.21068652,40.7083661 L5.35714286,40.7142857 L44.6428571,40.7142857 C45.6290799,40.7142857 46.4285714,39.9147942 46.4285714,38.9285714 L46.4285714,38.9285714 L46.428,24.642 Z M16.0714286,35.3571429 L16.0714286,38.9285714 L5.35714286,38.9285714 L5.35714286,35.3571429 L16.0714286,35.3571429 Z M33.9285714,35.3571429 L33.9285714,38.9285714 L19.6428571,38.9285714 L19.6428571,35.3571429 L33.9285714,35.3571429 Z M44.6428571,8.57142857 L5.35714286,8.57142857 C4.37092009,8.57142857 3.57142857,9.37092009 3.57142857,10.3571429 L3.57142857,10.3571429 L3.571,13.928 L46.428,13.928 L46.4285714,10.3571429 C46.4285714,9.42023123 45.7070303,8.65184455 44.7893135,8.57734816 L44.6428571,8.57142857 Z"
                    id="Combined-Shape"
                  ></path>
                </g>
              </SvgIcon>
              <Typography
                component="span"
                style={{
                  color: "#4A4A4A",
                  fontFamily: "Montserrat",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                New Card
              </Typography>
            </Grid>
          </Hidden>
        </Grid>
        <Grid item container direction="column" spacing={2}>
          <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
              <FormLabel>Street Address</FormLabel>
              <TextField
                id="standard-size-small"
                value={street}
                onChange={event => setStreet(event.target.value)}
                size="small"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormLabel>Street Address 2</FormLabel>
              <TextField
                id="standard-size-small"
                value={streetTwo}
                onChange={event => setStreetTwo(event.target.value)}
                size="small"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormLabel>City</FormLabel>
              <TextField
                id="standard-size-small"
                value={city}
                onChange={event => setCity(event.target.value)}
                size="small"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              container
              spacing={2}
              justify="space-between"
            >
              <Grid item xs={6} md={6}>
                <FormLabel>State</FormLabel>
                <Dropdown
                  search
                  selection
                  options={stateOptions}
                  placeholder="Select"
                  value={state}
                  onChange={(e, { value }) => setState(value)}
                  style={{
                    borderColor: 'rgba(0, 0, 0, 0.23)',
                    minWidth: 0,
                    width: '100%'
                  }}
                />
              </Grid>
              <Grid item xs={6} md={6}>
                <FormLabel>Zip Code</FormLabel>
                <TextField
                  type="number"
                  id="standard-size-small"
                  value={zip}
                  onChange={event => setZip(event.target.value)}
                  size="small"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item container direction="column" spacing={2}>
          <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
              <FormLabel>Name on Card</FormLabel>
              <TextField
                id="standard-size-small"
                value={cardName}
                onChange={event => setCardName(event.target.value)}
                size="small"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormLabel>Card Number</FormLabel>
              <TextField
                type="number"
                id="standard-size-small"
                placeholder={cardNumber}
                value={cardNumber}
                onChange={event => setCardNumber(event.target.value)}
                size="small"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormLabel>Expiration Date</FormLabel>
              <TextField
                id="standard-size-small"
                value={cardExp}
                onChange={event => setCardExp(event.target.value)}
                size="small"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormLabel>
                Security Code
                <Popup basic flowing hoverable trigger={<Icon style={{ marginLeft: 3 }} name="question circle outline" />}>
                  <section
                    style={{
                      display: 'flex',
                      justifyContent: 'space-around'
                    }}
                  >
                    <div
                      style={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        fontSize: 10,
                        justifyContent: 'center',
                        padding: 4
                      }}
                    > 
                      3 digit strength code
                      <img src={cc_tooltip_two} alt="cvc" />
                    </div>
                    <div
                      style={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        fontSize: 10,
                        justifyContent: 'center',
                        padding: 4
                      }}
                    > 
                      4 digit strength code
                      <img src={cc_tooltip_one} alt="cvc" />
                    </div>
                  </section>
                </Popup>
              </FormLabel>
              <TextField
                type="number"
                id="standard-size-small"
                value={cardCvc}
                onChange={event => setCardCvc(event.target.value)}
                size="small"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Typography
        variant="body1"
        style={{
          color: "#4A4A4A",
          fontFamily: "Montserrat",
          fontSize: "12px",
          margin: '50px 0 25px 0'
        }}
        children={"Enable units below that you will like to link this payment method."}
      />
      
      <Table basic='very'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Location</Table.HeaderCell>
            <Table.HeaderCell>Unit</Table.HeaderCell>
            <Table.HeaderCell>Auto-Pay</Table.HeaderCell>
            <Table.HeaderCell>Enable</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        { accountUnits?.length > 0 &&
          <Table.Body>
            { accountUnits.map(unit => {
              return unit.rentals.map(rental => {
                return (
                  <Table.Row>
                    <Table.Cell>{unit.name}</Table.Cell>
                    <Table.Cell>#{rental.unit_number}</Table.Cell>
                    <Table.Cell>N/A</Table.Cell>
                    <Table.Cell>
                      <Radio onChange={() => unitToggle(rental.unit_number)} toggle />
                    </Table.Cell>
                  </Table.Row>
                )
              })
            })}
          </Table.Body>
        }
      </Table>

      <Hidden smDown>
        <Grid item container spacing={2} justify="flex-end" style={{ marginTop: 25 }}>
          <Button
            className="footerCancelBtn footerBtn"
            onClick={() => setCardTableStatus(0)}
          >
            Cancel
          </Button>
          <Button
            onClick={() => setCardTableStatus(0)}
            className="footerSaveBtn footerBtn"
            disabled={submitDisabled}
          >
            Save
          </Button>
        </Grid>
      </Hidden>

      <Hidden mdUp>
        <FooterBtnContainer>
          <Button
            className="footerCancelBtn footerBtn"
            onClick={() => setCardTableStatus(0)}
          >
            Cancel
          </Button>

          <Button
            className="footerSaveBtn footerBtn"
            onClick={() => setCardTableStatus(0)}
            disabled={submitDisabled}
          >
            Save
          </Button>
        </FooterBtnContainer>
      </Hidden>
    </NewCardContainer>
  );
};