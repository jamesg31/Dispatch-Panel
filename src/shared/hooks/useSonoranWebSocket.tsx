import { SonoranWebSocketContext } from "../context/sonoranWebSocketContext";
import * as React from "react";

const useSonoranWebSocket = () => {
  const socket = React.useContext(SonoranWebSocketContext);

  return socket;
};

export default useSonoranWebSocket;
