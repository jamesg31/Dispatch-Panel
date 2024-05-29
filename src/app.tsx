import { createRoot } from "react-dom/client";
import * as React from "react";
import ChannelButtons from "./components/channelButtons";
import TransmitLog from "./components/transmitLog";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

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
              {
                id: data.client.id,
                nickname: data.client.nickname,
                can_hear: data.can_hear,
                active: true,
              },
              ...prevLogs,
            ];
          });
        } else if (data.xmit_type == "unit_squelch") {
          setLogs((prevLogs) =>
            prevLogs.map((log) =>
              log.id === data.client.id ? { ...log, active: false } : log
            )
          );
        }
      }
    };
  }, []);

  return (
    <Stack spacing={1} direction={"column"} alignItems={"center"}>
      <ChannelButtons />
      <TransmitLog logs={logs} />
    </Stack>
  );
}
