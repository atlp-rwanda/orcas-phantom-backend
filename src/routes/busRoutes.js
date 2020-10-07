import { Router } from 'express';
import { validateBusInput, validateUpdateBusInput } from '../middleware/bus.validation';
import controllers from '../controllers/busControllers';

const router = Router();

router.get('/api', (req, res) => res.send('Welcome to my app'));

router.post('/buses', [validateBusInput], controllers.createBus);

router.get('/buses', controllers.getAllBuses);

router.get('/buses/:busId', controllers.getBusById);

router.patch('/buses/:busId', [validateUpdateBusInput], controllers.updateBus);

router.delete('/buses/:busId', controllers.deleteBus);

module.exports = router;
