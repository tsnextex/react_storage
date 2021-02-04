import { Router } from 'express';
import config from '../config';
import axios from 'axios';
import {
  randomStringAsBase64Url,
  encryptObjectToBase64url,
  decryptBase64urlToObject,
} from '../helpers/cryptoHelper';

const router = new Router();

const geoService = async (url, token) => {
  return await axios.get(url + '?/token=' + token)
  .then(response => response.data)
  .catch(err => console.log(err));
}

router.get('/json', async (req, res, next) => {
  const { city, region, postal, loc } = await geoService(config.geoipService, config.geoipToken);
  res.send({ city, region, postal, loc });
});

router.get('/', async (req, res, next) => {
  const { city, region, postal, loc } = await geoService(config.geoipService, config.geoipToken);
  res.send({ key: encryptObjectToBase64url({ city, region, postal, loc }, config.encryptionKey) });
});

router.get('/decode/:key', async (req, res, next) => {
  const key = req.params.key;
  res.send(decryptBase64urlToObject(key, config.encryptionKey));
});

export default router;
