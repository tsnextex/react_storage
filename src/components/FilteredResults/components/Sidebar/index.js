import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme, fade } from "@material-ui/core/styles";
import {
  Drawer,
  Tooltip,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import classNames from "classnames";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ClearAllIcon from "@material-ui/icons/HighlightOff";
import FilterListIcon from "@material-ui/icons/FilterList";

const drawerWidth = 320;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    fontFamily: "Montserrat",
    background: "#F4F5F8",
  },
  appBar: {
    background: "#1B3C92",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 0,
    marginRight: 20,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    position: "relative",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    position: "relative",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    [theme.breakpoints.up("md")]: {
      width: 80,
    },
    [theme.breakpoints.down("sm")]: {
      width: 80,
    },
    [theme.breakpoints.down("xs")]: {
      width: 60,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  list: { width: "inherit" },
  listItemOpen: {
    whiteSpace: "normal",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  iconClear: {
    [theme.breakpoints.up("md")]: {
      height: 44 * 1.1,
      width: 44 * 1.1,
      marginLeft: -2,
      marginTop: -10,
    },
    [theme.breakpoints.down("sm")]: {
      height: 44 * 1.1,
      width: 44 * 1.1,
      marginLeft: -2,
      marginTop: -10,
    },
    [theme.breakpoints.down("xs")]: {
      height: 44 * 1.1,
      width: 44 * 1.1,
      marginLeft: -12,
      marginTop: -8,
    },
  },
  listItemIconClear: {
    width: 44 * 1.2,
    height: 44 * 1.2,
    marginRight: 30,
    [theme.breakpoints.up("md")]: {
      height: 44 * 1.1,
      marginRight: 12,
    },
    [theme.breakpoints.down("sm")]: {
      height: 44 * 1.1,
      marginRight: 12,
    },
    [theme.breakpoints.down("xs")]: {
      height: 44 * 1.1 + 0,
    },
  },
  clearLabel: {
    marginTop: 0,
    [theme.breakpoints.up("md")]: {
      fontSize: 8,
      marginTop: 6,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 8,
      marginTop: 6,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 8,
      marginTop: 10,
    },
  },
  icon: {
    marginRight: 20,
    "& img": {
      width: 58 * 1.2,
      height: 44 * 1.2,
    },
    [theme.breakpoints.up("md")]: {
      "& img": { width: 58 * 0.8, height: 44 * 0.8 },
    },
    [theme.breakpoints.down("sm")]: {
      "& img": { width: 58 * 0.8, height: 44 * 0.8 },
    },
    [theme.breakpoints.down("xs")]: {
      "& img": { width: 58 * 0.8, height: 44 * 0.8 },
      marginLeft: -10,
    },
  },
  iconAm: {
    marginLeft: 6,
    marginRight: 24,
    "& img": {
      height: 44 * 1.2,
    },
    [theme.breakpoints.up("md")]: {
      paddingBottom: 20,
      "& img": { height: 44 * 0.8 },
    },
    [theme.breakpoints.down("sm")]: {
      paddingBottom: 20,
      "& img": { height: 44 * 0.8 },
    },
    [theme.breakpoints.down("xs")]: {
      "& img": { height: 44 * 0.8 },
      marginLeft: -6,
      paddingBottom: 20,
    },
  },
  filterLabel: {
    position: "absolute",
    fontSize: 10,
    opacity: 1,
    top: 44,
    width: "fill-available",
    height: "fit-content",
    padding: "4px 0 8px 0",
    left: 0,
    textAlign: "center",
    whiteSpace: "normal",
    [theme.breakpoints.down("xs")]: {
      fontSize: 8,
    },
    [theme.breakpoints.up("md")]: {
      top: 44,
    },
  },

  inline: {
    display: "inline",
  },
  grow: { flexGrow: 1 },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200,
    },
  },
}));

export default function Sidebar({
  anchor = "right",
  open = false,
  showLabels = true,
  showClearAll = true,
  handleDrawerToggle,
  sizeFilters = [],
  activeFilters = [],
  handleFilterClick,
  amenityFilters = [],
  activePropFilterTags,
  onSizeFilterClick,
  onTypeFilterClick,
  onClearFilterClick,
}) {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Drawer
      anchor={anchor}
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar} onClick={handleDrawerToggle}>
        <IconButton>
          {!open ? (
            <FilterListIcon />
          ) : theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
      {showClearAll && (
        <ListItem
          className={
            open
              ? classNames(classes.listItemOpen, classes.listItemOpenClear)
              : classNames(classes.listItemClosed, classes.listItemClosedCLear)
          }
          button
          alignItems="flex-start"
          onClick={() => onClearFilterClick()}
        >
          <ListItemIcon className={classes.listItemIconClear}>
            <ClearAllIcon className={classes.iconClear} />
            {showLabels && !open && (
              <Typography
                variant="button"
                component="span"
                className={classNames(classes.filterLabel, classes.clearLabel)}
              >
                CLear All
              </Typography>
            )}
          </ListItemIcon>
          <ListItemText primary={"Clear All"} />
        </ListItem>
      )}
      <Divider />
      <List className={classes.list}>
        {sizeFilters.map(({ name, description, image, tag }) => (
          <Tooltip title={name} placement="right" key={tag}>
            <ListItem
              className={open ? classes.listItemOpen : classes.listItemClosed}
              style={
                activeFilters.indexOf(tag) > -1
                  ? { opacity: 1 }
                  : { opacity: 0.4 }
              }
              button
              key={name}
              alignItems="flex-start"
              onClick={() => onSizeFilterClick(tag)}
            >
              <ListItemIcon>
                <div className={classes.icon}>
                  <img src={image} alt={"icon"} />
                </div>
                {showLabels && !open && (
                  <Typography
                    variant="button"
                    component="span"
                    className={classes.filterLabel}
                  >
                    {name}
                  </Typography>
                )}
              </ListItemIcon>
              <ListItemText primary={name} secondary={description} />
            </ListItem>
          </Tooltip>
        ))}
      </List>
      <Divider />
      <List className={classes.list}>
        {amenityFilters.map(({ name, image, tag }) => (
          <Tooltip title={name} placement="right" key={tag}>
            <ListItem
              className={classes.amlListItem}
              style={
                activeFilters.indexOf(tag) > -1
                  ? { opacity: 1 }
                  : { opacity: 0.4 }
              }
              button
              key={name}
              alignItems="center"
              onClick={() => onTypeFilterClick(tag)}
            >
              <ListItemIcon>
                <div className={classes.iconAm}>
                  <img src={image} alt={"icon"} />
                </div>
                {showLabels && !open && (
                  <Typography
                    variant="button"
                    component="span"
                    className={classes.filterLabel}
                  >
                    {name}
                  </Typography>
                )}
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </Drawer>
  );
}
