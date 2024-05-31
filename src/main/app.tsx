import { createRoot } from "react-dom/client";
import TransmitLog from "./components/transmitLog";
import Theme from "./components/theme";
import { Stack, Box } from "@mui/material";
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

const App = () => {
  return (
    <StoreContextProvider>
      <SonoronWebSocketProvider>
        <Theme>
          <Box sx={{ p: 1 }}>
            <Stack spacing={1} direction={"column"} alignItems={"center"}>
              <TransmitLog />
            </Stack>
          </Box>
        </Theme>
      </SonoronWebSocketProvider>
    </StoreContextProvider>
  );
};

// get the root element
const root = createRoot(document.getElementById("root"));
root.render(<App />);
