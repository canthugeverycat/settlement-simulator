import { useEffect, useState } from 'react';

import { WS_BASE_URL } from '../globals/const';

export type WebSocketData = {
  action: string;
  id: number;
};

type WebSocketOptions = {
  onOpen?: () => void;
  onMessage?: (data: WebSocketData) => void;
};

/**
 * A custom hook for handling WebSockets
 *
 * @param   {WebSocketOptions}
 *
 * @return  {WebSocket} WebSocket instance
 */
const useWebSocket = ({ onOpen, onMessage }: WebSocketOptions) => {
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const newWs = new WebSocket(WS_BASE_URL);
    setWs(newWs);

    newWs.onopen = () => {
      if (onOpen) onOpen();
    };

    newWs.onmessage = (e) => {
      if (onMessage) onMessage(JSON.parse(e.data));
    };

    return () => newWs.close();
  }, []);

  return ws;
};

export default useWebSocket;
