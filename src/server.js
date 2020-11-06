import redis from 'redis';
import app from './index';
import db from './database/models';

const client = redis.createClient();

const port = process.env.PORT || 9000;
db.sequelize.sync({ alter: false })
  .then(() => {
    console.log('database connected.');
    app.listen(port, console.log(`server has started on port ${port}`));
  });

client.on('connect', () => {
  console.log('Redis connected');
});
