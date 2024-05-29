import { createRoot } from "react-dom/client";
import * as React from "react";
import ChannelButtons from "./components/channelButtons";
import TransmitLog from "./components/transmitLog";
import Theme from "./components/theme";
import { Stack, ThemeProvider, createTheme } from "@mui/material";

import { SonoronWebSocketProvider } from "./context/sonoronWebSocketContext";
import { StoreContextProvider } from "./context/storeContext";

declare global {
  interface Window {
    electron: {
      store: {
        get: (store: string, key: string) => any;
        set: (store: string, key: string, val: any) => void;
      };
    };
  }
}

// get the root element
const root = createRoot(document.getElementById("root"));
root.render(<App />);

function App() {
  return (
    <StoreContextProvider>
      <SonoronWebSocketProvider>
        <Theme>
          <Stack
            spacing={1}
            direction={"column"}
            alignItems={"center"}
            sx={{ m: 1 }}
          >
            <TransmitLog />
          </Stack>
        </Theme>
      </SonoronWebSocketProvider>
    </StoreContextProvider>
  );
}
