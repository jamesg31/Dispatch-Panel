import { createRoot } from "react-dom/client";
import ChannelButtons from "./components/channelButtons";
import Box from "@mui/material/Box";

// get the root element
const root = createRoot(document.getElementById("root"));
root.render(<App />);

function App() {
  return (
    <Box>
      <ChannelButtons />
    </Box>
  );
}
