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
  const [mainChannel, setMainChannel] = React.useState<number>(0);
  const [scanChannels, setScanChannels] = React.useState<number[]>([]);
  const [scanActive, setScanActive] = React.useState<boolean>(false);

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
            onChange={(e) => setMainChannel(e.target.value as number)}
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
            onChange={(e) => setScanChannels(e.target.value as number[])}
          >
            {getFrequencies(config.frequencies)}
          </Select>
        </FormControl>
        <Button
          sx={{ width: 0.1, m: 1.2, ml: 0.5 }}
          variant="contained"
          color={scanActive ? "secondary" : "primary"}
          onClick={() => setScanActive(!scanActive)}
        >
          SCAN
        </Button>
      </Stack>
    </Paper>
  );
};

export default Channels;
