import { createRoot } from "react-dom/client";
import * as React from "react";
import ChannelButtons from "./components/channelButtons";
import { TransmitLog } from "./components/transmitLog";
import { Stack } from "@mui/material";

import { SonoronWebSocketProvider } from "./context/sonoronWebSocketContext";

declare global {
  interface Window {
    electron: {
      store: {
        get: (key: string) => any;
        set: (key: string, val: any) => void;
        // any other methods you've defined...
      };
    };
  }
}

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
        <TransmitLog />
      </Stack>
    </SonoronWebSocketProvider>
  );
}
