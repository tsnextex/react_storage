import React, { useEffect, useState } from "react";
import { CustomFiltersRow } from '../../style';
import { Chip, Grid } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

export default function SearchFieldMobile(props) {

  const {
    typeFormDetails,
    sizeFormDetails,
    sizeChange,
    typeChange
  } = props;

  const [filterChips, setFilterChips] = useState([]);

  useEffect(() => {

    // create array of filters
    let filters = [];
    filters = typeFormDetails.cc ? [...filters, {title: 'Climate Control', tag: 'cc' }] : filters;
    filters = typeFormDetails.du ? [...filters, {title: 'Drive Up', tag: 'du' }] : filters;
    filters = typeFormDetails.pk ? [...filters, {title: 'Parking', tag: 'pk' }] : filters;
    filters = typeFormDetails.wn ? [...filters, {title: 'Wine Storage', tag: 'wn' }] : filters;
    filters = typeFormDetails.pr ? [...filters, {title: 'Promotions', tag: 'pr' }] : filters;
    filters = typeFormDetails.ff ? [...filters, {title: 'First Floor', tag: 'ff' }] : filters;
    filters = sizeFormDetails.sm ? [...filters, {title: 'Small Units', tag: 'sm' }] : filters;
    filters = sizeFormDetails.md ? [...filters, {title: 'Medium Units', tag: 'md' }] : filters;
    filters = sizeFormDetails.lg ? [...filters, {title: 'Large Units', tag: 'lg' }] : filters;
    filters = sizeFormDetails.xl ? [...filters, {title: 'Extra Large Units', tag: 'xl' }] : filters;
    

    setFilterChips(filters);
  }, [typeFormDetails, sizeFormDetails]);

  const removeChip = tag => {

    const types = ['cc', 'du', 'pk', 'wn', 'lk', 'ff', 'pr'];
    const sizes = ['sm', 'md', 'lg', 'xl'];

    if (types.includes(tag)) typeChange(tag);
    if (sizes.includes(tag)) sizeChange(tag);
  }

  return (
    <CustomFiltersRow>
      <Grid
        item
        className={
          filterChips.length > 0 ? "root" : "rootHide"
        }
        container
        direction="row"
        justify="center"
        spacing={0}
      >
        <Grid item md={10} container direction="row" className="filterContainer">
          <Grid item className="text">
            Filters:
          </Grid>

          <Grid item className="chips">
            {filterChips.map((f, i) => (
              <Chip
                key={i}
                label={f.title}
                onDelete={() => removeChip(f.tag)}
                deleteIcon={<CloseIcon className="close" />}
                className="chip"
              />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </CustomFiltersRow>
  );
};