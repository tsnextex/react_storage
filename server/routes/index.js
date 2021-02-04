import { Router } from 'express';
import config from '../config';

/* Routes */
import auth from './auth';
import geoip from './geoip';

const router = new Router();

router.use('/auth', auth);
router.use('/geoip', geoip);

export default router;
