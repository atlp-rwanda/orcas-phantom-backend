import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import users from './routes/users';

const app = express();

app.use(express.json());

app.use('/api', users);

app.use('/swaggerDocument', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => res.status(200).json({
  message: 'Welcome to gunners-phanthom backend site',
}));

app.use((req, res) => {
  const error = new Error('Incorrect route! try again');
  res.send({ status: 404, message: error.message });
});

export default app;
