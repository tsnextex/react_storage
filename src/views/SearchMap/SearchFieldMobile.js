import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, IconButton, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    display: "flex",
    alignItems: "center",
    height: "34px",
    width: "100%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fontSize: "1.6em",
    padding: 1,
  },
  iconButton: {
    paddingLeft: 12,
    paddingRight: 0,
  },
  searchIcon: {
    width: "1em",
    height: "1em",
  },
}));

export default function SearchFieldMobile({ query, onChange, placeholder }) {
  const classes = useStyles();
  return (
    <Paper className={classes.paperRoot}>
      <InputBase
        value={query}
        className={classes.input}
        placeholder={placeholder}
        inputProps={{ "aria-label": placeholder }}
      />
      <IconButton className={classes.iconButton} aria-label="search">
        <SearchIcon className={classes.searchIcon} />
      </IconButton>
    </Paper>
  );
}
