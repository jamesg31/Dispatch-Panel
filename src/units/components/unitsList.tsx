import * as React from "react";
import {
  Box,
  TextField,
  Typography,
  Stack,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import useSonoranWebSocket from "../../shared/hooks/useSonoranWebSocket";
import useWindowDimensions from "../../shared/hooks/useWindowDimensions";

const UnitsList = () => {
  const [maxHeight, setMaxHeight] = React.useState(0);
  const sonoranWebSocket = useSonoranWebSocket();
  const listRef = React.useRef(null);
  const { height } = useWindowDimensions();

  React.useEffect(() => {
    const top = listRef.current.getBoundingClientRect().top;
    setMaxHeight(height - top - 17);
  }, [height]);

  return (
    <Stack spacing={1} sx={{ pl: 1, pr: 1, pb: 1 }}>
      <Typography variant="h6">Units</Typography>
      <TextField label="Search Units" variant="outlined" size="small" />
      <Box sx={{ maxHeight: maxHeight, overflowY: "scroll" }} ref={listRef}>
        <Box>
          <FormControlLabel label="Statewide Dispatch" control={<Checkbox />} />
          <Box sx={{ ml: 3 }}>
            <FormControlLabel label="James G. C-502" control={<Checkbox />} />
            <FormControlLabel label="James G. C-502" control={<Checkbox />} />
            <FormControlLabel label="James G. C-502" control={<Checkbox />} />
          </Box>
        </Box>
        <Box>
          <FormControlLabel label="Fire Dispatch" control={<Checkbox />} />
          <Box sx={{ ml: 3 }}>
            <FormControlLabel label="James G. C-502" control={<Checkbox />} />
            <FormControlLabel label="James G. C-502" control={<Checkbox />} />
            <FormControlLabel label="James G. C-502" control={<Checkbox />} />
          </Box>
        </Box>
        <Box>
          <FormControlLabel
            label="Los Santos Dispatch"
            control={<Checkbox />}
          />
          <Box sx={{ ml: 3 }}>
            <FormControlLabel label="James G. C-502" control={<Checkbox />} />
            <FormControlLabel label="James G. C-502" control={<Checkbox />} />
            <FormControlLabel label="James G. C-502" control={<Checkbox />} />
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};
export default UnitsList;
