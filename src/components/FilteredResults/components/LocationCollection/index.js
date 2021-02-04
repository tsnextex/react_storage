import React, { useEffect, useState } from "react";
import { CustomDropdown } from './style';
import { Grid } from "@material-ui/core";
import { LocationCard } from "../LocationCard";

export const LocationCollection = props => {

  const {
    handleLocationClick,
    activePropFilters = { size: [], type: [] },
    activePropFilterTags = { size: [], type: [] },
    amenityFilters = [],
    activeFilters = [],
    actionableSizeFilters = [],
    actionableAmenityFilters = [],
    defaultSizeFilterTags = [],
    defaultAmenityFilterTags = [],
    propertyList,
    clearAllSize,
    sizeChange
  } = props;

  const [sortOrder, setSortOrder] = useState('proximity');
  const [sortedProperties, setSortedProperties] = useState([]);

  useEffect(() => {

    if (sortOrder === 'proximity') {

      setSortedProperties([...propertyList].sort((a, b) => a.search_distance - b.search_distance));

    } else if (sortOrder === 'price') {

      setSortedProperties([...propertyList].sort((a, b) => a.min_price - b.min_price));
    }

  }, [propertyList, sortOrder]);

  const getUnitCount = () => {

    if (propertyList.length > 0) {

      // add up each locations vacant count
      let count = 0;
      propertyList.map(property => count = count + Number(property.totalVacantCount));
      return count;
    }
  }

  const options = [
    {
      key: 'proximity',
      text: 'proximity',
      value: 'proximity',
      content: 'Proximity',
    },
    {
      key: 'price',
      text: 'price',
      value: 'price',
      content: 'Price',
    },
  ];

  const handleSort = (event, data) => setSortOrder(data.value);

  return (
    <Grid container justify="center" style={{ padding: '10px 0 50px 0' }}>
      <Grid item md={10} container spacing={2} direction="column">
        <Grid style={{ padding: '8px 0 10px 0' }} item container direction="row" justify="space-between">
          <Grid item>
            <span
              style={{
                color: "#4A4A4A",
                fontSize: "10px",
                fontWeight: "bold",
                fontFamily: "Montserrat",
              }}
            >
              {getUnitCount()} units available in {propertyList.length} locations
            </span>
          </Grid>
          { propertyList.length > 0 &&
            <Grid item>
              <span
                style={{
                  color: "#4A4A4A",
                  fontSize: "10px",
                  fontWeight: "bold",
                  fontFamily: "Montserrat"
                }}
              >
                Sort by:{' '}
                <CustomDropdown
                  inline
                  pointing
                  header='Sort results by'
                  options={options}
                  defaultValue={options[0].value}
                  onChange={handleSort}
                />
              </span>
            </Grid>
          }
        </Grid>
        { propertyList.length > 0 &&
          [...sortedProperties].map((location, i) => 
            <LocationCard
              {...location}
              key={location.code}
              locationObj={location}
              filters={amenityFilters}
              activeFilters={activeFilters}
              activePropFilters={activePropFilters}
              activePropFilterTags={activePropFilterTags}
              actionableSizeFilters={actionableSizeFilters}
              actionableAmenityFilters={actionableAmenityFilters}
              defaultSizeFilterTags={defaultSizeFilterTags}
              defaultAmenityFilterTags={defaultAmenityFilterTags}
              handleLocationClick={handleLocationClick}
              clearAllSize={clearAllSize}
              sizeChange={sizeChange}
            />
          )
        }
      </Grid>
    </Grid>
  );
}
