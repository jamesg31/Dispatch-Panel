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
  Switch,
} from "@mui/material";
import useStore from "../../shared/hooks/useStore";
import { SettingsType } from "../../config";
import pjson from "../../../package.json";

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
        <FormLabel sx={{ mt: 1 }}>Auto Update</FormLabel>
        <FormControlLabel
          control={
            <Switch
              checked={selectedSettings.autoUpdate}
              onChange={(e) => {
                setSelectedSettings({
                  ...selectedSettings,
                  autoUpdate: e.target.checked,
                });
              }}
            />
          }
          label={`${
            selectedSettings.autoUpdate ? "Enabled" : "Disabled"
          } (Current: v${pjson.version})`}
        />
      </FormControl>
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
        <FormLabel>Enabled Transmit Log Features</FormLabel>
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedSettings.showTransmitLogIcons}
              onChange={(e) => {
                setSelectedSettings({
                  ...selectedSettings,
                  showTransmitLogIcons: e.target.checked,
                });
              }}
            />
          }
          label="Icons"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedSettings.showTransmitLogLocations}
              onChange={(e) => {
                setSelectedSettings({
                  ...selectedSettings,
                  showTransmitLogLocations: e.target.checked,
                });
              }}
            />
          }
          label="Locations"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedSettings.showTransmitLogPostals}
              onChange={(e) => {
                setSelectedSettings({
                  ...selectedSettings,
                  showTransmitLogPostals: e.target.checked,
                });
              }}
            />
          }
          label="Postals"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedSettings.showTransmitLogTimestamps}
              onChange={(e) => {
                setSelectedSettings({
                  ...selectedSettings,
                  showTransmitLogTimestamps: e.target.checked,
                });
              }}
            />
          }
          label="Timestamps"
        />
      </FormControl>
      <FormControl>
        <FormLabel sx={{ mb: 1 }}>Sonoran Websocket URL</FormLabel>
        <TextField
          sx={{ pr: 1 }}
          variant="outlined"
          value={selectedSettings.sonoranWebSocketUrl}
          onChange={(e) =>
            setSelectedSettings({
              ...selectedSettings,
              sonoranWebSocketUrl: e.target.value,
            })
          }
        />
      </FormControl>
      <Button onClick={onSave}>Save</Button>
    </Stack>
  );
};

export default Settings;
