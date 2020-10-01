import sequelize from 'sequelize';
import db from '../connection';

const User = db.define('users', {
  email: {
    type: sequelize.STRING
  },
  password: {
    type: sequelize.STRING
  },
  role: {
    type: sequelize.STRING
  },
  busId: {
    type: sequelize.STRING
  }
});

export default User;
