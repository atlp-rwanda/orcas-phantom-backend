import { Router } from 'express';
import {
  validateBusInput,
  validateUpdateBusInput
} from '../middleware/bus.validation';
import controllers from '../controllers/bus.controllers';
import { verifyAdminToken, verifyUserToken }
  from '../middleware/verifyAuthToken';

const router = Router();

router.get('/api', (req, res) => res.send('Welcome to my app'));

router.post('/buses', [verifyAdminToken, validateBusInput],
  controllers.createBus);

router.get('/buses', [verifyAdminToken], controllers.getAllBuses);

router.get('/buses/:busId', [verifyUserToken], controllers.getBusById);

router.patch('/buses/:busId', [verifyUserToken, validateUpdateBusInput],
  controllers.updateBus);

router.delete('/buses/:busId', [verifyAdminToken], controllers.deleteBus);

module.exports = router;
