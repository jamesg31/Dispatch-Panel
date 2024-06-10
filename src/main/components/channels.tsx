import * as React from "react";
import {
  Paper,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Button,
} from "@mui/material";
import useStore from "../../shared/hooks/useStore";
import useSonoranWebSocket from "../hooks/useSonoranWebSocket";
import { FrequencyConfig } from "../../config";

const getFrequencies = (frequencies: FrequencyConfig[]) => {
  return frequencies.map((frequency: FrequencyConfig, i) => {
    return (
      <MenuItem key={i} value={i}>
        {frequency.name}
      </MenuItem>
    );
  });
};

const Channels = () => {
  const { config } = useStore();
  const sonoranWebSocket = useSonoranWebSocket();
  const [mainChannel, setMainChannel] = React.useState<number>(0);
  const [scanChannels, setScanChannels] = React.useState<number[]>([]);
  const [scanActive, setScanActive] = React.useState<boolean>(false);

  const onMainChannelChange = (channel: number) => {
    sonoranWebSocket.send(
      JSON.stringify({
        type: "set_frequencies",
        freq_recv: config.frequencies[channel].recv,
        freq_xmit: config.frequencies[channel].xmit,
      })
    );
    setMainChannel(channel);
  };

  const onScanChannelsChange = (channels: number[]) => {
    sonoranWebSocket.send(
      JSON.stringify({
        type: "set_frequencies_scanned",
        freqs: channels.map((channel) => config.frequencies[channel].recv),
      })
    );
    setScanChannels(channels);
  };

  const onScanActiveChange = (active: boolean) => {
    sonoranWebSocket.send(
      JSON.stringify({
        type: "set_scanning_enabled",
        enabled: active,
      })
    );
    setScanActive(active);
  };

  React.useEffect(() => {
    sonoranWebSocket.addEventListener("open", () => {
      onMainChannelChange(mainChannel);
      onScanChannelsChange(scanChannels);
      onScanActiveChange(scanActive);
    });
  }, []);

  return (
    <Paper variant="outlined" sx={{ width: "100%" }}>
      <Typography variant="h6" sx={{ ml: 1 }}>
        Frequencies
      </Typography>
      <Stack direction="row">
        <FormControl sx={{ width: 0.3, m: 1, mr: 0.5 }}>
          <InputLabel id="main-select-label">Main</InputLabel>
          <Select
            label="Main"
            labelId="main-select-label"
            value={mainChannel}
            onChange={(e) => onMainChannelChange(e.target.value as number)}
          >
            {getFrequencies(config.frequencies)}
          </Select>
        </FormControl>
        <FormControl sx={{ width: 0.6, m: 1, ml: 0.5, mr: 0.5 }}>
          <InputLabel id="scan-select-label">Scan</InputLabel>
          <Select
            label="Scan"
            labelId="scan-select-label"
            multiple
            value={scanChannels}
            onChange={(e) => onScanChannelsChange(e.target.value as number[])}
          >
            {getFrequencies(config.frequencies)}
          </Select>
        </FormControl>
        <Button
          sx={{ width: 0.1, m: 1.2, ml: 0.5 }}
          variant="contained"
          color={scanActive ? "secondary" : "primary"}
          onClick={() => onScanActiveChange(!scanActive)}
        >
          SCAN
        </Button>
      </Stack>
    </Paper>
  );
};

export default Channels;
