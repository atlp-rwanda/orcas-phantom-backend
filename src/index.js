import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import routes from './routes/routes';
import users from './routes/users';

const app = express();

app.use(express.json());

app.use('/api', users);

app.use('/swaggerDocument', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => res.status(200).json({
  message: 'Welcome to gunners-phanthom backend site',
}));

app.use('/routes', routes);

app.use((req, res) => {
  const error = new Error('Incorrect route! try again');
  error.status = 404;
  res.send({ status: error.status, message: error.message });
});

export default app;
