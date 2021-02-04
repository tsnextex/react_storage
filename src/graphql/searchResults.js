import gql from "graphql-tag";

export const SearchResultsQuery = (lat = null, lng = null, refLat = null, refLng = null, radius, limit) => gql`
{
  getLocationsByCoordinates(
    lat: ${lat},
    long: ${lng},
    referenceLat: ${refLat},
    referenceLong: ${refLng},
    radius: ${radius},
    limit: ${limit},
    typeLimit: ${limit}
  ) {
    id,
    name,
    url,
    slug,
    address,
    address_2,
    city,
    state,
    zipcode,
    phone,
    marketing_numbers {
      name,
      number,
    },
    latitude,
    longitude,
    rating,
    search_distance,
    reference_distance,
    min_price,
    tags,
    images {
      title,
      url,
      main,
    }
    types {
      id,
      reference_id
      name,
      unit_id,
      unit_name,
      unit_rented,
      width,
      length,
      price,
      online_price,
      is_climate,
      is_inside,
      floor,
      image,
      total_units,
      total_vacant,
      total_occupied,
      total_reserved,
      concession_id,
      promotion_name,
      tags
    }
  }
}
`;