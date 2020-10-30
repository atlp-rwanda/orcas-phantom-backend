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

  const broadcast = () => {
    const currentLocation = '11.86136, -56.45234';
    const json = JSON.stringify({
      Location: `Hello The nearby Bus Location is:${currentLocation}`,
    });
    wss.clients.forEach((client) => {
      client.send(json);
      console.log(`Sent: Hello The nearby Bus Location is: ${currentLocation}`);
    });
  };
  setInterval(broadcast, 3000);
};

export default websocketServer;
