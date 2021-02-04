import { Router } from 'express';
import expressJwt from 'express-jwt';
import jwt from 'jsonwebtoken';
import {
  randomStringAsBase64Url,
  encryptObjectToBase64url,
  decryptBase64urlToObject,
} from '../helpers/cryptoHelper';
import { isNil } from 'ramda';
import config from '../config';

const router = new Router();

const PROTOCOL = parseInt(config.port, 10) === 443 ? 'https' : 'http';

const createTokens = async (data, secret, secret2) => {
  // const options = {
  //   algorithm: 'HS512',
  //   jwtid: randomStringAsBase64Url(64),
  //   issuer: config.host,
  // };
  const createToken = jwt.sign(
    data,
    secret,
    { expiresIn: '1m' },
  );

  const createRefreshToken = jwt.sign(
    data,
    secret2,
    { expiresIn: '7d' },
  );
  return Promise.all([createToken, createRefreshToken]);
};

router.use(
  '/token',
  expressJwt({
    secret: config.secret,
    credentialsRequired: false,
    ignoreExpiration: true,
    getToken: function fromHeaderOrCookie(req) {
      // get the user token from the headers or cookie
      if (req.headers['x-token'] && req.headers['x-token'] !== '') {
        return req.headers['x-token'];
      } else if (req.cookies && req.cookies.token) {
        return req.cookies.token;
      }

      return null;
    },
  }),
  async (req, res) => {
    // By default, the decoded token is attached to req.user
    // but can be configured with the requestProperty option
    // create new token if not already present
    if (isNil(req.user)) {
      const data = { user: 0 };
      const  [token, refreshToken] = await createTokens(
        { data: encryptObjectToBase64url(data, config.encryptionKey) },
        config.secret,
        config.secret + config.encryptionKey,
      );
      res.send({ token: token, refreshToken:  refreshToken });
    } else {
      const token = req.headers['x-token'];
      const refreshToken = req.headers['x-refresh-token'];
      res.send({ token: token, refreshToken: refreshToken });
    }
  },
);

export default router;
