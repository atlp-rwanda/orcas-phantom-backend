import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import routes from './routes/routes.route';
import users from './routes/users.route';

const app = express();

const busRoutes = require('./routes/bus.route');

const busstopRoutes = require('./routes/busStop.route');

app.use(express.json());
app.use('/swaggerDocument', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => res.status(200).json({
  message: 'Welcome to gunners-phanthom backend site',
}));
app.use(express.static('public'));
app.use('/', busRoutes);
app.use('/routes', routes);
app.use('/', busstopRoutes);

app.use('/api', users);

app.use((req, res) => {
  const error = new Error('Incorrect route! try again');
  error.status = 404;
  res.send({ status: error.status, message: error.message });
});

app.use(cors());

export default app;
