import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, IconButton, InputBase, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      height: 38,
    },
  },
  searchIcon: {
    width: "26px",
    height: "26px",
    color: "#4a4a4a",
    [theme.breakpoints.down("sm")]: {
      width: "16px",
      height: "16px",
    },
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    padding: 10,
    fontSize: 18,
    color: "#4a4a4a",
    opacity: 1,
    [theme.breakpoints.down("sm")]: {
      padding: 6,
      fontSize: 10,
    },
    "& #placeholder": {
      color: "#4A4A4A",
      opacity: 1,
    },
  },
  label: { opacity: 1, color: "#4A4A4A" },
  iconButton: {
    paddingLeft: 12,
    paddingRight: 0,
  },
}));

export default function SearchField({
  value,
  onChange,
  placeholder,
  handleClick,
}) {
  const classes = useStyles();
  return (
    <Paper className={classes.paperRoot}>
      <IconButton
        onClick={(e) => handleClick(e)}
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon className={classes.searchIcon} />
      </IconButton>
      <InputBase
        onChange={onChange}
        className={classes.input}
        placeholder={placeholder}
        inputProps={{ "aria-label": placeholder }}
      />
    </Paper>
  );
}
