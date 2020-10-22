import express from 'express';
import {
  validateRouteInput, validateUpdateRouteInput
} from '../middleware/route.validation';
import {
  getAllRoutes,
  addRoute,
  getSpecificRoute,
  deleteSpecificRoute,
  updateSpecificRoute
} from '../controllers/routes.controller';

import { verifyAdminToken } from '../middleware/verifyAuthToken';

const router = express.Router();

router.get('/', [verifyAdminToken], getAllRoutes);
router.get('/:id', [verifyAdminToken], getSpecificRoute);
router.post('/', [verifyAdminToken, validateRouteInput], addRoute);
router.delete('/:id', [verifyAdminToken], deleteSpecificRoute);
router.patch('/:id', [verifyAdminToken, validateUpdateRouteInput],
  updateSpecificRoute);

export default router;
