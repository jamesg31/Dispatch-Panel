import { createRoot } from "react-dom/client";
import Theme from "../shared/components/theme";
import { Typography, Paper, Box } from "@mui/material";
import pjson from "../../package.json";
import { StoreContextProvider } from "../shared/context/storeContext";

const App = () => {
  return (
    <StoreContextProvider>
      <Theme>
        <Box sx={{ p: 1 }}>
          <Paper variant="outlined" sx={{ width: "100%" }}>
            <Typography variant="h6">
              Welcome to Dispatch Panel: v{pjson.version}
            </Typography>
          </Paper>
        </Box>
      </Theme>
    </StoreContextProvider>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
