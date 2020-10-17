import { Router } from 'express';

import controllers from '../controllers/busStop.controllers';
import {
  busStopInput, busStopUpdateInput
} from '../middleware/busStop.validation';

const router = Router();

router.get('/api', (req, res) => res.send('Welcome to my app'));

router.post('/busstop', [busStopInput], controllers.createBusStop);

router.get('/busstop', controllers.getAllBusStops);

router.get('/busstop/:id', controllers.getBusStopById);

router.patch('/busstop/:id', [busStopUpdateInput], controllers.updateBusStop);

router.delete('/busstop/:id', controllers.deleteBusStop);

module.exports = router;
