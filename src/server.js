import app from './index';
import db from './database/models';
import websocketServer from './websocket-server';

const http = require('http');
const WSS = require('ws');

const server = http.createServer(app);
const wss = new WSS.Server({ server, path: '/websocket' });

websocketServer(wss);

const port = process.env.PORT || 9000;
db.sequelize.sync({ alter: false })
  .then(() => {
    console.log('database connected.');
    server.listen(port, console.log(`server has started on port ${port}`));
  });
