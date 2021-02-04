import express from 'express';
import timeout from 'timeout-middleware';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import path from 'path';
import apiRoutes from './routes';
import DefaultServerConfig from './config';
import { isNil } from 'ramda';

export const createServer = config => {
  const __PROD__ = config.nodeEnv === 'production';
  const __TEST__ = config.nodeEnv === 'development';
  const PROTOCOL = parseInt(config.port, 10) === 443 ? 'https' : 'http';
  const CURRENT_HOST = `${PROTOCOL}://${config.host}:${config.port}`;

  const app = express();
  app.use(timeout(config.timeout));
  app.use(express.static(path.join(__dirname, '../public')));
  app.use(cookieParser());
  app.use(bodyParser.json());

  const corsWhitelist = config.corsWhitelist.split(',').map(i => i.trim());
  const corsOptionsDelegate = (req, callback) => {
    let corsOptions = { origin: false };
    if (corsWhitelist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = {
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'x-token, x-refresh-token'],
        credentials: true,
        methods: 'GET, HEAD, OPTIONS, PUT, PATCH, POST, DELETE',
        origin: req.header('Origin'),
        preflightContinue: false,
      };
    }

    callback(null, corsOptions);
  };

  app.use('/rest/v0', apiRoutes);

  return app;
};

export const startServer = serverConfig => {
  const config = { ...DefaultServerConfig, ...serverConfig };
  const app = createServer(config);
  const listen = config.port;
  app.listen(listen, err => {
    if (config.nodeEnv === 'production' || config.nodeEnv === 'development') {
      if (err) console.log(err);
      console.log(`server listening on port ${config.port}`);
    }
  });
};

startServer();
