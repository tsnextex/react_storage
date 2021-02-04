import { gql } from "@apollo/client";

export const STORAGE_CALCULATOR = gql`
  query {
    getCalculatorTypes {
      name
      items {
        name
        items {
          width
          length
          web_image
          mobile_image
        }
      }
    }
  }
`;

export default STORAGE_CALCULATOR;
