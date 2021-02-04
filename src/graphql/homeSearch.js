import gql from "graphql-tag";

const HOMESEARCH_QUERY = (q) => gql`
  {
    searchByKeyOrCoordinates(keyword: "mia", limit: 5) {
      zip
      city
      state_name
    }
  }
`;

export default HOMESEARCH_QUERY;
