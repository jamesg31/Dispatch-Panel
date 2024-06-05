import { Alert, Button } from "@mui/material";
import * as React from "react";
import useStore from "../../shared/hooks/useStore";

export const SonoronWebSocketContext = React.createContext<WebSocket>(null);

export const SonoronWebSocketProvider = (props: React.PropsWithChildren) => {
  const { settings } = useStore();
  const [ws, setWs] = React.useState<WebSocket>();
  const [wsState, setWsState] = React.useState<WebSocket["readyState"]>();

  const connect = () => {
    setWs(new WebSocket(settings.sonoronWebSocketUrl));
    setWsState(ws.readyState);

    ws.addEventListener("open", () => {
      console.log("Connected to Sonoron Radio Plugin");
      setWsState(ws.readyState);
    });

    ws.addEventListener("close", () => {
      console.warn("Connection to Sonoron Radio Plugin lost or failed.");
      setWsState(ws.readyState);
    });
  };

  React.useEffect(() => {
    connect();
  }, []);

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
