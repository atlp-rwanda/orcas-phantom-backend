import Sequelize from 'sequelize';
import app from './index';
import DBconfig from './database/config/config';

const db = new Sequelize(DBconfig.development.url, {
  dialect: DBconfig.development.dialect
});
db.authenticate().then(() => console.log('Database connected...')).catch((err) => console.log(`Error ${err}`));

export default db;

const port = process.env.PORT || 3000;

app.listen(port, console.log(`server has started on port ${port}`));
