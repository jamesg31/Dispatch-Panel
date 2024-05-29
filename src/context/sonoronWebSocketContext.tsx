import { Alert, Button } from "@mui/material";
import * as React from "react";

const SONORON_WEB_SOCKET_URL = "ws://[::1]:33802";
const sonoronWebSocket = new WebSocket(SONORON_WEB_SOCKET_URL);

export const SonoronWebSocketContext =
  React.createContext<WebSocket>(sonoronWebSocket);

export const SonoronWebSocketProvider = (props: React.PropsWithChildren) => {
  const [ws, setWs] = React.useState<WebSocket>(sonoronWebSocket);
  const [wsState, setWsState] = React.useState<WebSocket["readyState"]>(
    sonoronWebSocket.readyState
  );

  const connect = () => {
    setWs(new WebSocket(SONORON_WEB_SOCKET_URL));
    setWsState(ws.readyState);
  };

  React.useEffect(() => {
    ws.addEventListener("open", () => {
      console.log("Connected to Sonoron Radio Plugin");
      setWsState(ws.readyState);
    });

    ws.addEventListener("close", () => {
      console.warn("Connection to Sonoron Radio Plugin lost or failed.");
      setWsState(ws.readyState);
    });
  }, [ws]);

  return (
    <SonoronWebSocketContext.Provider value={ws}>
      {wsState === WebSocket.CLOSED && (
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={connect}>
              Reconnect
            </Button>
          }
        >
          Disconnected from Sonoron Radio Plugin. Is Teamspeak open?
        </Alert>
      )}
      {props.children}
    </SonoronWebSocketContext.Provider>
  );
};
