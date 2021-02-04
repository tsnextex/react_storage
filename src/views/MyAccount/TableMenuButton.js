import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Checkbox,
  InputLabel,
  ListItemText,
  TableCell,
  Button,
  FormControl,
  Select,
  Icon,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: "capitalize",
    color: "#1B3C92",
    fontFamily: "Roboto",
    fontWeight: "bold",
    textAlign: "end",
    margin: 0,
    padding: "16px 0 16px 16px",
    fontSize: "12px",
  },
  formControl: {
    width: "130px",
    position: "absolute",
    left: "32px",
    top: "100px",
    height: "0px",
    opacity: 0,
  },
}));

export default function TableMenuButton({
  label = "",
  options = [],
  checked = [],
  handleChange,
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <TableCell style={{ position: "relative" }}>
      <Button
        className={classes.button}
        onClick={handleOpen}
        endIcon={<Icon>unfold_more</Icon>}
      >
        {label}
      </Button>
      <FormControl className={classes.formControl}>
        <InputLabel
          style={{ display: "none", fontSize: "12px" }}
          id="demo-controlled-open-select-label"
        >
          {label}
        </InputLabel>
        <Select
          style={{ height: 0 }}
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          multiple
          value={checked}
          onChange={handleChange}
        >
          {options.map((x) => (
            <MenuItem value={x}>
              <Checkbox checked={checked.indexOf(x) > -1} />
              <ListItemText primary={x} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </TableCell>
  );
}
