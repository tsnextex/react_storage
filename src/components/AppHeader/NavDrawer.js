import React from "react";
import { Divider } from 'semantic-ui-react';
import { Close, ExpandMore, ExpandLess } from "@material-ui/icons";
import {
  Avatar,
  Button,
  Collapse,
  Grid,
  Paper,
  Drawer,
  List,
  ListItem,
  ListItemText,
  SvgIcon,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import PhoneNumber from "../Footer/PhoneNumber";
import EmailAddress from "../Footer/EmailAddress";
import Delaware from '../../img/icons/states/Delaware.svg';
import Florida from '../../img/icons/states/Florida.svg';
import Georgia from '../../img/icons/states/Georgia.svg';
import Kentucky from '../../img/icons/states/Kentucky.svg';
import Michigan from '../../img/icons/states/Michigan.svg';
import North_Carolina from '../../img/icons/states/North_Carolina.svg';
import New_Jersey from '../../img/icons/states/New_Jersey.svg';
import Ohio from '../../img/icons/states/Ohio.svg';
import Tennessee from '../../img/icons/states/Tennessee.svg';
import South_Carolina from '../../img/icons/states/South_Carolina.svg';

const stateimg = [
  { id: 'DE', img: Delaware },
  { id: 'FL', img: Florida },
  { id: 'GA', img: Georgia },
  { id: 'KY', img: Kentucky },
  { id: 'MI', img: Michigan },
  { id: 'NC', img: North_Carolina },
  { id: 'NJ', img: New_Jersey },
  { id: 'OH', img: Ohio },
  { id: 'TN', img: Tennessee },
  { id: 'SC', img: South_Carolina },
];

const drawerWidth = "100vw";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    paddingBottom: 30,
  },
  close: { boxShadow: "0 2px 4px 0 #DBDBDB" },
  foot: {
    boxShadow: "0 -2px 4px 0 #DBDBDB",
    position: "fixed",
    backgroundColor: "#FFF",
    bottom: 0,
    zIndex: 9,
    height: 75
  },
  stateItemLink: { 
    "& img": {
      objectFit: 'contain !important' 
    }
  },
  listItemLink: { textDecoration: "none" },
  listItem: { borderBottom: "1px solid #DBDBDB" },
  listItemText: {
    color: "#4A4A4A",
    fontFamily: "Montserrat",
  },
  listItemTextPrimary: {
    color: "#4A4A4A",
    fontFamily: "Montserrat",
    fontSize: "20px",
  },
  subList: { backgroundColor: "#F8F8FF", fontSize: ".9em" },
  chip: { margin: "8px 4px" },
  disclaimer: {
    padding: theme.spacing(2),
    fontSize: "10px",
    textAlign: "left",
    "& p": {
      lineHeight: "17px",
      marginBottom: "1em",
    },
  },
  footerLink: {
    color: "#4A4A4A",
    float: "right",
    paddingRight: "1em",
    textDecoration: "underline",
  },
  listHeader: { fontWeight: "700", color: "#4A4A4A", fontFamily: "Montserrat" },
  socialIcon: {
    margin: "12px 8px",
    width: "20px",
    height: "20px",
  },
  acctBtn: { textTransform: "capitalize", color: "#1B3C92", fontWeight: 'bold' },
  payBtn: {
    textTransform: "capitalize",
    backgroundColor: "#1B3C92",
    color: "white",
    fontWeight: "bold",
    height: "43px"
  },
}));

