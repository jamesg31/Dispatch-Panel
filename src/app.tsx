import { createRoot } from "react-dom/client";
import * as React from "react";
import ChannelButtons from "./components/channelButtons";
import TransmitLog from "./components/transmitLog";
import Grid from "@mui/material/Grid";

import { Log } from "./components/transmitLog";

// get the root element
const root = createRoot(document.getElementById("root"));
root.render(<App />);

function App() {
  const [logs, setLogs] = React.useState<Array<Log>>([]);

  React.useEffect(() => {
    const ws = new WebSocket("ws://[::1]:33802");
    ws.onopen = () => {
      console.log("connected");
    };
    ws.onmessage = (message) => {
      let data = JSON.parse(message.data);

      // if message type client_xmit_change
      if (data.type == "client_xmit_change") {
        if (data.xmit_type == "unit_talk_permit") {
          setLogs((prevLogs) => {
            return [
              ...prevLogs,
              {
                id: data.client.id,
                nickname: data.client.nickname,
                can_hear: data.can_hear,
                active: true,
              },
            ];
          });
        } else if (data.xmit_type == "unit_squelch") {
          let newLogs = logs;
          for (let i = newLogs.length - 1; i >= 0; i--) {
            if (newLogs[i].id == data.client.id) {
              newLogs[i].active = false;
              break;
            }
          }
          console.log(logs);
          console.log(newLogs);
          setLogs(newLogs);
        }
      }
    };
  }, []);

  return (
    <Grid
      container
      spacing={1}
      direction={"column"}
      alignItems={"center"}
      sx={{ minHeight: "100vh" }}
    >
      <Grid item>
        <ChannelButtons />
      </Grid>
      <Grid item>
        <TransmitLog logs={logs} />
      </Grid>
    </Grid>
  );
}
