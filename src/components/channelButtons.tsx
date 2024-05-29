import * as React from "react";
import { Button, ButtonGroup } from "@mui/material";

export default function ChannelButtons() {
  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <Button color="secondary">Channel 1</Button>
      <Button>Channel 2</Button>
      <Button>Channel 3</Button>
    </ButtonGroup>
  );
}
