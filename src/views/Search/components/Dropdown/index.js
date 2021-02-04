import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  Select,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Paper
} from "@material-ui/core";
import { CheckBox, CheckBoxOutlineBlank } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  paperRoot: {
    display: "flex",
    alignItems: "center"
  },
  formControl: {
    flex: 1,
    fontSize: "1.1em",
    padding: "12px 14px 11px 14px",
    borderBottom: "none"
  },
  selectEmpty: {
    "&::before": { borderBottom: "none" }
  }
}));

export default function Dropdown({
  first = null,
  value,
  onChange,
  options = [],
  multiple = false,
  selectRef = null,
  renderValue
}) {
  const classes = useStyles();

  return (
    <Paper className={classes.paperRoot}>
      <FormControl className={classes.formControl}>
        <Select
          displayEmpty={true}
          renderValue={renderValue}
          inputRef={selectRef}
          value={value}
          multiple={multiple}
          onChange={onChange}
          className={classes.selectEmpty}
        >
          {options.map(x => (
            <MenuItem key={x.id} value={x.name}>
              <ListItemIcon>
                {value.includes(x.name) ? (
                  <CheckBox fontSize="small" />
                ) : (
                  <CheckBoxOutlineBlank fontSize="small" />
                )}
              </ListItemIcon>
              <ListItemText primary={x.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  );
}
