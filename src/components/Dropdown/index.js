import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, Select, MenuItem, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      height: 38,
    },
  },
  formControl: {
    flex: 1,
    fontSize: "1.1em",
    [theme.breakpoints.down("sm")]: {
      fontSize: 10,
    },
    padding: "12px 14px 11px 14px",
    borderBottom: "none",
  },
  selectEmpty: {
    "&::before": { borderBottom: "none" },
    [theme.breakpoints.down("sm")]: {
      fontSize: 10,
    },
  },
}));

export default function Dropdown({
  first = "all",
  value,
  onChange,
  options = [],
}) {
  const classes = useStyles();

  useEffect(() => {
    console.log(value)
  }, [])

  return (
    <Paper className={classes.paperRoot}>
      <FormControl className={classes.formControl}>
        <Select
          value={value}
          onChange={onChange}
          className={classes.selectEmpty}
        >
          <MenuItem selected value="all">
            <em>{first}</em>
          </MenuItem>
          {options.map((x) => (
            <MenuItem key={x.id} value={x.name}>
              {x.name} why
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  );
}
