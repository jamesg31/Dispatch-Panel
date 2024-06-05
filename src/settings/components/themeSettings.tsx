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

const ThemeSettings = () => {
  const { settings } = useStore();

  return (
    <Stack spacing={1} sx={{ pl: 1 }} direction={"column"}>
      <FormControl>
        <FormLabel>Theme</FormLabel>
        <RadioGroup name="theme" row>
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
      <TextField label="Sonoron Websocket URL" variant="outlined" />
      <Button>Save</Button>
    </Stack>
  );
};

export default ThemeSettings;
