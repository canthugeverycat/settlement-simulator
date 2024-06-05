const WebSocket = require('ws');

/**
 * An initlization function for the websocket to listen
 * to updates for respective parties
 *
 * @param   {ExpressServer}  server  A an express server instance
 *
 * @return  {WebSocketServer} A WebSocket server instance
 */
const initializeWS = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.subscribers = {
    a: new Set(),
    b: new Set(),
  };

  wss.on('connection', (ws) => {
    ws.on('message', (body) => {
      const data = JSON.parse(body);
      const { action, party } = data;

      if (action === 'subscribe' && ['a', 'b'].includes(party)) {
        // Subscribe to updates for the specified party
        wss.subscribers[party].add(ws);
      }
    });

    ws.on('close', () => {
      // Remove subscriber from all parties when disconnected
      Object.values(wss.subscribers).forEach((set) => {
        set.delete(ws);
      });
    });
  });

  return wss;
};

module.exports = initializeWS;
