import * as React from "react";

const ws = new WebSocket("ws://[::1]:33802");

ws.onopen = () => {
  console.log("connected");
};

export const SonoronWebSocketContext = React.createContext<WebSocket>(ws);

export const SonoronWebSocketProvider = (props: React.PropsWithChildren) => {
  return (
    <SonoronWebSocketContext.Provider value={ws}>
      {props.children}
    </SonoronWebSocketContext.Provider>
  );
};
