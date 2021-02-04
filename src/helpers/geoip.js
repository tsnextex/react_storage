
const decode = key => {
  return fetch('/rest/v0/geoip/decode/' + key, {
    method: 'get',
    credentials: 'include',
  })
    .then(res => res.json())
    .catch(error => {
      console.error(`Error in method that handles decode client geolocation: `, error);
    });
};

export const getGeoLocation = async () => {
    return localStorage && !localStorage.getItem('loc')
    ? fetch('/rest/v0/geoip', {
      method: 'get',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(res => {
        localStorage.setItem('loc', res.key);
        return decode(res.key);
      })
      .catch(error => {
        console.error(`Error in method that handles get client geolocation: `, error);
      })
    : decode(localStorage.getItem('loc'));
};
