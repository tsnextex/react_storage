import gql from "graphql-tag";

export const SearchAutocomplete = (key, lat = null, lng = null) => gql`
  {
    searchAutoComplete(
        keyword: "${key}",
        referenceLat: ${lat},
        referenceLong: ${lng},
        limit: 10
    ) {
      lat,
      lng,
      zip,
      city,
      state_id,
      state_name,
      locations,
      reference_distance
    }
  }
`;