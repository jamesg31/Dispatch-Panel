import { SonoronWebSocketContext } from "../context/sonoronWebSocketContext";
import * as React from "react";

const useSonoronWebSocket = () => {
  const socket = React.useContext(SonoronWebSocketContext);

  return socket;
};

export default useSonoronWebSocket;
