import { createRoot } from "react-dom/client";
import * as React from "react";
import ChannelButtons from "./components/channelButtons";
import TransmitLog from "./components/transmitLog";
import { Stack } from "@mui/material";

import { SonoronWebSocketProvider } from "./context/sonoronWebSocketContext";

// get the root element
const root = createRoot(document.getElementById("root"));
root.render(<App />);

function App() {
  return (
    <SonoronWebSocketProvider>
      <Stack
        spacing={1}
        direction={"column"}
        alignItems={"center"}
        sx={{ m: 1 }}
      >
        <ChannelButtons />
        <TransmitLog />
      </Stack>
    </SonoronWebSocketProvider>
  );
}
