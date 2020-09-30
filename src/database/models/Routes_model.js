import Sequelize from 'sequelize';
import db from '../connection';

const Route = db.define('route', {
  id: { type: Sequelize.STRING },
  name: { type: Sequelize.STRING },
  orginID: { type: Sequelize.STRING },
  destinationID: { type: Sequelize.STRING },
  busStops: { type: Sequelize.ARRAY }
});
export default Route;
