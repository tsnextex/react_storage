import React, { useState, useEffect } from "react";
import { CustomSearchFieldMobile } from './style';
import { Paper } from "@material-ui/core";
import { Search } from 'semantic-ui-react';
import { SearchAutocomplete } from '../../../../graphql/searchAutocomplete';
import { gqlRequest } from "../../../../utils";
import client from "../../../../apollo";

export default function SearchFieldMobile(props) {

  const {
    onChange,
    placeholder,
    queryString,
    setQueryString,
    setSearchField,
    setSearchLatLng
  } = props;

  const [autoCompleteResults, setAutoCompleteResults] = useState([]);

  // --- Location Autocomplete
  const onQueryChange = (event, data) => {

    // get new results
    setQueryString(data.value);
    localStorage.setItem('locationQueryString', data.value);
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

  return (
    <CustomSearchFieldMobile>
      <Paper className="paperRoot">
        <Search
          value={queryString}
          className='input'
          input={{ icon: 'search', iconPosition: 'right' }}
          fluid
          onSearchChange={onQueryChange}
          placeholder={placeholder}
          results={autoCompleteResults}
          onResultSelect={setSearchField}
          onBlur={checkQueryString}
        />
      </Paper>
    </CustomSearchFieldMobile>
  );
};