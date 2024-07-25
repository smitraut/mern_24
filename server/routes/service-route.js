import express from 'express';
import { services } from '../controllers/service-controller.js';

const router = express.Router();

router.get('/service', services);

export default router;
