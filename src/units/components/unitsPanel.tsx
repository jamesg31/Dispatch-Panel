import { Box, Stack, Paper, Typography } from "@mui/material";
import UnitsList from "./unitsList";
import ManageUnits from "./manageUnits";

const UnitsPanel = () => {
  return (
    <Box sx={{ p: 1 }}>
      <Stack direction="row">
        <Paper variant="outlined" sx={{ width: 1 }}>
          <UnitsList />
        </Paper>
        <Paper variant="outlined" sx={{ width: 1, ml: 1 }}>
          <ManageUnits />
        </Paper>
      </Stack>
    </Box>
  );
};

export default UnitsPanel;
