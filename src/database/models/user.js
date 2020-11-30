export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    busId: DataTypes.INTEGER
  }, {});

  return User;
};
