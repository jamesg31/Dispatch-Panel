import * as React from "react";
import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import useStore from "../../shared/hooks/useStore";
import { SettingsType } from "../../config";

const Settings = () => {
  const { settings, setSettings } = useStore();
  const [selectedSettings, setSelectedSettings] =
    React.useState<SettingsType>(settings);

  const onSave = () => {
    setSettings(selectedSettings);
    window.electron.reload();
  };

  return (
    <Stack spacing={1} sx={{ pl: 1 }} direction={"column"}>
      <FormControl>
        <FormLabel>Theme</FormLabel>
        <RadioGroup
          name="theme"
          row
          value={selectedSettings.theme}
          onChange={(e) =>
            setSelectedSettings({
              ...selectedSettings,
              theme: e.target.value as SettingsType["theme"],
            })
          }
        >
          <FormControlLabel value="dark" control={<Radio />} label="Dark" />
          <FormControlLabel value="light" control={<Radio />} label="Light" />
          <FormControlLabel
            value="system"
            disabled
            control={<Radio />}
            label="System"
          />
        </RadioGroup>
      </FormControl>
      <TextField
        label="Sonoron Websocket URL"
        variant="outlined"
        value={selectedSettings.sonoronWebSocketUrl}
        onChange={(e) =>
          setSelectedSettings({
            ...selectedSettings,
            sonoronWebSocketUrl: e.target.value,
          })
        }
      />
      <Button onClick={onSave}>Save</Button>
    </Stack>
  );
};

export default Settings;
