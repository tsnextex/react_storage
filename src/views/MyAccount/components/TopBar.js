import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import SvgIcon from "@material-ui/core/SvgIcon";
import Icon from "@material-ui/core/Icon";
import Hidden from "@material-ui/core/Hidden";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: 'relative',
    zIndex: 400
  },
  appBar: {
    backgroundColor: "#FFF",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "#4A4A4A",
    fontFamily: "Montserrat",
    fontSize: 28,
    fontWeight: '400',
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
    },
  },
  button: {
    color: "#4A4A4A",
    fontFamily: "Montserrat",
    fontSize: 14,
    fontWeight: "bold",
  },
  buttonDD: {
    color: "#4A4A4A",
    fontFamily: "Montserrat",
    fontSize: 14,
    fontWeight: "300",
    textTransform: "capitalize",
  },
  list: { padding: 0, marginTop: "126px", height: "100vh" },
  listItemText: {
    fontFamily: "Montserrat",
    fontWeight: "bold",
    fontSize: "12px",
  },
  listItemSelected: {
    backgroundColor: "rgba(27,60,146,0.1) !important",
    borderLeft: "4px solid #1B3C92",
  },
}));

export default function TopBar(props) {

  const {
    selectedIndex,
    step,
    drawerList,
    steps,
    handleListItemClick,
    setCurrentUser
  } = props;
  
  const classes = useStyles();
  const [drawer, setDrawer] = React.useState(false);
  const toggleDrawer = () => {
    setDrawer((last) => !last);
  };

  let history = useHistory();

  const logoutUser = () => {

    // remove user
    setCurrentUser(false);
    localStorage.removeItem('currentUser');

    // navigate to home
    const newLocation = { pathname: '/' };
    history.push(newLocation);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Container maxWidth="lg">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              My Account
            </Typography>
            <Hidden smDown>
              <Button
                onClick={() => logoutUser()}
                color="inherit"
                className={classes.button}
                startIcon={
                  <SvgIcon viewBox="0 0 50 50">
                    <g
                      id="Icons"
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <g id="Group-2">
                        <path
                          d="M30,0.833333333 C31.2656526,0.833333333 32.3116365,1.77384627 32.4771779,2.99409814 L32.5,3.33333333 L32.5,13.8367201 C32.5,15.217432 31.3807119,16.3367201 30,16.3367201 C28.7343474,16.3367201 27.6883635,15.3962072 27.5228221,14.1759553 L27.5,13.8367201 L27.5,5.83333333 L5.83333333,5.83333333 L5.83333333,44.1666667 L27.5,44.1666667 L27.5,35.8493747 C27.5,34.5837221 28.4405129,33.5377381 29.6607648,33.3721967 L30,33.3493747 C31.2656526,33.3493747 32.3116365,34.2898876 32.4771779,35.5101395 L32.5,35.8493747 L32.5,46.6666667 C32.5,47.9323192 31.5594871,48.9783032 30.3392352,49.1438446 L30,49.1666667 L3.33333333,49.1666667 C2.06768078,49.1666667 1.0216968,48.2261537 0.856155387,47.0059019 L0.833333333,46.6666667 L0.833333333,3.33333333 C0.833333333,2.06768078 1.77384627,1.0216968 2.99409814,0.856155387 L3.33333333,0.833333333 L30,0.833333333 Z M41.7099605,14.8424634 L41.9604598,15.1153455 L48.6271264,23.5402493 C49.2721106,24.3553387 49.3382802,25.4710507 48.8285297,26.3474447 L48.6103827,26.6638199 L41.943716,34.9055827 C41.0753866,35.9790674 39.5012353,36.1453787 38.4277506,35.2770493 C37.4518554,34.487659 37.2256904,33.1149447 37.8450234,32.0653593 L38.056284,31.7610839 L41.5013333,27.4993333 L17.3910478,27.5 C16.0103359,27.5 14.8910478,26.3807119 14.8910478,25 C14.8910478,23.7343474 15.8315607,22.6883635 17.0518126,22.5228221 L17.3910478,22.5 L41.4273333,22.4993333 L38.0395402,18.2179879 C37.2606575,17.233686 37.3412364,15.8448008 38.1757967,14.9567062 L38.4486788,14.7062069 C39.4329807,13.9273241 40.8218659,14.007903 41.7099605,14.8424634 Z"
                          id="Combined-Shape"
                          fill="#CE3138"
                          fill-rule="nonzero"
                        ></path>
                        <g
                          id="Group"
                          transform="translate(16.666667, 16.666667)"
                        ></g>
                      </g>
                    </g>
                  </SvgIcon>
                }
              >
                Logout
              </Button>
            </Hidden>
            <Hidden mdUp>
              <Button
                variant="outlined"
                color="secondary"
                className={classes.buttonDD}
                startIcon={step.icon}
                onClick={toggleDrawer}
                endIcon={<Icon>expand_more</Icon>}
              >
                {step.text}
              </Button>
              <Drawer
                style={{ zIndex: 350 }}
                elevation={0}
                anchor={"top"}
                open={drawer}
                onClose={() => setDrawer(false)}
              >
                <List
                  component="nav"
                  aria-label="tabs list"
                  className={classes.list}
                >
                  {steps.map((s, i) => (
                    <ListItem
                      classes={{
                        root: classes.listItem,
                        selected: classes.listItemSelected,
                      }}
                      button
                      selected={selectedIndex === i}
                      onClick={(event) => {
                        handleListItemClick(event, i);
                        setDrawer(false);
                      }}
                    >
                      <ListItemIcon>{s.icon}</ListItemIcon>
                      <ListItemText
                        className={classes.listItemText}
                        primary={s.text}
                      />
                    </ListItem>
                  ))}
                </List>
              </Drawer>
            </Hidden>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
