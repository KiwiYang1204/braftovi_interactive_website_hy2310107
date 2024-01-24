'use client';
import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext({
  sendMessage: () => {},
  message: {
    type: 'R'
  }
});

export const SocketProvider = ({ children }) => {
  const [ws, setWs] = useState(null);
  const [msg, setMsg] = useState({
    type: 'R'
  });

  useEffect(() => {
    const ws = io('wss://braftovi-interactive-website-hy2310107.vercel.app', {
      transports: ['websocket']
    });

    ws.on('connect', () => {
      console.log('Client Connected');
    });

    ws.on('receive', message => {
      setMsg(message);
    });

    setWs(ws);
  }, []);

  const handleSendMessage = (msg) => {
    ws.emit('message', msg);
  };

  const socketContext = {
    sendMessage: handleSendMessage,
    message: msg
  };

  return (
    <SocketContext.Provider value={socketContext}>
      {children}
    </SocketContext.Provider>
  );
};

