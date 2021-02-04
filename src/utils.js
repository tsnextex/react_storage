// get some mock map marker objects
export const _getMarkers = () => {
  const markers = [
    {
      name: "WPB",
      locationInfo: {
        name: "Belleville",
        address: "2112 Tilton St Greenwich, OH 44837",
        away: "20 miles away",
        phone: "973-510-2550",
      },
      lat: 26.71286,
      lng: -80.056314,
    },
    {
      name: "NPB",
      locationInfo: {
        name: "Belleville",
        address: "2112 Tilton St Greenwich, OH 44837",
        away: "20 miles away",
        phone: "973-510-2551",
      },
      lat: 26.71746,
      lng: -80.051443,
    },
    {
      name: "SPB",
      locationInfo: {
        name: "Belleville",
        address: "2112 Tilton St Greenwich, OH 44837",
        away: "20 miles away",
        phone: "973-510-2552",
      },
      lat: 26.71036,
      lng: -80.051443,
    },
  ];
  // use `${lat}${lng}` as unique identifier
  return markers;
};

export const gqlRequest = async (client, query) => {
  return await client
    .query({
      query: query,
    })
    .then((response) => {
      const data = response.data;
      return { status: "success", data: data };
    });
};

export const gqlMutate= async (client, query) => {
  return await client
    .mutate({
      mutation: query,
    })
    .then((response) => {
      const data = response.data;
      return { status: "success", data: data };
    });
};