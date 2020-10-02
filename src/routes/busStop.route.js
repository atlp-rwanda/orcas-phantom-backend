import { Router } from 'express';

import controllers from '../controllers/busStop.controllers';

const router = Router();

router.get('/api', (req, res) => res.send('Welcome to my app'));

router.post('/busstop', controllers.createBusStop);

router.get('/busstop', controllers.getAllBusStops);

router.get('/busstop/:busStopId', controllers.getBusStopById);

router.put('/busstop/:busStopId', controllers.updateBusStop);

router.delete('/busstop/:busStopId', controllers.deleteBusStop);

module.exports = router;
