import React, { useEffect, useState } from "react";
import { CustomSearchDrawer } from './style';
import { Close } from "@material-ui/icons";
import {
  Button,
  Grid,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Checkbox } from 'semantic-ui-react';
import sm from './icons/sm.png';
import md from './icons/md.png';
import lg from './icons/lg.png';
import xl from './icons/xl.png';
import ice from './icons/ice.png';
import park from './icons/park.png';
import wine from './icons/wine.png';
import drive from './icons/drive.png';
import ff from './icons/ff.png';
import promo from './icons/promo.png';

const drawerWidth = "100vw";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: "none",
  },
  drawer: {
    maxWidth: 322,
    width: '100%',
    flexShrink: 0,
    position: "absolute",
    pointerEvents: "auto",
    right: 0,
    zIndex: 9
  },
  drawerPaper: {
    maxWidth: 322,
    width: '100%',
    position: "fixed",
    right: 0,
    top: 50,
    zIndex: 9
  },
  close: { boxShadow: "0 2px 4px 0 #DBDBDB" },
  foot: { boxShadow: "0 -2px 4px 0 #DBDBDB" },
  listItemLink: { textDecoration: "none" },
  listItem: { borderBottom: "1px solid #DBDBDB" },
  listItemText: {
    color: "#4A4A4A",
    fontFamily: "Montserrat",
  },
  listItemTextPrimary: {
    color: "#4A4A4A",
    fontFamily: "Montserrat",
    fontSize: "1.4em",
  },
  subList: { backgroundColor: "#F8F8FF", fontSize: ".9em" },
  chip: { margin: "8px 4px" },
  disclaimer: {
    padding: theme.spacing(2),
    fontSize: ".8em",
    textAlign: "left",
    lineHeight: "1.8",
    "& p": {
      marginBottom: "1em",
    },
  },
  footerLink: {
    float: "right",
    paddingRight: "1em",
    textDecoration: "underline",
  },
  listHeader: {
    fontWeight: "700",
    color: "#4A4A4A",
    fontFamily: "Montserrat"
  },
  socialIcon: {
    margin: "12px 8px",
    width: "20px",
    height: "20px",
  },
  acctBtn: { textTransform: "capitalize", color: "#1B3C92" },
  payBtn: {
    textTransform: "capitalize",
    backgroundColor: "#1B3C92",
    color: "white",
    height: 36,
    width: 140,
    "&:hover": {
      backgroundColor: "#1B3C92",
      boxShadow: 'inset 0 0 100px 100px rgba(255, 255, 255, 0.1)'
    }
  },
  foot: {
    height: 68,
    position: "fixed",
    bottom: 0,
    backgroundColor: "#FFF",
    boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.25)",
    width: '100%',
    maxWidth: 322,
    "& button": {
      fontSize: 14,
      fontWeight: 700
    }
  },
  button: {
    border: "1px solid #D6D6D6",
    width: "100%",
    backgroundColor: "#FFF",
    color: "#1B3C92",
    height: 60,
    textAlign: "left",
    textTransform: "capitalize",
    "& .MuiButton-startIcon": {
      position: "absolute",
      left: 8,
    },
    "& .MuiButton-endIcon": {
      border: '1px solid #C2C2C2',
      borderRadius: 2,
      height: 18,
      position: "absolute",
      right: 20,
      width: 18
    },
    "& .MuiButton-endIcon svg": {
      display: 'none'
    }
  },
}));

