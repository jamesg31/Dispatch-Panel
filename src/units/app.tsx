import { createRoot } from "react-dom/client";
import Theme from "../shared/components/theme";
import { Typography, Paper, Box, Stack } from "@mui/material";
import { StoreContextProvider } from "../shared/context/storeContext";
import { SonoranWebSocketProvider } from "../shared/context/sonoranWebSocketContext";
import UnitsPanel from "./components/unitsPanel";

const App = () => {
  return (
    <StoreContextProvider>
      <SonoranWebSocketProvider>
        <Theme>
          <UnitsPanel />
        </Theme>
      </SonoranWebSocketProvider>
    </StoreContextProvider>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
