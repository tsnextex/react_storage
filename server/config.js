const config = {
  appName: require('../package.json').name,
  appVersion: require('../package.json').version || '1.0.0',
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT || 5000,
  host: process.env.WEBSITE_HOSTNAME || 'localhost',
  apiHost: process.env.API_HOST || 'http://localhost:4000',
  timeout: 30000,
  storeName: process.env.STORE_NAME || 'sroa',
  storeUrl: process.env.STORE_URL || 'https://sroa.com',
  secret: 'UgOR26rAJyCkBQFeJYi8oSAIeN3YWG2rk1z9JukQPsdpYGV74JTHaNiG6qWMoQ9ad3cSHoJHwErxZxN3lFN_SAL',
  encryptionKey: 'AXlw4UCgKQCiIF56j_0Pqw',
  corsWhitelist: process.env.corsWhitelist || '',
  geoipService: process.env.geoipService || 'https://ipinfo.io/json',
  geoipToken: process.env.geoipToken || '4e7ebab3678ef0',
};

module.exports = config;