export default function FilterDrawer(props) {

  const {
    open = false,
    toggle,
    sizes,
    types,
    applyAllSize,
    applyAllType,
    clearAllSize,
    clearAllType,
    sizeFormDetails,
    typeFormDetails,
    type
  } = props;

  useEffect(() => {
    setSizeStaging(sizeFormDetails);
    setTypeStaging(typeFormDetails);
  }, [sizeFormDetails, typeFormDetails]);

  const [sizeStaging, setSizeStaging] = useState(sizeFormDetails);
  const [typeStaging, setTypeStaging] = useState(typeFormDetails);

  const determineImg = tag => {
    
    let img = '';
    img = tag === 'sm' ? sm : img;
    img = tag === 'md' ? md : img;
    img = tag === 'lg' ? lg : img;
    img = tag === 'xl' ? xl : img;
    img = tag === 'cc' ? ice : img;
    img = tag === 'pk' ? park : img;
    img = tag === 'du' ? drive : img;
    img = tag === 'wn' ? wine : img;
    img = tag === 'ff' ? ff : img;
    img = tag === 'pr' ? promo : img;
    return img;
  }

  const determineCheckedSize = check => sizeStaging[check.tag];
  const determineCheckedType = check => typeStaging[check.tag];

  const determineCopy = index => {

    let copy;
    copy = index === 0 ? 'About a small to large walk in closet.' : copy;
    copy = index === 1 ? 'About a one to two bedroom apartment.' : copy;
    copy = index === 2 ? 'About a three to four bedroom house.' : copy;
    copy = index === 3 ? 'About a five bedroom house.' : copy;
    return copy;
  };

  const sizeChangeStaging = tag => {
    let newVal = { ...sizeStaging };
    newVal[`${tag}`] = !newVal[tag];
    setSizeStaging(newVal);
  };

  const typeChangeStaging = tag => {
    let newVal = { ...typeStaging };
    newVal[`${tag}`] = !newVal[tag];
    setTypeStaging(newVal);
  };

  const handleApply = () => {
    applyAllSize(sizeStaging);
    applyAllType(typeStaging);
    toggle();
  };

  const handleClearAll = () => {
    clearAllSize();
    clearAllType();
    toggle();
  };

  const classes = useStyles();

  const features = [
    { name: 'Promotions', tag: 'pr' },
    { name: 'First Floor', tag: 'ff'}
  ];

  return (
    <CustomSearchDrawer>
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
          role="presentation"
          onKeyDown={toggle}
        >
          <List className={classes.list} style={{ height: "calc(100vh + 200px)" }}>
            <ListItem button onClick={toggle} className={classes.close}>
              <ListItemText className="filterUnits" primary="Filter Units" />
              <Close />
            </ListItem>

            { type === 'searchPage' &&
              <>
                <ListItem className="rowTitleContainer"> 
                  <ListItemText className="rowTitle" primary="Unit Sizes"/>
                </ListItem>
                {sizes.map((size, index) => {
                  return (
                    <ListItem style={{ padding: '5px 16px' }}>
                      <Button
                        variant="outlined"
                        size="large"
                        className={classes.button}
                        startIcon={<img src={determineImg(size.tag)} style={{ height: "40px", paddingLeft: 10 }} />}
                        onClick={() => { sizeChangeStaging(size.tag) }}
                      >
                        <div className="sizesBtnContent">
                          <div className="sizesBtnTitle">{size.name}</div>
                          <div className="sizesBtnDescription">{determineCopy(index)}</div>
                        </div>
                        <Checkbox checked={determineCheckedSize(size)} />
                      </Button>
                    </ListItem>
                  );
                })}
              </>
            }

            <ListItem className="rowTitleContainer">
              <ListItemText className="rowTitle" primary="Unit Amenities" />
            </ListItem>
            {types.filter(x => x.tag !== 'lk').map(x => {

              if (
                (type === 'searchPage') ||
                (type === 'locationPage' && x.tag !== 'pk')
              ) {
                return (
                  <ListItem style={{ padding: '5px 16px' }}>
                    <Button
                      variant="outlined"
                      size="large"
                      className={classes.button}
                      startIcon={<img src={determineImg(x.tag)} style={{ height: "40px", paddingLeft: 10 }} />}
                      onClick={() => { typeChangeStaging(x.tag) }}
                    >
                      <div className="sizesBtnContent">
                        <div className="sizesBtnTitle">{x.name}</div>
                      </div>
                      <Checkbox checked={determineCheckedType(x)} />
                    </Button>
                  </ListItem>
                );
              }
            })}

            <ListItem className="rowTitleContainer">
              <ListItemText className="rowTitle" primary="Unit Features" />
            </ListItem>
            {features.map(type => {
              return (
                <ListItem style={{ padding: '5px 16px' }}>
                  <Button
                    variant="outlined"
                    size="large"
                    className={classes.button}
                    startIcon={<img src={determineImg(type.tag)} style={{ height: "40px", paddingLeft: 10 }} />}
                    onClick={() => { typeChangeStaging(type.tag) }}
                  >
                    <div className="sizesBtnContent">
                      <div className="sizesBtnTitle">{type.name}</div>
                    </div>
                    <Checkbox checked={determineCheckedType(type)} />
                  </Button>
                </ListItem>
              );
            })}

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
                    onClick={handleClearAll}
                    className={classes.acctBtn}
                    children="Clear All"
                    variant="text"
                    fullWidth
                  ></Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    className={classes.payBtn}
                    children="Apply"
                    variant="contained"
                    onClick={handleApply}
                  ></Button>
                </Grid>
              </Grid>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </CustomSearchDrawer>
  );
}
