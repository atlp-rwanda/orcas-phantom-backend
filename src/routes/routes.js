import express from 'express';
import { validateRouteInput, validateUpdateRouteInput } from '../middlewares/route.validator';
import {
  getAllRoutes,
  addRoute,
  getSpecificRoute,
  deleteSpecificRoute,
  updateSpecificRoute
} from '../controller/routeController';

const router = express.Router();

router.get('/', getAllRoutes);
router.get('/:id', getSpecificRoute);
router.post('/', [validateRouteInput], addRoute);
router.delete('/:id', deleteSpecificRoute);
router.patch('/:id', [validateUpdateRouteInput], updateSpecificRoute);

export default router;
