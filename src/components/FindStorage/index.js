import React, { useState } from "react";
import { FindStorageContainer } from './style';
import { Button, Grid, Typography } from "@material-ui/core";
import { Search, Form, Accordion, Menu } from 'semantic-ui-react';
import _ from "lodash";
import client from "../../apollo";
import { SearchAutocomplete } from '../../graphql/searchAutocomplete';
import { gqlRequest } from "../../utils";
import banner from '../../img/home/banner.jpg';

export const FindStorage = (props) => {

  const {
    content = {},
    sizeChange,
    typeChange,
    setSearchLatLng,
    setSearchField,
    queryString,
    setQueryString,
    sizeFormDetails,
    typeFormDetails,
    setSearching
  } = props;

  const [activeType, setActiveType] = useState(-1);
  const [activeSize, setActiveSize] = useState(-1);
  const [autoCompleteResults, setAutoCompleteResults] = useState([]);

  // --- Filters ---
  const handleTypeChange = (event, { name, value }) => typeChange(value);
  const handleSizeChange = (event, { name, value }) => sizeChange(value);

  const determineCheckedSize = check => {
    const isChecked = sizeFormDetails[check];
    return isChecked;
  };

  const determineCheckedType = check => {
    const isChecked = typeFormDetails[check];
    return isChecked;
  };

  const TypeForm = (
    <Form>
      <Form.Group grouped>
        <Form.Checkbox checked={determineCheckedType('cc')} onChange={handleTypeChange} label='Climate Controlled' name='storageType' value='cc' />
        <Form.Checkbox checked={determineCheckedType('pk')} onChange={handleTypeChange} label='Parking' name='storageType' value='pk' />
        <Form.Checkbox checked={determineCheckedType('du')} onChange={handleTypeChange} label='Drive Up Access' name='storageType' value='du' />
        <Form.Checkbox checked={determineCheckedType('wn')} onChange={handleTypeChange} label='Wine Storage' name='storageType' value='wn' />
      </Form.Group>
    </Form>
  );
  
  const SizeForm = (
    <Form>
      <Form.Group grouped>
        <Form.Checkbox checked={determineCheckedSize('sm')} onChange={handleSizeChange} label='Small Unit' name='storageSize' value='sm' />
        <Form.Checkbox checked={determineCheckedSize('md')} onChange={handleSizeChange} label='Medium Unit' name='storageSize' value='md' />
        <Form.Checkbox checked={determineCheckedSize('lg')} onChange={handleSizeChange} label='Large Unit' name='storageSize' value='lg' />
        <Form.Checkbox checked={determineCheckedSize('xl')} onChange={handleSizeChange} label='Extra Large Unit' name='storageSize' value='xl' />
      </Form.Group>
    </Form>
  );


  // --- Location Autocomplete
  const onQueryChange = (event, data) => {

    // get new results
    setQueryString(data.value);
    gqlRequest(client, SearchAutocomplete(data.value, null, null))
      .then(res => {
        setAutoCompleteResults(res.data.searchAutoComplete.map((result, key) => {

          // determine title
          const title = (!!result.city && !!result.state_id) ? `${result.city}, ${result.state_id}` : result.state_name;

          return {
            ...result,
            key,
            title
          }
        })
      );
    });
  };

  // go to units view for selectedPlace
  const doASearch = () => {

    // if searchbox is empty ensure cleared local storage
    checkQueryString();
    
    // fetch properties
    setSearching(true);
  };

  const handleType = (e, titleProps) => {

    const { index } = titleProps;
    const newIndex = activeType === index ? -1 : index;
    setActiveType(newIndex);
  }

  const handleSize = (e, titleProps) => {

    const { index } = titleProps;
    const newIndex = activeSize === index ? -1 : index;
    setActiveSize(newIndex);
  }

  const checkQueryString = () => {

    // if query string changed, search by keyword
    // if query string is cleared, clear search results (search by user info if possible)
    if (!queryString) {
      setSearchLatLng(null);
      localStorage.removeItem('lastProperties');
      localStorage.removeItem('typeFilters');
      localStorage.removeItem('sizeFilters');
      localStorage.removeItem('locationQueryString');
      localStorage.removeItem('latLngObj');
    }
  }

  const {
    background,
    button_text = "Loading",
    placeholder,
    promo_title,
    promo_subtitle,
  } = content;

  return (
    <FindStorageContainer background={banner}>
      <Grid
        className="root"
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item className="typoRow">
          <Typography className="title">
            FIND YOUR STORAGE SOLUTION
          </Typography>
          <Typography className="subtitle">
            Storage Rentals of America offers clean, secure, well-lit, and affordable storage units to residents and businesses .
          </Typography>
        </Grid>
        <Grid
          item
          className="formRow"
          container
          spacing={1}
          direction="column"
        >
          <Grid item className="formSubRow">
            <Search
              fluid
              value={queryString}
              className='searchInput'
              input={{ icon: 'search', iconPosition: 'left' }}
              onSearchChange={onQueryChange}
              placeholder={placeholder}
              results={autoCompleteResults}
              onResultSelect={setSearchField}
              onBlur={checkQueryString}
            />
          </Grid>
          <Grid
            item
            className="formSubRow"
            container
            direction="row"
            spacing={1}
          >
            <Grid item xs={6} md={4}>
              <Accordion className="typeDropdown" as={Menu} vertical>
                <Menu.Item>
                  <Accordion.Title
                    active={activeType === 1}
                    onClick={handleType}
                    content='Storage Types'
                    index={1}
                  />
                  <Accordion.Content active={activeType === 1} content={TypeForm} />
                </Menu.Item>
              </Accordion>
            </Grid>

            <Grid item xs={6} md={4}>
              <Accordion className="typeDropdown" as={Menu} vertical>
                <Menu.Item>
                  <Accordion.Title
                    active={activeSize === 1}
                    onClick={handleSize}
                    content='Sizes'
                    index={1}
                  />
                  <Accordion.Content active={activeSize === 1} content={SizeForm} />
                </Menu.Item>
              </Accordion>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                onClick={doASearch}
                children={button_text}
                variant="contained"
                className="button"
              />
            </Grid>
          </Grid>
          {/* <Grid item className="promo">
            <Typography className="promoTitle" children={promo_title} />
            <Typography
              children={promo_subtitle}
              className="promoSubtitle"
            />
          </Grid> */}
        </Grid>
      </Grid>
    </FindStorageContainer>
  );
};