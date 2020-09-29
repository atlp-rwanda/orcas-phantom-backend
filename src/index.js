import express from 'express';
import bodyParser from 'body-parser';
import Sequelize from 'sequelize';
import swaggerUi from 'swagger-ui-express';
import DBconfig from './database/config/config';
import swaggerDocument from '../swagger.json';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/swaggerDocument', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => res.status(200).json({
  message: 'Welcome to orcas-phanthom backend site',
}));

app.use((req, res) => {
  const error = new Error('Not found');
  error.status = 404;
  res.send({ status: error.status, message: error.message });
});
// test db
const db = new Sequelize(DBconfig.development.url, {
  dialect: DBconfig.development.dialect
});
db.authenticate().then(() => console.log('Database connected...')).catch((err) => console.log(`Error ${err}`));

export default app;
