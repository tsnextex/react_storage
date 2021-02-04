import gql from "graphql-tag";

export const HomePageQuery = () => gql`
  {
    getCategories {
      id
      name
      slug
      subcategories {
        id
        name
        legend
        slug
        tag
        code_id
        code_value
        icon
      }
    }
  }
`;