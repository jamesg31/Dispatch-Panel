import TransmitLog from "./transmitLog";
import Channels from "./channels";
import useStore from "../../shared/hooks/useStore";
import { Box, Stack } from "@mui/material";

const ConfiguredApp = () => {
  const { settings } = useStore();
  return (
    <Box sx={{ p: 1 }}>
      <Stack spacing={1} direction={"column"} alignItems={"center"}>
        {settings.frequenciesSection && <Channels />}
        {settings.transmitLogSection && <TransmitLog />}
      </Stack>
    </Box>
  );
};

export default ConfiguredApp;