export default function NavDrawer(props) {

  const {
    items = [{ display_text: "Loading..." }],
    footerItems = [],
    open = false,
    toggle,
    activeSublist,
    onListHeaderTap,
    onListItemTap,
    searchByState,
    currentUser,
    setCurrentUser
  } = props

  const classes = useStyles();

  let history = useHistory();

  const navigateTo = pathname => {

    const newLocation = { pathname };
    history.push(newLocation);
  };

  // extract footer items
  const locations = footerItems.filter((x) => x.type === "location");
  const columnHeaders = footerItems.filter((x) => x.type === "column-header");
  const disclaimer = footerItems.filter((x) => x.type === "disclaimer");

  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={open}
      onClose={toggle}
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div
        className={classes.drawerPaper}
        role="presentation"
        onKeyDown={toggle}
      >
        <List className="list">
          <ListItem button onClick={toggle} className={classes.close}>
            <ListItemText />
            <Close />
          </ListItem>
          {items.map((x) => {
            if (`${x.type}`.includes("link")) {
              return (
                <Link
                  className={classes.listItemLink}
                  onClick={toggle}
                  key={x.display_text}
                  to={x.internal_relative_link}
                >
                  <ListItem className={classes.listItem} button>
                    <ListItemText
                      classes={{ primary: classes.listItemTextPrimary }}
                      className={classes.listItemText}
                      primary={x.display_text}
                    />
                  </ListItem>
                </Link>
              );
            } else if (x.type === "dropdown") {
              return (
                <div key={x.display_text}>
                  <ListItem
                    button
                    className={classes.listItem}
                    onClick={() => onListHeaderTap(x.display_text)}
                  >
                    <ListItemText
                      primary={x.display_text}
                      className={classes.listItemText}
                      classes={{ primary: classes.listItemTextPrimary }}
                    />
                    {activeSublist === x.display_text ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </ListItem>
                  <Collapse
                    in={activeSublist === x.display_text}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List
                      className={classes.subList}
                      component="div"
                      disablePadding
                    >
                      {x.options.map((xx) => (
                        <Link
                          className={classes.listItemLink}
                          onClick={() => onListItemTap(x.display_text)}
                          key={xx.display_text}
                          to={xx.path}
                        >
                          <ListItem className={classes.listItem} button>
                            <ListItemText
                              inset
                              classes={{ primary: classes.listItemTextPrimary }}
                              className={classes.listItemText}
                              primary={xx.display_text}
                            />
                          </ListItem>
                        </Link>
                      ))}
                    </List>
                  </Collapse>
                </div>
              );
            }
          })}
          {/* footer content starts here: */}
          <div>
            {/* storage locations */}
            <ListItem
              button
              className={classes.listItem}
              onClick={() => onListHeaderTap("Store Locations")}
            >
              <ListItemText
                primary={"Store Locations"}
                className={classes.listItemText}
                classes={{ primary: classes.listItemTextPrimary }}
              />
              {activeSublist === "Store Locations" ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )}
            </ListItem>
            <Collapse
              in={activeSublist === "Store Locations"}
              timeout="auto"
              unmountOnExit
            >
              <List
                className={classes.subList}
                component="div"
                style={{ textAlign: "center" }}
              >
                {locations.map((xx) => (
                  <Link
                    className={classes.listItemLink}
                    onClick={() => {
                      searchByState(xx.name);
                      toggle();
                    }}
                    key={xx.display_text}
                    to={xx.link}
                  >
                    <ListItem className={classes.listItem} button>
                      <Avatar
                        alt={xx.name} 
                        src={stateimg.filter(s => s.id === xx.display_text)[0].img} 
                        variant="square"
                        className={classes.stateItemLink}/>
                      <ListItemText
                        inset
                        classes={{ primary: classes.listItemTextPrimary }}
                        className={classes.listItemText}
                        primary={xx.name}
                      />
                    </ListItem>
                  </Link>
                ))}
              </List>
            </Collapse>
          </div>
          <div>
            <Grid item xs={12}>
              <Paper className={classes.disclaimer} elevation={0}>
                <Grid container direction="column">
                  {columnHeaders.map((x, i) => (
                    <Grid item xs={12} container direction="column">
                      <Grid item xs={12} container direction="row">
                        {x.phone.display_text && (
                          <>
                            <Grid item xs={12}>
                              <span className={classes.listHeader}>
                                Reach Out
                              </span>
                            </Grid>
                            <Grid item xs={6}>
                              <PhoneNumber color="#1B3C92" number={x.phone} />
                            </Grid>
                          </>
                        )}
                        {x.email.display_text && (
                          <Grid item xs={6}>
                            <EmailAddress color="#1B3C92" email={x.email} />
                          </Grid>
                        )}

                      { i === 2 && <Divider style={{ width: '100%' }} /> }
                      </Grid>
                      {x.social.length > 0 && (
                        <>
                          <Grid item>
                            <span className={classes.listHeader}>
                              {x.display_text}
                            </span>
                            <div className={classes.socialRow}>
                              {x.social.map((s) => (
                                <a href={s.link} key={s.name}>
                                  <img
                                    src={s.icon}
                                    alt={s.name}
                                    className={classes.socialIcon}
                                  />
                                </a>
                              ))}
                            </div>
                          </Grid>
                        <Divider style={{ width: '100%', marginTop: 0, marginBottom: 0 }} />
                       </>
                      )}
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </div>
          {disclaimer.length > 0 &&
            disclaimer.map((d) => (
              <Grid key={d.name} item xs={12}>
                <Paper className={classes.disclaimer} elevation={0}>
                  <p>{d.disclaimer_text}</p>
                  <span>
                    {d.display_text.replace("//year", new Date().getFullYear())}
                  </span>
                  <article style={{ display: 'flex' }}>
                    {d.child_links.map((dcl) => (
                      <Link
                        key={dcl.path}
                        to={dcl.path}
                        children={dcl.display_text}
                        className={classes.footerLink}
                      />
                    ))}
                  </article>
                </Paper>
              </Grid>
            ))}
          <ListItem className={classes.foot}>
            <Grid
              item
              xs={12}
              container
              direction="row"
              alignItems="center"
              justify="space-between"
            >
              <Grid item xs={6}>
                <Button
                  onClick={() => {
                    toggle();
                    navigateTo(currentUser ? 'my-account' : 'login');
                  }}
                  className={classes.acctBtn}
                  children="My Account"
                  variant="text"
                  startIcon={
                    <SvgIcon viewBox="0 0 50 50">
                      <g id="icons/general/user" fill="#1B3C92">
                        <path
                          d="M35.9119413,23.7782307 C39.1641559,23.9870288 41.5489834,25.526998 43.1980484,28.1519454 C44.5821945,30.3551713 45.2297433,32.8099131 45.6575931,35.3150911 C46.0592849,37.6657664 46.2325118,40.044255 46.0830775,42.4214127 C45.9049807,45.2554244 44.6247708,47.5640474 42.1326678,49.1760114 C41.195016,49.7824441 40.1126605,49.9837899 38.9838329,49.9827253 C34.3264624,49.9779345 29.6690919,49.9807291 25.0117214,49.9808622 C20.5119945,49.9809953 16.0112935,49.9306921 11.5126796,49.9989607 C8.58716139,50.0434085 6.65536766,48.6594057 5.26537778,46.3847174 C4.37238929,44.923663 4.00186446,43.3196837 4.00002759,41.623615 C3.99685549,38.4296295 4.26650518,35.2687802 5.18036439,32.1833857 C5.72717722,30.3368067 6.43246838,28.5449224 7.71128689,27.0354279 C9.41628548,25.0227685 11.6075718,23.8679247 14.3588891,23.7759684 C14.7195351,23.7639914 14.9908545,23.8732478 15.2524342,24.1045359 C17.5194116,26.1082791 20.1750019,27.3610677 23.2496762,27.6690083 C27.587029,28.1035053 31.4741308,27.0560548 34.7438768,24.2079369 C35.0921395,23.9045209 35.4338627,23.7476229 35.9119413,23.7782307 Z M25.103916,0.000222552914 C32.1298154,0.0434990023 38.3535735,6.08094035 38.1463789,13.1688974 C38.3450784,20.1359068 32.1263598,26.2791773 25.0348031,26.2676746 C17.9785228,26.2562836 11.9229394,20.1232361 11.9220755,13.1213823 C11.9210676,6.10167421 18.0365489,-0.0426041177 25.103916,0.000222552914 Z"
                          id="user-icon"
                        ></path>
                      </g>
                    </SvgIcon>
                  }
                ></Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  onClick={() => {
                    toggle();
                    navigateTo(currentUser ? 'my-account' : 'login');
                  }}
                  fullWidth
                  className={classes.payBtn}
                  children="Pay Your Bill"
                  variant="contained"
                ></Button>
              </Grid>
            </Grid>
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
}