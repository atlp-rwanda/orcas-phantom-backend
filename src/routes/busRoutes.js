import { Router } from 'express';

import controllers from '../controllers/busControllers';

const router = Router();

router.get('/api', (req, res) => res.send('Welcome to my app'));

router.post('/buses', controllers.createBus);

router.get('/buses', controllers.getAllBuses);

router.get('/buses/:busId', controllers.getBusById);

router.put('/buses/:busId', controllers.updateBus);

router.delete('/buses/:busId', controllers.deleteBus);

module.exports = router;
