'use client';

const { SocketProvider } = require("./context/socket");


const Providers = ({ children }) => {
  return (
    <SocketProvider>
      {children}
    </SocketProvider>
  );
};

export default Providers;