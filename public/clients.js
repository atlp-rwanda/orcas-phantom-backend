const socket = new WebSocket('ws://localhost:9000/websocket');
const log = (text) => {
  const li = document.createElement('li');
  li.innerHTML = text;
  document.getElementById('log').appendChild(li);
};
socket.onopen = () => {
  log('Opened connection');
  const json = JSON.stringify({ message: 'Hello' });
  socket.send(json);
  log(`Sent: ${json}`);
};
socket.onerror = (event) => {
  log(`Error: ${JSON.stringify(event)}`);
};
socket.onmessage = (event) => {
  log(`Received: ${event.data}`);
};
socket.onclose = () => {
  log('Closed connection');
};
document.querySelector('#close').addEventListener('click', () => {
  socket.close();
  log('Closed connection');
});
document.querySelector('#send').addEventListener('click', () => {
  const json = JSON.stringify({ message: 'Hey there' });
  socket.send(json);
  log(`Sent: ${json}`);
});
window.addEventListener('beforeunload', () => {
  socket.close();
});
