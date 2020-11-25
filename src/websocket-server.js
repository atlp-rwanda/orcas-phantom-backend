import redis from 'redis';

const clienty = redis.createClient();
const websocketServer = (wss) => {
  wss.on('connection', (socket) => {
    console.log('Opened Connection');

    socket.on('message', (message) => {
      console.log(`Received: ${message}`);

      wss.clients.forEach((client) => {
        const json = JSON.stringify({ message: 'Ready to accept connection' });
        client.send(json);
        console.log(`Sent: ${json}`);
      });
    });

    socket.on('close', () => {
      console.log('Connection Closed');
    });
  });
  // eslint-disable-next-line no-use-before-define
  setInterval(broadcast, 1000);
  // const timeInt =

  // eslint-disable-next-line require-jsdoc
  function broadcast() {
    clienty.get('buses', async (err, reply) => {
      const currentLocation = JSON.parse(reply);
      console.log(reply, currentLocation);
      const json = JSON.stringify({
        // eslint-disable-next-line max-len
        Location: `Hello The nearby Bus Location is:${currentLocation}`,
      });
      // if (currentLocation) {
      //   clearInterval(timeInt);
      // }
      wss.clients.forEach((client) => {
        client.send(json);
        console.log(reply);
      });
    });
  }
};

export default websocketServer;
