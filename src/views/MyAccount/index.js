import React, { useEffect, useState } from "react";
import { FormLabel, FooterBtnContainer, NoUnitsContainer } from './style';
import client from "../../apollo";
import { MyAccountQuery } from "../../graphql/myAccount";
import { gqlRequest } from "../../utils";
import { Button as SemBtn, Icon } from 'semantic-ui-react';
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  MenuItem,
  Grid,
  Paper,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  Select,
  ListItemText,
  Hidden,
  Switch,
  FormControlLabel,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import { LocationCard } from "./components";
import { Link } from "react-router-dom";
import { _getUserLocations } from "../../components/FilteredResults/utils";
import SvgIcon from "@material-ui/core/SvgIcon";
import DataTable from "./DataTable";
import HistoryTable from "./HistoryTable";
import BillTable from "./BillTable";
import CardTable from "./CardTable";
import TopBar from "./components/TopBar";
import { NewCard } from './NewCard';
import { EditCard } from './EditCard';
import { PaymentMethods } from './PaymentMethods';

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#1B3C92",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#1B3C92",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "25px 0 100px 0",
    overflowY: 'scroll',
    [theme.breakpoints.down("sm")]: { height: "calc(100vh - 110px)" },
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

export default function MyAccount(props) {

  const classes = useStyles();
  const userLocations = _getUserLocations();

  const {
    currentUser,
    setCurrentUser,
    setSearching
  } = props;

  const [accountDetails, setAccountDetails] = useState(null);
  const [accountUnits, setAccountUnits] = useState(null);
  const [accountUnitsHistory, setAccountUnitsHistory] = useState(null);
  const [accountPaymentMethods, setAccountPaymentMethods] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  useEffect(() => {

    if (currentUser) {
      
      // get user details by id
      gqlRequest(client, MyAccountQuery(currentUser.user))
        .then(userDetails => {

          console.log('user res', userDetails);
          // set user
          setAccountDetails(userDetails.data.getAccountDetails);
          setAccountUnits(userDetails.data.getAccountUnits);
          setAccountUnitsHistory(userDetails.data.getAccountMovedOutUnits);
          setAccountPaymentMethods(userDetails.data.getAccountPaymentMethods);
        });
    }

  }, [currentUser]);


  const removeDeletedPaymentMethod = id => {

    // remove deleted payment method
    const newPaymentMethods = [...accountPaymentMethods].filter(x => x.id !== id);
    setAccountPaymentMethods(newPaymentMethods);
  }

  //selected tab
  const [selectedIndex, setSelectedIndex] = React.useState(2);
  const stepIcons = [
    <SvgIcon viewBox="-20 -15 80 80">
      <g id="icons/account/my-units" fill="#585858">
        <path
          d="M31.6104943,0 C41.7904233,0 50,8.20954448 50,18.3895057 C50,28.545685 41.7667743,36.7788462 31.6105769,36.7788462 C31.2254179,36.7788462 30.8414025,36.7668444 30.4307692,36.7384615 L30.4307692,36.7384615 L29.7885055,37.4665553 C28.9588182,38.3999606 27.8594555,39.0338351 26.6592098,39.2924092 L26.6592098,39.2924092 L26.1769231,39.3692308 L26.1781006,39.4128012 C25.9258239,42.2088504 23.699235,44.4354393 20.8884615,44.6846154 C20.6373624,47.4973119 18.4107735,49.7239008 15.6147242,49.9761776 L15.6147242,49.9761776 L15.0841346,50 L5.82932692,50 C2.60986484,50 0,47.3901352 0,44.1706731 L0,44.1706731 L0,37.7204853 C0,36.174592 0.614095044,34.6919746 1.70733419,33.5984925 L1.70733419,33.5984925 L13.5346154,21.7692308 L13.3707224,20.7401234 C13.3210721,20.3524913 13.28368,19.9624855 13.2587004,19.5705531 L13.2587004,19.5705531 L13.2211538,18.3894231 C13.2211538,8.23322573 21.454315,0 31.6104943,0 Z M31.6104943,3.84615385 C23.5784781,3.84615385 17.0673077,10.3574069 17.0673077,18.3894231 C17.0673077,19.9818284 17.3241286,21.5140775 17.7970328,22.9480769 L17.7970328,22.9480769 L4.42697566,36.318134 C4.05513071,36.6900616 3.84615385,37.1945312 3.84615385,37.7204853 L3.84615385,37.7204853 L3.84615385,44.1706731 C3.84615385,45.265963 4.73403696,46.1538462 5.82932692,46.1538462 L5.82932692,46.1538462 L15.0841346,46.1538462 C16.1794246,46.1538462 17.0673077,45.265963 17.0673077,44.1706731 L17.0673077,44.1706731 L17.0673077,40.8653846 L20.3725962,40.8653846 C21.4678861,40.8653846 22.3557692,39.9775015 22.3557692,38.8822115 L22.3557692,38.8822115 L22.3557692,35.5769231 L25.431588,35.5769231 C25.9980611,35.5769435 26.537502,35.3347093 26.9138447,34.9113206 L26.9138447,34.9113206 L28.8980093,32.6790941 C29.7769681,32.8449369 30.6834435,32.9326923 31.6105769,32.9326923 C39.6425931,32.9326923 46.1538462,26.4215219 46.1538462,18.3895057 C46.1538462,10.3336914 39.666226,3.84615385 31.6104943,3.84615385 Z M36,10 C38.2091667,10 40,11.7908333 40,14 C40,16.2091667 38.2091667,18 36,18 C33.7908333,18 32,16.2091667 32,14 C32,11.7908333 33.7908333,10 36,10 Z"
          id="Combined-Shape"
        ></path>
      </g>
    </SvgIcon>,
    <SvgIcon viewBox="-20 -15 80 80">
      <g id="icons/account/account-details" fill="#585858">
        <path
          d="M14.6298938,23.3098038 C15.1024668,23.2941098 15.4914016,23.4402942 15.8468367,23.7545692 C18.0528993,25.7044706 20.5739941,26.8445216 23.4115612,27.128715 C23.7374659,27.1613627 24.0598617,27.1851717 24.3756403,27.2000874 L24.843957,27.2157841 L25.5602374,27.2144741 C28.8903811,27.1358983 31.8101317,26.0308148 34.3096192,23.8536319 C34.6272695,23.5768863 34.9424969,23.4070201 35.3319464,23.338641 L35.5036209,23.3155334 L35.8082035,23.3127589 C39.0828879,23.5229996 41.5949457,25.0590989 43.3351835,27.8291732 C44.5852135,29.8189187 45.3053314,32.0480157 45.8146347,35.0301269 C46.2325486,37.4757334 46.3811669,39.83015 46.237819,42.1104855 C46.0504108,45.0926677 44.6757792,47.4745252 42.1418147,49.1135664 C41.3994833,49.5936744 40.550603,49.8592725 39.5704828,49.9489445 L39.2724848,49.9706069 L38.7884166,49.9830549 L25.0892901,49.9812274 L16.2705675,49.9646391 L11.8631844,49.9989155 C8.97184546,50.042844 6.85905398,48.751717 5.31261722,46.2210067 C4.42326735,44.7659056 4.00211985,43.1273299 4.0000253,41.2980536 C3.99659392,37.725523 4.34198042,34.7241169 5.17750851,31.9031859 C5.84235083,29.658023 6.59140181,28.0517337 7.75482114,26.6784543 C9.35329376,24.7915432 11.3410707,23.6747026 13.7195406,23.3806546 L14.0462992,23.345662 L14.6298938,23.3098038 Z M14.0804173,26.9274419 L14.016182,26.9361506 C12.6153612,27.1401084 11.474728,27.8005958 10.473912,28.9820054 C9.7010408,29.8942888 9.14237774,31.0649258 8.59446512,32.9152187 C7.88217003,35.3200874 7.56050843,37.9704809 7.56365881,41.2941634 C7.56509728,42.4983496 7.82283203,43.4945789 8.35347361,44.362783 C9.23578121,45.8066603 10.1651593,46.4042806 11.6031061,46.4350432 L11.8120365,46.4356119 L15.3904127,46.4027673 L23.798634,46.4163927 L38.7913807,46.4193779 C39.4529391,46.4200019 39.9025957,46.3177349 40.206348,46.1212811 C41.77838,45.1044455 42.5636464,43.7568896 42.6811606,41.8869144 C42.8053692,39.9110408 42.6783105,37.8332729 42.3018268,35.630113 C41.8536106,33.0056838 41.2575823,31.2211807 40.3175777,29.7249206 C39.3102091,28.1214122 38.0404899,27.2370338 36.3324722,26.9540837 L36.179437,26.9313635 L36.0462328,27.0449123 C32.7158359,29.7052799 28.756137,30.9506801 24.3055543,30.7637583 L23.8588649,30.7402911 L23.0564112,30.6746523 C19.8841841,30.3569414 16.9848146,29.1857084 14.4239196,27.2010926 L14.0804173,26.9274419 Z M25.1836021,0 C32.1067952,0.0424222218 38.1597956,5.75119961 38.4516253,12.5601716 L38.4606684,12.8568933 L38.4574382,13.3865727 C38.6509429,20.1714369 32.8732625,26.2451134 25.9573341,26.705306 L25.6559391,26.7217622 L25.1120477,26.7328122 C17.9438885,26.7212242 11.7677965,20.5093532 11.7669136,13.354034 C11.7659289,6.49567827 17.4834939,0.463698459 24.324825,0.0249484167 L24.627363,0.00923578294 L25.1836021,0 Z M25.1617503,3.56344008 L24.9023966,3.56572132 C19.8107972,3.68604381 15.3298572,8.23690363 15.3305919,13.3535844 C15.3312332,18.5512105 19.9234359,23.160742 25.1178173,23.1691627 C30.1287897,23.1772559 34.6011174,18.9708524 34.884126,14.0793332 L34.8951332,13.8212713 L34.8959379,12.8490012 C34.7659856,7.90765021 30.2617982,3.59485335 25.1617503,3.56344008 Z"
          id="user-icon"
        ></path>
      </g>
    </SvgIcon>,
    <SvgIcon viewBox="-20 -15 80 80">
      <g id="icons/account/billing" fill="#585858">
        <path
          d="M44.6428571,5 C47.6015254,5 50,7.39847455 50,10.3571429 L50,10.3571429 L50,38.9285714 C50,41.8872397 47.6015254,44.2857143 44.6428571,44.2857143 L44.6428571,44.2857143 L5.35714286,44.2857143 C2.39847455,44.2857143 0,41.8872397 0,38.9285714 L0,38.9285714 L0,10.3571429 C0,7.39847455 2.39847455,5 5.35714286,5 L5.35714286,5 Z M46.428,24.642 L3.571,24.642 L3.57142857,38.9285714 C3.57142857,39.8654831 4.29296967,40.6338697 5.21068652,40.7083661 L5.35714286,40.7142857 L44.6428571,40.7142857 C45.6290799,40.7142857 46.4285714,39.9147942 46.4285714,38.9285714 L46.4285714,38.9285714 L46.428,24.642 Z M16.0714286,35.3571429 L16.0714286,38.9285714 L5.35714286,38.9285714 L5.35714286,35.3571429 L16.0714286,35.3571429 Z M33.9285714,35.3571429 L33.9285714,38.9285714 L19.6428571,38.9285714 L19.6428571,35.3571429 L33.9285714,35.3571429 Z M44.6428571,8.57142857 L5.35714286,8.57142857 C4.37092009,8.57142857 3.57142857,9.37092009 3.57142857,10.3571429 L3.57142857,10.3571429 L3.571,13.928 L46.428,13.928 L46.4285714,10.3571429 C46.4285714,9.42023123 45.7070303,8.65184455 44.7893135,8.57734816 L44.6428571,8.57142857 Z"
          id="Combined-Shape"
        ></path>
      </g>
    </SvgIcon>,
    <SvgIcon viewBox="-20 -15 80 80">
      <g id="icons/account/change-password" fill="#585858">
        <path
          d="M25.4102564,0 C32.372889,0 37.8461538,7.04112722 37.8461538,15.5208333 L37.8461538,15.5208333 L37.8433333,20.4166667 L40.9230769,20.4166667 C44.0285753,20.4166667 46.5560627,22.8697499 46.8010476,25.9646031 L46.8010476,25.9646031 L46.8205128,26.4583333 L46.8205128,43.9583333 C46.8205128,47.2819022 44.1920226,50 40.9230769,50 L40.9230769,50 L9.8974359,50 C6.6284902,50 4,47.2819022 4,43.9583333 L4,43.9583333 L4,26.4583333 C4,23.1347645 6.6284902,20.4166667 9.8974359,20.4166667 L9.8974359,20.4166667 L12.9733333,20.4166667 L12.974359,15.5208333 C12.974359,7.29808802 18.1209368,0.428055992 24.7815036,0.0192411455 L24.7815036,0.0192411455 Z M37.1025045,23.75 L15,23.75 L15,23.749 L9.8974359,23.75 C8.54885065,23.75 7.42304161,24.860552 7.33843587,26.2858391 L7.33333333,26.4583333 L7.33333333,43.9583333 C7.33333333,45.4654936 8.49490724,46.6666667 9.8974359,46.6666667 L9.8974359,46.6666667 L40.9230769,46.6666667 C42.3256056,46.6666667 43.4871795,45.4654936 43.4871795,43.9583333 L43.4871795,43.9583333 L43.4871795,26.4583333 C43.4871795,24.951173 42.3256056,23.75 40.9230769,23.75 L40.9230769,23.75 L37.102,23.749 L37.1025045,23.75 Z M25.4102564,3.33333333 C20.498395,3.33333333 16.3076923,8.72449778 16.3076923,15.5208333 L16.3076923,15.5208333 L16.307,20.5 L34.512,20.5 L34.5128205,15.5208333 C34.5128205,8.83411609 30.4562116,3.50760741 25.6473497,3.33752407 Z"
          id="Combined-Shape"
        ></path>
      </g>
    </SvgIcon>,
    <SvgIcon viewBox="-20 -15 80 80">
      <g id="icons/account/leave-review" fill="#585858">
        <path
          d="M16.5763101,15.3853128 L1.60707642,17.6741544 L1.27237545,17.7555167 C-3.55271368e-15,18.1875512 -0.452565169,19.8466762 0.539411332,20.8633751 L11.421264,32.0184241 L8.85291222,47.8009904 L8.82686994,48.1281939 C8.83365562,49.5151781 10.3509536,50.4689669 11.6335096,49.7599874 L24.9957987,42.3663284 L38.3664903,49.7599874 L38.6658374,49.8946411 C39.9741806,50.3550857 41.3830154,49.2473444 41.1470876,47.8009904 L38.5745346,32.0184241 L49.4605887,20.8633751 L49.6788425,20.5968984 C50.4343454,19.4861112 49.7970846,17.8886911 48.3929236,17.6741544 L33.4194885,15.3853128 L26.7114531,1.08729137 C26.0309907,-0.362430449 23.9690093,-0.36243046 23.2885469,1.08729135 L16.5763101,15.3853128 Z M25,6.33982443 L30.4291194,17.9068717 L30.6204517,18.2277165 C30.9144562,18.6252899 31.356428,18.896296 31.8550276,18.9724752 L44.1833256,20.8554596 L35.2004793,30.0643999 L34.9769629,30.3414397 C34.7167851,30.7346472 34.6104625,31.2152835 34.687747,31.6890754 L36.7889645,44.5678314 L25.914655,38.5563115 L25.5604822,38.4052861 C25.073965,38.2542606 24.540691,38.3046024 24.085345,38.5563115 L13.2068342,44.5678314 L15.312253,31.6890754 L15.3362549,31.3339212 C15.3235953,30.8625992 15.1347667,30.4080011 14.7995207,30.0643999 L5.81247304,20.8554596 L18.1449722,18.9724752 C18.7682217,18.8772511 19.3029902,18.4776103 19.5708803,17.9068717 L25,6.33982443 Z"
          id="Star-1"
        ></path>
      </g>
    </SvgIcon>,
    <SvgIcon viewBox="-20 -15 80 80">
      <g id="icons/account/leave-review" fill="#585858">
        <path
          d="M16.5763101,15.3853128 L1.60707642,17.6741544 L1.27237545,17.7555167 C-3.55271368e-15,18.1875512 -0.452565169,19.8466762 0.539411332,20.8633751 L11.421264,32.0184241 L8.85291222,47.8009904 L8.82686994,48.1281939 C8.83365562,49.5151781 10.3509536,50.4689669 11.6335096,49.7599874 L24.9957987,42.3663284 L38.3664903,49.7599874 L38.6658374,49.8946411 C39.9741806,50.3550857 41.3830154,49.2473444 41.1470876,47.8009904 L38.5745346,32.0184241 L49.4605887,20.8633751 L49.6788425,20.5968984 C50.4343454,19.4861112 49.7970846,17.8886911 48.3929236,17.6741544 L33.4194885,15.3853128 L26.7114531,1.08729137 C26.0309907,-0.362430449 23.9690093,-0.36243046 23.2885469,1.08729135 L16.5763101,15.3853128 Z M25,6.33982443 L30.4291194,17.9068717 L30.6204517,18.2277165 C30.9144562,18.6252899 31.356428,18.896296 31.8550276,18.9724752 L44.1833256,20.8554596 L35.2004793,30.0643999 L34.9769629,30.3414397 C34.7167851,30.7346472 34.6104625,31.2152835 34.687747,31.6890754 L36.7889645,44.5678314 L25.914655,38.5563115 L25.5604822,38.4052861 C25.073965,38.2542606 24.540691,38.3046024 24.085345,38.5563115 L13.2068342,44.5678314 L15.312253,31.6890754 L15.3362549,31.3339212 C15.3235953,30.8625992 15.1347667,30.4080011 14.7995207,30.0643999 L5.81247304,20.8554596 L18.1449722,18.9724752 C18.7682217,18.8772511 19.3029902,18.4776103 19.5708803,17.9068717 L25,6.33982443 Z"
          id="Star-1"
        ></path>
      </g>
    </SvgIcon>,
  ];

  const stepTexts = [
    "My Units",
    "Account Details",
    "Billing",
    "Change Password",
    "Write a Review",
  ];

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  ////////
  // rating
  const [value, setValue] = React.useState(0);

  // card table status:
  // 0 = default (nnormal view)
  // 1 = add card
  // 2 = edit card
  const [cardTableStatus, setCardTableStatus] = React.useState(0);

  // review location
  const [selectedReviewLocation, setReviewLocation] = React.useState("");
  const [stepIcon, setStepIcon] = React.useState(stepIcons[0]);
  const [step, setStep] = React.useState({
    icon: stepIcons[0],
    text: stepTexts[0],
  });

  React.useEffect(() => {
    setStep({ icon: stepIcons[selectedIndex], text: stepTexts[selectedIndex] });
    setStepIcon(stepIcons[selectedIndex]);
  }, [selectedIndex]);

  const steps = [
    { icon: stepIcons[0], text: stepTexts[0] },
    { icon: stepIcons[1], text: stepTexts[1] },
    { icon: stepIcons[2], text: stepTexts[2] },
    { icon: stepIcons[3], text: stepTexts[3] },
    { icon: stepIcons[4], text: stepTexts[4] },
  ];

  return (
    <>
      <TopBar
        selectedIndex={selectedIndex}
        step={step}
        steps={steps}
        stepIcon={stepIcon}
        stepIcons={stepIcons}
        stepTexts={stepTexts}
        handleListItemClick={handleListItemClick}
        setCurrentUser={setCurrentUser}
      />
      <Container className={classes.root}>
        <Grid
          item
          xs={12}
          container
          spacing={2}
          direction="row"
          justify="space-evenly"
          alignItems="flex-start"
        >
          <Hidden smDown>
            <Grid item xs={12} sm={3} container direction="column" spacing={2}>
              <Grid item>
                <Paper>
                  <List
                    component="nav"
                    aria-label="tabs list"
                    className={classes.list}
                  >
                    <ListItem
                      dense
                      classes={{
                        root: classes.listItem,
                        selected: classes.listItemSelected,
                      }}
                      button
                      selected={selectedIndex === 0}
                      onClick={(event) => handleListItemClick(event, 0)}
                    >
                      <ListItemIcon>{stepIcons[0]}</ListItemIcon>
                      <ListItemText
                        className={classes.listItemText}
                        primary="My Units"
                      />
                    </ListItem>
                    <Divider />
                    <ListItem
                      dense
                      classes={{
                        root: classes.listItem,
                        selected: classes.listItemSelected,
                      }}
                      button
                      selected={selectedIndex === 1}
                      onClick={(event) => handleListItemClick(event, 1)}
                    >
                      <ListItemIcon>{stepIcons[1]}</ListItemIcon>
                      <ListItemText
                        className={classes.listItemText}
                        primary="Account Details"
                      />
                    </ListItem>
                    <Divider />
                    <ListItem
                      dense
                      classes={{
                        root: classes.listItem,
                        selected: classes.listItemSelected,
                      }}
                      button
                      selected={selectedIndex === 2}
                      onClick={(event) => handleListItemClick(event, 2)}
                    >
                      <ListItemIcon>{stepIcons[2]}</ListItemIcon>
                      <ListItemText
                        className={classes.listItemText}
                        primary="Billing"
                      />
                    </ListItem>
                    <Divider />
                    <ListItem
                      dense
                      classes={{
                        root: classes.listItem,
                        selected: classes.listItemSelected,
                      }}
                      button
                      selected={selectedIndex === 3}
                      onClick={(event) => handleListItemClick(event, 3)}
                    >
                      <ListItemIcon>{stepIcons[3]}</ListItemIcon>
                      <ListItemText
                        className={classes.listItemText}
                        primary="Change Password"
                      />
                    </ListItem>
                    <Divider />
                    <ListItem
                      dense
                      classes={{
                        root: classes.listItem,
                        selected: classes.listItemSelected,
                      }}
                      button
                      selected={selectedIndex === 4 || selectedIndex === 5}
                      onClick={(event) => handleListItemClick(event, 4)}
                    >
                      <ListItemIcon>{stepIcons[4]}</ListItemIcon>
                      <ListItemText
                        className={classes.listItemText}
                        primary="Write a Review"
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>

              {selectedIndex === 0 && (

                <Grid item>
                  <Paper className={classes.autoPayPaper}>
                    <Grid
                      container
                      direction="column"
                      justify="space-between"
                      alignItems="stretch"
                      spacing={2}
                    >
                      <Grid item>
                        <Grid
                          container
                          direction="row"
                          justify="center"
                          alignItems="center"
                        >
                          <SvgIcon viewBox="0 0 50 50">
                            <g id="icons/general/auto-pay" fill="#1B3C92">
                              <path
                                d="M43.0322266,1.22753902 L43.4228516,9.31054653 C38.8305289,3.89309362 32.0853812,0.773078908 24.9833984,0.781249971 C13.1572266,0.781249971 3.31152344,9.26953091 1.20019531,20.4902336 C1.13696397,20.8325043 1.22915222,21.1851717 1.45179072,21.4527153 C1.67442923,21.7202588 2.00447663,21.8749899 2.35253906,21.8749992 L7.14257813,21.8749992 C7.68623165,21.8744103 8.15809259,21.5 8.28222656,20.9707024 C9.87842949,14.3462279 15.2391643,9.29139222 21.945899,8.08671883 C28.6526338,6.88204544 35.437421,9.75528488 39.2392578,15.4101557 L29.3310547,14.9355463 C29.0107267,14.9203133 28.6981508,15.0370203 28.4661905,15.2584622 C28.2342302,15.479904 28.1031536,15.7867315 28.1035156,16.1074213 L28.1035156,20.7373039 C28.1035156,21.3845126 28.6281819,21.9091789 29.2753906,21.9091789 L48.828125,21.9091789 C49.4753337,21.9091789 50,21.3845126 50,20.7373039 L50,1.17187496 C50,0.52466629 49.4753337,0 48.828125,0 L44.2021484,0 C43.8817978,0 43.575483,0.131482788 43.3544686,0.363381884 C43.1334542,0.59528098 43.0170099,0.907549934 43.0322266,1.22753902 Z M24.9833984,42.1874985 C19.2608403,42.1924014 13.9128944,39.3426057 10.7255859,34.5898425 L20.6669922,35.0654284 C20.9873202,35.0806614 21.299896,34.9639544 21.5318564,34.7425126 C21.7638167,34.5210707 21.8948932,34.2142432 21.8945312,33.8935534 L21.8945312,29.2646474 C21.8945312,28.6174387 21.3698649,28.0927724 20.7226562,28.0927724 L1.171875,28.0927724 C0.524666309,28.0927724 0,28.6174387 0,29.2646474 L0,48.8281232 C0,49.4753319 0.524666309,49.9999991 1.171875,49.9999991 L5.79589844,49.9999991 C6.11712257,50.0004 6.42442933,49.8689245 6.64596338,49.6363138 C6.86749744,49.403703 6.98383491,49.090352 6.96777344,48.7695295 L6.5625,40.7060532 C11.1538534,46.1122599 17.8906166,49.2254637 24.9833984,49.2187482 C36.8105469,49.2187482 46.65625,40.7304673 48.7675781,29.5097645 C48.8308095,29.1674938 48.7386212,28.8148264 48.5159827,28.5472829 C48.2933442,28.2797393 47.9632968,28.1250083 47.6152344,28.124999 L42.8251953,28.124999 C42.2815418,28.1255878 41.8096809,28.5000036 41.6855469,29.0292958 C39.829082,36.7488426 32.9230373,42.1895281 24.9833984,42.1874985 Z"
                                id="Shape"
                              ></path>
                            </g>
                          </SvgIcon>

                          <Typography
                            variant="h6"
                            className={classes.autoPayTitle}
                          >
                            Setup Auto-Pay
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Typography className={classes.tableSubtitle}>
                          Enable auto-pay and don’t risk missing a payment and
                          getting a late fee.
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Button
                          variant={"contained"}
                          color="primary"
                          className={classes.autoPayButton}
                        >
                          Setup Auto-Pay
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              )}
            </Grid>
          </Hidden>

          <Grid item xs={12} sm={9} container direction="column" spacing={2}>

            {selectedIndex === 0 && (
              <>
                <NoUnitsContainer>
                  <section className="noUnitsTitle">NO UNITS RENTED</section>
                  <section className="noUnitsBody">We have a wide variety of storage units to meet your needs nationwide.</section>
                  <SemBtn
                    onClick={() => setSearching(true)}
                    className="findStorageBtn"
                    size='big'
                    color='red'
                  >
                    Find Storage
                  </SemBtn>
                </NoUnitsContainer>
                
                {userLocations.map((location) => (
                  <LocationCard
                    {...location}
                    key={location.code}
                    locationObj={location}
                  />
                ))}
                
                <Grid item style={{ textAlign: "center", paddingTop: "2em" }}>
                  <span
                    style={{
                      color: "#4a4a4a",
                      fontFamily: "Montserrat",
                      fontSize: "12px",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Are you missing units?{" "}
                  </span>
                  <Link
                    style={{
                      color: "#1B3C92",
                      fontFamily: "Montserrat",
                      fontSize: "12px",
                      fontWeight: "bold",
                      textAlign: "center",
                      textDecoration: "underline",
                    }}
                    to="/missing"
                  >
                    Lookup Units
                  </Link>
                </Grid>
                <Grid item>
                  <Paper className={classes.paper}>
                    <Hidden mdUp>
                      <Typography
                        variant="h4"
                        style={{
                          color: "#4A4A4A",
                          fontFamily: "Montserrat",
                          fontSize: "16px",
                          marginBottom: ".6em",
                        }}
                        children={"Units History"}
                      />
                      <Divider />
                      <Grid
                        container
                        direction="column"
                        style={{ paddingTop: ".6em", paddingBottom: ".6em" }}
                      >
                        <Grid item>
                          <span
                            style={{
                              color: "#4A4A4A",
                              fontFamily: "Montserrat",
                              fontSize: "10px",
                              fontWeight: "bold",
                              paddingRight: ".5em",
                            }}
                          >
                            Location:
                          </span>
                          <span
                            style={{
                              color: "#4A4A4A",
                              fontFamily: "Montserrat",
                              fontSize: "10px",
                            }}
                          >
                            Belleville
                          </span>
                        </Grid>
                        <Grid item>
                          <span
                            style={{
                              color: "#4A4A4A",
                              fontFamily: "Montserrat",
                              fontSize: "10px",
                              fontWeight: "bold",
                              paddingRight: ".5em",
                            }}
                          >
                            Unit Details:
                          </span>
                          <span
                            style={{
                              color: "#4A4A4A",
                              fontFamily: "Montserrat",
                              fontSize: "10px",
                            }}
                          >
                            Unit #7262 | 3' x 3' | Small
                          </span>
                        </Grid>
                        <Grid item>
                          <span
                            style={{
                              color: "#4A4A4A",
                              fontFamily: "Montserrat",
                              fontSize: "10px",
                              fontWeight: "bold",
                              paddingRight: ".5em",
                            }}
                          >
                            Move In Date:
                          </span>
                          <span
                            style={{
                              color: "#4A4A4A",
                              fontFamily: "Montserrat",
                              fontSize: "10px",
                            }}
                          >
                            03/20/2018
                          </span>
                        </Grid>
                        <Grid item>
                          <span
                            style={{
                              color: "#4A4A4A",
                              fontFamily: "Montserrat",
                              fontSize: "10px",
                              fontWeight: "bold",
                              paddingRight: ".5em",
                            }}
                          >
                            Move Out Date:
                          </span>
                          <span
                            style={{
                              color: "#4A4A4A",
                              fontFamily: "Montserrat",
                              fontSize: "10px",
                            }}
                          >
                            11/20/2018
                          </span>
                        </Grid>
                      </Grid>
                      <Divider />
                      <Grid
                        container
                        direction="column"
                        style={{ paddingTop: ".6em", paddingBottom: ".6em" }}
                      >
                        <Grid item>
                          <span
                            style={{
                              color: "#4A4A4A",
                              fontFamily: "Montserrat",
                              fontSize: "10px",
                              fontWeight: "bold",
                              paddingRight: ".5em",
                            }}
                          >
                            Location:
                          </span>
                          <span
                            style={{
                              color: "#4A4A4A",
                              fontFamily: "Montserrat",
                              fontSize: "10px",
                            }}
                          >
                            Jacksonville
                          </span>
                        </Grid>
                        <Grid item>
                          <span
                            style={{
                              color: "#4A4A4A",
                              fontFamily: "Montserrat",
                              fontSize: "10px",
                              fontWeight: "bold",
                              paddingRight: ".5em",
                            }}
                          >
                            Unit Details:
                          </span>
                          <span
                            style={{
                              color: "#4A4A4A",
                              fontFamily: "Montserrat",
                              fontSize: "10px",
                            }}
                          >
                            Unit #2918 | 5' x 5' | Small
                          </span>
                        </Grid>
                        <Grid item>
                          <span
                            style={{
                              color: "#4A4A4A",
                              fontFamily: "Montserrat",
                              fontSize: "10px",
                              fontWeight: "bold",
                              paddingRight: ".5em",
                            }}
                          >
                            Move In Date:
                          </span>
                          <span
                            style={{
                              color: "#4A4A4A",
                              fontFamily: "Montserrat",
                              fontSize: "10px",
                            }}
                          >
                            01/20/2017
                          </span>
                        </Grid>
                        <Grid item>
                          <span
                            style={{
                              color: "#4A4A4A",
                              fontFamily: "Montserrat",
                              fontSize: "10px",
                              fontWeight: "bold",
                              paddingRight: ".5em",
                            }}
                          >
                            Move Out Date:
                          </span>
                          <span
                            style={{
                              color: "#4A4A4A",
                              fontFamily: "Montserrat",
                              fontSize: "10px",
                            }}
                          >
                            09/20/2017
                          </span>
                        </Grid>
                      </Grid>
                    </Hidden>
                    <Hidden smDown>
                      <Grid
                        container
                        direction="column"
                        justify="flex-start"
                        alignItems="flex-start"
                        spacing={2}
                      >
                        <Grid item style={{ width: "100%" }}>
                          <Typography
                            variant="h4"
                            style={{
                              color: "#4A4A4A",
                              fontFamily: "Montserrat",
                              fontSize: "20px",
                            }}
                            children={"Units History"}
                          />
                          <HistoryTable />
                        </Grid>
                      </Grid>
                    </Hidden>
                  </Paper>
                </Grid>
              </>
            )}

            {selectedIndex === 1 && (
              <>
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
                        children={"Account Details"}
                      />
                      <Typography
                        variant="body1"
                        style={{
                          color: "#4A4A4A",
                          fontFamily: "Montserrat",
                          fontSize: "12px",
                        }}
                        children={"Customer since 04/22/2019"}
                      />
                    </Grid>
                    <Grid item container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <FormLabel>First Name</FormLabel>
                        <TextField
                          id="standard-size-small"
                          defaultValue=""
                          size="small"
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormLabel>Last Name</FormLabel>
                        <TextField
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
                        <FormLabel>Street Address</FormLabel>
                        <TextField
                          id="standard-size-small"
                          defaultValue=""
                          size="small"
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormLabel>Street Address 2</FormLabel>
                        <TextField
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
                        <FormLabel>City</FormLabel>
                        <TextField
                          id="standard-size-small"
                          defaultValue=""
                          size="small"
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <FormLabel>State</FormLabel>
                        <TextField
                          id="standard-size-small"
                          defaultValue=""
                          size="small"
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <FormLabel>Zip Code</FormLabel>
                        <TextField
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
                        <FormLabel>Email</FormLabel>
                        <TextField
                          id="standard-size-small"
                          defaultValue=""
                          size="small"
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormLabel>Phone</FormLabel>
                        <TextField
                          id="standard-size-small"
                          defaultValue=""
                          size="small"
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                    </Grid>

                    <Grid item container spacing={2} justify="flex-end">
                      <Grid item xs={12} md={4}>
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.button22}
                        >
                          Update Account
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </>
            )}
            {selectedIndex === 2 && (
              <>
                {cardTableStatus === 0 && (
                  <>
                    <Grid item>
                      <Paper className={classes.paper}>
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
                          >
                            <Grid item>
                              <Typography
                                variant="h4"
                                className={classes.tableTitle}
                                children={"Payment Methods"}
                              />
                            </Grid>
                            <Grid item>
                              <SemBtn
                                onClick={() => setCardTableStatus(1)}
                                icon 
                                labelPosition='left'
                              >
                                <Icon name='add' style={{ color: "#1B3C92" }} />
                                Add Card
                              </SemBtn>
                            </Grid>
                          </Grid>

                          { accountPaymentMethods?.length > 0 &&
                            <Grid item style={{ width: "100%" }}>
                              <PaymentMethods
                                setSelectedPaymentMethod={setSelectedPaymentMethod}
                                setCardTableStatus={setCardTableStatus}
                                accountPaymentMethods={accountPaymentMethods}
                                removeDeletedPaymentMethod={removeDeletedPaymentMethod}
                              />
                            </Grid>
                          }

                        </Grid>
                      </Paper>
                    </Grid>
                    <Grid item>
                      <Paper className={classes.paper}>
                        <Grid
                          container
                          direction="column"
                          justify="flex-start"
                          alignItems="flex-start"
                          spacing={2}
                        >
                          <Grid item>
                            <Grid
                              item
                              container
                              direction="row"
                              justify="flex-start"
                              alignItems="center"
                            >
                              <SvgIcon
                                className={classes.apIcon}
                                viewBox="0 0 50 50"
                              >
                                <g id="icons/general/auto-pay" fill="#1B3C92">
                                  <path
                                    d="M43.0322266,1.22753902 L43.4228516,9.31054653 C38.8305289,3.89309362 32.0853812,0.773078908 24.9833984,0.781249971 C13.1572266,0.781249971 3.31152344,9.26953091 1.20019531,20.4902336 C1.13696397,20.8325043 1.22915222,21.1851717 1.45179072,21.4527153 C1.67442923,21.7202588 2.00447663,21.8749899 2.35253906,21.8749992 L7.14257813,21.8749992 C7.68623165,21.8744103 8.15809259,21.5 8.28222656,20.9707024 C9.87842949,14.3462279 15.2391643,9.29139222 21.945899,8.08671883 C28.6526338,6.88204544 35.437421,9.75528488 39.2392578,15.4101557 L29.3310547,14.9355463 C29.0107267,14.9203133 28.6981508,15.0370203 28.4661905,15.2584622 C28.2342302,15.479904 28.1031536,15.7867315 28.1035156,16.1074213 L28.1035156,20.7373039 C28.1035156,21.3845126 28.6281819,21.9091789 29.2753906,21.9091789 L48.828125,21.9091789 C49.4753337,21.9091789 50,21.3845126 50,20.7373039 L50,1.17187496 C50,0.52466629 49.4753337,0 48.828125,0 L44.2021484,0 C43.8817978,0 43.575483,0.131482788 43.3544686,0.363381884 C43.1334542,0.59528098 43.0170099,0.907549934 43.0322266,1.22753902 Z M24.9833984,42.1874985 C19.2608403,42.1924014 13.9128944,39.3426057 10.7255859,34.5898425 L20.6669922,35.0654284 C20.9873202,35.0806614 21.299896,34.9639544 21.5318564,34.7425126 C21.7638167,34.5210707 21.8948932,34.2142432 21.8945312,33.8935534 L21.8945312,29.2646474 C21.8945312,28.6174387 21.3698649,28.0927724 20.7226562,28.0927724 L1.171875,28.0927724 C0.524666309,28.0927724 0,28.6174387 0,29.2646474 L0,48.8281232 C0,49.4753319 0.524666309,49.9999991 1.171875,49.9999991 L5.79589844,49.9999991 C6.11712257,50.0004 6.42442933,49.8689245 6.64596338,49.6363138 C6.86749744,49.403703 6.98383491,49.090352 6.96777344,48.7695295 L6.5625,40.7060532 C11.1538534,46.1122599 17.8906166,49.2254637 24.9833984,49.2187482 C36.8105469,49.2187482 46.65625,40.7304673 48.7675781,29.5097645 C48.8308095,29.1674938 48.7386212,28.8148264 48.5159827,28.5472829 C48.2933442,28.2797393 47.9632968,28.1250083 47.6152344,28.124999 L42.8251953,28.124999 C42.2815418,28.1255878 41.8096809,28.5000036 41.6855469,29.0292958 C39.829082,36.7488426 32.9230373,42.1895281 24.9833984,42.1874985 Z"
                                    id="Shape"
                                  ></path>
                                </g>
                              </SvgIcon>

                              <Typography
                                variant="h4"
                                className={classes.tableTitle}
                              >
                                Setup Auto-Pay
                              </Typography>
                            </Grid>
                            <Typography
                              variant="body1"
                              style={{
                                color: "#4A4A4A",
                                fontFamily: "Montserrat",
                                fontSize: "12px",
                              }}
                              children={
                                "Enable auto-pay and don’t risk missing a payment and getting a late fee."
                              }
                            />
                          </Grid>
                          <Hidden mdUp>
                            <Typography
                              variant="h4"
                              style={{
                                color: "#4A4A4A",
                                fontFamily: "Montserrat",
                                fontSize: "16px",
                                marginBottom: ".6em",
                              }}
                              children={"Your Units"}
                            />
                            <Divider flexItem style={{ height: "1px" }} />
                            <Grid container direction="row">
                              <Grid
                                item
                                xs={9}
                                container
                                direction="column"
                                style={{
                                  paddingTop: ".6em",
                                  paddingBottom: ".6em",
                                }}
                              >
                                <Grid item>
                                  <span
                                    style={{
                                      color: "#4A4A4A",
                                      fontFamily: "Montserrat",
                                      fontSize: "10px",
                                      fontWeight: "bold",
                                      paddingRight: ".5em",
                                    }}
                                  >
                                    Location:
                                  </span>
                                  <span
                                    style={{
                                      color: "#4A4A4A",
                                      fontFamily: "Montserrat",
                                      fontSize: "10px",
                                    }}
                                  >
                                    Belleville
                                  </span>
                                </Grid>
                                <Grid item>
                                  <span
                                    style={{
                                      color: "#4A4A4A",
                                      fontFamily: "Montserrat",
                                      fontSize: "10px",
                                      fontWeight: "bold",
                                      paddingRight: ".5em",
                                    }}
                                  >
                                    Unit Details:
                                  </span>
                                  <span
                                    style={{
                                      color: "#4A4A4A",
                                      fontFamily: "Montserrat",
                                      fontSize: "10px",
                                    }}
                                  >
                                    Unit #7262 | 3' x 3' | Small
                                  </span>
                                </Grid>

                                <Grid item>
                                  <span
                                    style={{
                                      color: "#4A4A4A",
                                      fontFamily: "Montserrat",
                                      fontSize: "10px",
                                      fontWeight: "bold",
                                      paddingRight: ".5em",
                                    }}
                                  >
                                    Next Payment:
                                  </span>
                                  <span
                                    style={{
                                      color: "#4A4A4A",
                                      fontFamily: "Montserrat",
                                      fontSize: "10px",
                                    }}
                                  >
                                    08/20/2020
                                  </span>
                                </Grid>
                              </Grid>
                              <Grid
                                item
                                xs={3}
                                className={classes.switchHolder}
                              >
                                <FormControlLabel
                                  style={{ float: "right", marginTop: "1em" }}
                                  control={<IOSSwitch />}
                                />
                              </Grid>
                            </Grid>

                            <Divider flexItem style={{ height: "1px" }} />
                            <Grid container direction="row">
                              <Grid
                                item
                                xs={9}
                                container
                                direction="column"
                                style={{
                                  paddingTop: ".6em",
                                  paddingBottom: ".6em",
                                }}
                              >
                                <Grid item>
                                  <span
                                    style={{
                                      color: "#4A4A4A",
                                      fontFamily: "Montserrat",
                                      fontSize: "10px",
                                      fontWeight: "bold",
                                      paddingRight: ".5em",
                                    }}
                                  >
                                    Location:
                                  </span>
                                  <span
                                    style={{
                                      color: "#4A4A4A",
                                      fontFamily: "Montserrat",
                                      fontSize: "10px",
                                    }}
                                  >
                                    Jacksonville
                                  </span>
                                </Grid>
                                <Grid item>
                                  <span
                                    style={{
                                      color: "#4A4A4A",
                                      fontFamily: "Montserrat",
                                      fontSize: "10px",
                                      fontWeight: "bold",
                                      paddingRight: ".5em",
                                    }}
                                  >
                                    Unit Details:
                                  </span>
                                  <span
                                    style={{
                                      color: "#4A4A4A",
                                      fontFamily: "Montserrat",
                                      fontSize: "10px",
                                    }}
                                  >
                                    Unit #2918 | 5' x 5' | Small
                                  </span>
                                </Grid>
                              </Grid>
                              <Grid
                                item
                                xs={3}
                                className={classes.switchHolder}
                              >
                                <FormControlLabel
                                  style={{ float: "right", marginTop: "1em" }}
                                  control={<IOSSwitch />}
                                />
                              </Grid>
                            </Grid>
                          </Hidden>
                          <Hidden smDown>
                            <Grid item style={{ width: "100%" }}>
                              <Typography
                                variant="h4"
                                style={{
                                  color: "#4A4A4A",
                                  fontFamily: "Montserrat",
                                  fontSize: "20px",
                                }}
                                children={"Your Units"}
                              />
                              <DataTable />
                            </Grid>
                          </Hidden>
                        </Grid>
                      </Paper>
                    </Grid>
                    <Grid item>
                      <Paper className={classes.paper}>
                        <Grid
                          container
                          direction="column"
                          justify="flex-start"
                          alignItems="flex-start"
                          spacing={2}
                        >
                          <Grid item style={{ width: "100%" }}>
                            <Typography
                              variant="h4"
                              className={classes.tableTitle}
                              children={"Billing History"}
                            />
                            <BillTable />
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  </>
                )}
                {cardTableStatus === 1 && 
                  <NewCard
                    currentUser={currentUser}
                    accountUnits={accountUnits}
                    setCardTableStatus={setCardTableStatus}
                  />
                }
                {cardTableStatus === 2 &&
                  <EditCard
                    selectedPaymentMethod={selectedPaymentMethod}
                    setCardTableStatus={setCardTableStatus}
                  />
                }
              </>
            )}
            {selectedIndex === 3 && (
              <>
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
                          fontSize: "18px",
                          fontWeight: '400'
                        }}
                        children={"Change Password"}
                      />
                      <Typography
                        variant="body1"
                        style={{
                          color: "#4A4A4A",
                          fontFamily: "Montserrat",
                          fontSize: "12px",
                        }}
                        children={
                          "New password must be 6 characters or more and must contain at least 1 character from 3 of the following:"
                        }
                      />
                    </Grid>
                    <Grid item xs={12} container style={{ display: 'flex', flexDirection: 'column' }}>
                      <Grid item sm={12}>
                        <Typography
                          variant="body1"
                          style={{
                            color: "#4A4A4A",
                            fontFamily: "Montserrat",
                            fontSize: "12px",
                          }}
                          children={" - Uppercase characters (A - Z)"}
                        />
                      </Grid>
                      <Grid item sm={12}>
                        <Typography
                          variant="body1"
                          style={{
                            color: "#4A4A4A",
                            fontFamily: "Montserrat",
                            fontSize: "12px",
                          }}
                          children={" - Numbers (0 - 9)"}
                        />
                      </Grid>
                      <Grid item sm={12}>
                        <Typography
                          variant="body1"
                          style={{
                            color: "#4A4A4A",
                            fontFamily: "Montserrat",
                            fontSize: "12px",
                          }}
                          children={" - Lowercase characters (a - z)"}
                        />
                      </Grid>
                      <Grid item sm={12}>
                        <Typography
                          variant="body1"
                          style={{
                            color: "#4A4A4A",
                            fontFamily: "Montserrat",
                            fontSize: "12px",
                          }}
                          children={" - Special characters (!, #, $, %, etc.)"}
                        />
                      </Grid>
                    </Grid>
                    <Grid item container spacing={2}>
                      <Grid item xs={12} md={7}>
                        <FormLabel>Current Password</FormLabel>
                        <TextField
                          type="password"
                          id="standard-size-small"
                          defaultValue=""
                          size="small"
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} md={7}>
                        <FormLabel>New Password</FormLabel>
                        <TextField
                          type="password"
                          id="standard-size-small"
                          defaultValue=""
                          size="small"
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} md={7}>
                        <FormLabel>Confirm New Password</FormLabel>
                        <TextField
                          type="password"
                          id="standard-size-small"
                          defaultValue=""
                          size="small"
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                    </Grid>

                    <Grid item container spacing={2} justify="flex-end">
                      <Grid item xs={12} md={4}>
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.button22}
                        >
                          Update Password
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </>
            )}
            {selectedIndex === 4 && (
              <>
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
                          fontSize: "18px",
                        }}
                        children={"Write a Review"}
                      />
                      <Typography
                        variant="body1"
                        style={{
                          color: "#4A4A4A",
                          fontFamily: "Montserrat",
                          fontSize: "12px",
                        }}
                        children={"Please let us know how we're doing!"}
                      />
                    </Grid>
                    <Grid item container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <FormControl
                          variant="outlined"
                          size="small"
                          className={classes.formControl}
                        >
                          <FormLabel>
                            Location
                          </FormLabel>
                          <Select
                            labelId="outlined-label"
                            id="demo-simple-select-outlined"
                            value={selectedReviewLocation}
                            onChange={(e) => {
                              setReviewLocation(e.target.value);
                              setValue(0);
                            }}
                          >
                            {userLocations.map((location) => (
                              <MenuItem value={location.name}>
                                {location.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid item container spacing={2}>
                      <Box
                        component="fieldset"
                        mb={3}
                        borderColor="transparent"
                        style={{ paddingLeft: 8, marginBottom: 0 }}
                      >
                        <FormLabel>
                          Rating
                        </FormLabel>
                        <Rating
                          size="large"
                          name="simple-controlled"
                          value={value}
                          onChange={(event, newValue) => {
                            setValue(newValue);
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} container spacing={2}>
                      <Grid item xs={12} md={12}>
                        <FormLabel>
                          Review
                        </FormLabel>
                        <TextField
                          id="outlined-multiline-static"
                          multiline
                          rows={4}
                          variant="outlined"
                          style={{
                            width: "100%",
                          }}
                        />
                      </Grid>
                    </Grid>

                    <Grid item container spacing={2} justify="flex-end">
                      <Grid item xs={12} md={4}>
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.button22}
                          onClick={() => setSelectedIndex(5)}
                        >
                          Submit Review
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </>
            )}
            {selectedIndex === 5 && (
              <>
                <Paper className={classes.paper}>
                  <Container maxWidth="sm">
                    <Grid
                      container
                      direction="column"
                      justify="flex-start"
                      alignItems="center"
                      spacing={2}
                      className={classes.padOnDesktop}
                    >
                      <Grid item>
                        <SvgIcon
                          viewBox="0 0 50 50"
                          style={{ fontSize: "4em" }}
                        >
                          <g
                            id="icons/general/success"
                            fill="#377D21"
                            fill-rule="nonzero"
                          >
                            <path
                              d="M25,0 C38.8,0 50,11.2 50,25 C50,38.8 38.8,50 25,50 C11.175,50 0,38.75 0,25 C0,11.2 11.2,0 25,0 Z M25,5 C13.95,5 5,13.95 5,25 C5,36.05 13.95,45 25,45 C36.05,45 45,36.05 45,25 C45,13.95 36.05,5 25,5 Z M34.7333187,12.8594632 L38.6000147,16.0294257 L21.5180824,36.8658362 L11.7342727,28.7247385 L14.9323939,24.8812998 L20.8444444,29.8 L34.7333187,12.8594632 Z"
                              id="sucess"
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
                          children={`Thank you for reviewing our ${selectedReviewLocation} location`}
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
                          children={
                            "We value your opinion and sincerely appreciate you taking the time to leave a review."
                          }
                        />
                      </Grid>
                      <Grid item>
                        <Button
                          onClick={() => setSelectedIndex(4)}
                          className={classes.button}
                        >
                          Submit Another Review
                        </Button>
                      </Grid>
                    </Grid>
                  </Container>
                </Paper>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
