import { createRoot } from "react-dom/client";
import Theme from "../shared/components/theme";
import { Typography, Paper, Box } from "@mui/material";
import { StoreContextProvider } from "../shared/context/storeContext";
import Settings from "./components/settings";

const App = () => {
  return (
    <StoreContextProvider>
      <Theme>
        <Box sx={{ p: 1 }}>
          <Paper variant="outlined" sx={{ width: "100%" }}>
            <Settings />
          </Paper>
        </Box>
      </Theme>
    </StoreContextProvider>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
