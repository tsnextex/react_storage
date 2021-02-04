import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Dropdown, SearchField } from "..";

const useStyles = makeStyles((theme) => ({
  searchBox: {
    backgroundColor: "#1B3C92",
    color: "white",
    padding: theme.spacing(2),
    textAlign: "center",
  },
  formRow: {},
}));
export default function SearchBar({
  query,
  storageSizeObject,
  storageTypeObject,
  sizes,
  types,
  activeTypes,
  activeSizes,
  onActiveTypesChange,
  onActiveSizesChange,
  multipleSizes = true,
  multipleTypes = true,
  typeSelectRef = null,
  sizeSelectRef = null,
  placeholder,
}) {
  const classes = useStyles();

  return (
    <Grid
      item
      className={classes.searchBox}
      container
      direction="row"
      justify="center"
      spacing={0}
    >
      <Grid
        item
        md={10}
        className={classes.formRow}
        container
        spacing={2}
        direction="row"
      >
        <Grid item md={4} className={classes.formSubRow}>
          <SearchField query={query} placeholder={placeholder} />
        </Grid>

        <Grid item md={4}>
          <Dropdown
            value={activeSizes}
            onChange={onActiveSizesChange}
            options={sizes}
            multiple={multipleSizes}
            selectRef={sizeSelectRef}
            renderValue={() => "Unit Sizes"}
          />
        </Grid>

        <Grid item md={4}>
          <Dropdown
            value={activeTypes}
            onChange={onActiveTypesChange}
            options={types}
            multiple={multipleTypes}
            selectRef={typeSelectRef}
            renderValue={() => "Unit Amenities"}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
