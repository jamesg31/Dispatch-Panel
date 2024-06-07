import * as React from "react";
import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Checkbox,
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
        <FormLabel sx={{ mt: 1 }}>Theme</FormLabel>
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
      <FormControl>
        <FormLabel>Enabled Sections</FormLabel>
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedSettings.frequenciesSection}
              onChange={(e) => {
                setSelectedSettings({
                  ...selectedSettings,
                  frequenciesSection: e.target.checked,
                });
              }}
            />
          }
          label="Frequencies"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedSettings.transmitLogSection}
              onChange={(e) => {
                setSelectedSettings({
                  ...selectedSettings,
                  transmitLogSection: e.target.checked,
                });
              }}
            />
          }
          label="Transmit Log"
        />
      </FormControl>
      <FormControl>
        <FormLabel sx={{ mb: 1 }}>Sonoron Websocket URL</FormLabel>
        <TextField
          variant="outlined"
          value={selectedSettings.sonoronWebSocketUrl}
          onChange={(e) =>
            setSelectedSettings({
              ...selectedSettings,
              sonoronWebSocketUrl: e.target.value,
            })
          }
        />
      </FormControl>
      <Button onClick={onSave}>Save</Button>
    </Stack>
  );
};

export default Settings;
