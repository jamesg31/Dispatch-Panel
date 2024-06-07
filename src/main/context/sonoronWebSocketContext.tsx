import { Alert, Button } from "@mui/material";
import * as React from "react";
import useStore from "../../shared/hooks/useStore";

export const SonoronWebSocketContext = React.createContext<WebSocket>(null);

export const SonoronWebSocketProvider = (props: React.PropsWithChildren) => {
  const { settings } = useStore();
  const [ws, setWs] = React.useState<WebSocket>();
  const [wsState, setWsState] = React.useState<WebSocket["readyState"]>();

  const connect = () => {
    console.log("Connecting to Sonoron Radio Plugin");
    const webSocket = new WebSocket(settings.sonoronWebSocketUrl);
    setWs(webSocket);
    setWsState(webSocket.readyState);

    webSocket.addEventListener("open", () => {
      console.log("Connected to Sonoron Radio Plugin");
      setWsState(webSocket.readyState);
    });

    webSocket.addEventListener("close", () => {
      console.warn("Connection to Sonoron Radio Plugin lost or failed.");
      setWsState(webSocket.readyState);
    });
  };

  React.useEffect(() => {
    connect();
  }, []);

  return (
    <SonoronWebSocketContext.Provider value={ws}>
      {ws === undefined ? (
        <React.Fragment></React.Fragment>
      ) : (
        <React.Fragment>
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
        </React.Fragment>
      )}
    </SonoronWebSocketContext.Provider>
  );
};
