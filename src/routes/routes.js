import express from 'express';
import Routes from '../database/models/Routes_model';

const router = express.Router();

router.get('/', (req, res) => Routes.findAll()
  .then((routes) => {
    console.log(routes);
    res.sendStatus(200);
  })
  .catch((err) => console.log(err)));

export default router;
