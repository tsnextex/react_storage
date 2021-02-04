import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Chip, Grid } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Montserrat",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    padding: theme.spacing(0.5),
    borderBottom: "1px solid #E3E3E3",
  },
  rootHide: { display: "none" },
  text: {
    marginLeft: "1em",
    marginRight: "1em",
    alignSelf: "center",

    color: "#4A4A4A",
    fontFamily: "Montserrat",
    fontSize: "10px",
    fontWeight: "bold",
    letterSpacing: 0,
  },
  chip: {
    background: "transparent",
    margin: theme.spacing(0.5),
    color: "#1B3C92",
    fontFamily: "Montserrat",
    fontSize: "10px",
    letterSpacing: 0,
    lineHeight: "13px",
  },
  close: { color: "#1B3C92", width: "14px" },
}));

export default function FiltersRow({
  activeFilters: { size, type },
  removeFilter,
}) {
  const classes = useStyles();

  const handleDelete = (filterToDelete) => {
    removeFilter(filterToDelete);
  };

  return (
    <Grid
      item
      className={
        [...size, ...type].length > 0 ? classes.root : classes.rootHide
      }
      container
      direction="row"
      justify="center"
      spacing={0}
    >
      <Grid item md={10} container spacing={2} direction="row">
        <Grid item className={classes.text}>
          Filters:
        </Grid>

        <Grid item className={classes.chips}>
          {[...size, ...type].map((f) => (
            <Chip
              key={f}
              label={f}
              onDelete={() => handleDelete(f)}
              deleteIcon={<CloseIcon className={classes.close} />}
              className={classes.chip}
            />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
