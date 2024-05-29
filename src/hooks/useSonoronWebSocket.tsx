import { SonoronWebSocketContext } from "../context/sonoronWebSocketContext";
import * as React from "react";

export const useSonoronWebSocket = () => {
  const socket = React.useContext(SonoronWebSocketContext);

  return socket;
};
