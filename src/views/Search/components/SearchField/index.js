import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, IconButton, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    display: "flex",
    alignItems: "center",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fontSize: "1em",
    padding: 10,
  },
  iconButton: {
    paddingLeft: 12,
    paddingRight: 0,
  },
  searchIcon: {
    width: "1.3em",
    height: "1.3em",
  },
}));

export default function SearchField({
  query,
  handleChange,
  placeholder,
  handleClick,
}) {
  const classes = useStyles();
  return (
    <Paper className={classes.paperRoot}>
      <IconButton
        onClick={(e) => handleClick(e, query)}
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon className={classes.searchIcon} />
      </IconButton>
      <InputBase
        value={query}
        onChange={handleChange}
        className={classes.input}
        placeholder={placeholder}
        inputProps={{ "aria-label": placeholder }}
      />
    </Paper>
  );
}
