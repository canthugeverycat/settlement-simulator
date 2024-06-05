const WebSocket = require('ws');

/**
 * A websocket function to notify all subscribers of select party of a new change
 *
 * @param   {WebSocketServer}  wss WSS instance
 * @param   {string}  id     Id of the newly created item
 * @param   {string}  party  Party that created the item
 */
const notifySettlementCreated = ({ wss, id, party }) => {
  const message = JSON.stringify({ action: 'settlement_created', id });

  // Get all subscribers of selected party
  const subscribers = wss.subscribers[party];

  if (subscribers.size) {
    // Notify all subscribers of the update
    subscribers.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) client.send(message);
    });
  }
};

module.exports = notifySettlementCreated;
