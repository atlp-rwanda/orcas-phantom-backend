import Sequelize from 'sequelize';
import DBconfig from './config/config';

const db = new Sequelize(DBconfig.development.url, {
  dialect: DBconfig.development.dialect
});
db.authenticate().then(() => console.log('Database connected...')).catch(
  (err) => console.log(`Error ${err}`)
);

export default db;
