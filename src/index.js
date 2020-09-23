import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/swaggerDocument', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => res.status(200).json({
  message: 'Welcome to orcas-phanthom backend site',
}));

app.use(async (req, res) => {
  const error = await new Error('Not found');
  error.status = 404;
  res.send({ status: error.status, message: error.message });
});

app.listen(port, console.log(`server has started on port ${port}`));

export default app;
