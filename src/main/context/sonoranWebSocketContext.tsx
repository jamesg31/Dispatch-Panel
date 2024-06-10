import { Alert, Button } from "@mui/material";
import * as React from "react";
import useStore from "../../shared/hooks/useStore";

export const SonoranWebSocketContext = React.createContext<WebSocket>(null);

export const SonoranWebSocketProvider = (props: React.PropsWithChildren) => {
  const { settings } = useStore();
  const [ws, setWs] = React.useState<WebSocket>();
  const [wsState, setWsState] = React.useState<WebSocket["readyState"]>();

  const connect = () => {
    console.log("Connecting to Sonoran Radio Plugin");
    const webSocket = new WebSocket(settings.sonoranWebSocketUrl);
    setWs(webSocket);
    setWsState(webSocket.readyState);

    webSocket.addEventListener("open", () => {
      console.log("Connected to Sonoran Radio Plugin");
      setWsState(webSocket.readyState);
    });

    webSocket.addEventListener("close", () => {
      console.warn("Connection to Sonoran Radio Plugin lost or failed.");
      setWsState(webSocket.readyState);
    });
  };

  React.useEffect(() => {
    connect();
  }, []);

  return (
    <SonoranWebSocketContext.Provider value={ws}>
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
              Disconnected from Sonoran Radio Plugin. Is Teamspeak open?
            </Alert>
          )}
          {props.children}
        </React.Fragment>
      )}
    </SonoranWebSocketContext.Provider>
  );
};
