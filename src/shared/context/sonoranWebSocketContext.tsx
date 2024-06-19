import { Alert, Button } from "@mui/material";
import * as React from "react";
import useStore from "../hooks/useStore";

export interface Controller {
  cid: number;
  server_uid: string;
  nickname: string;
  state: ClientState;
  config: ServerConfig;
  in_patrol_channel: boolean;
  channel_clients: ChannelClient[];
}

interface ClientGamestate {
  position: [number, number, number];
  radio_powered: boolean;
  tower_quality: number;
}

interface ClientState {
  spec: number;
  interop: number;
  version: string;
  freq_recv: Frequency;
  freq_xmit: Frequency;
  freq_scan: Frequency[];
  enable_scan: boolean;
  game?: ClientGamestate;
}

interface ChannelClient {
  id: number;
  uid: string;
  name: string;
  state?: ClientState;
}

interface ServerConfig {
  id: number;
  pending: boolean;
  server_uid: string;
  sublvl: number;
  default_profile_id?: number;
  patrol_channels: {
    id: number;
    channel_uid: string;
    allow_talkover: boolean;
  }[];
  profiles: {
    id: number;
    freq_recv: Frequency;
    freq_xmit?: Frequency;
    repeats_xmit: boolean;
  }[];
  disabled_vers: string[];
}

export type Frequency = [number, number];

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

      webSocket.send(JSON.stringify({ type: "get_controllers" }));
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
