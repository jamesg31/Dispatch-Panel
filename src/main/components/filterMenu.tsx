import * as React from "react";
import {
  Menu,
  MenuItem,
  Button,
  Box,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import useStore from "../hooks/useStore";

const FilterMenu = (props: { value: boolean; onChange: Function }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { state, setState } = useStore();
  const open = Boolean(anchorEl);

  const handleCanHearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.checked);
    setState({ ...state, filters: { canHear: event.target.checked } });
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button onClick={handleClick} endIcon={<KeyboardArrowDownIcon />}>
        Filters
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <FormGroup>
          <MenuItem>
            <FormControlLabel
              control={
                <Switch
                  checked={state.filters.canHear}
                  onChange={handleCanHearChange}
                />
              }
              label="Can Hear"
            />
          </MenuItem>
        </FormGroup>
      </Menu>
    </Box>
  );
};

export default FilterMenu;
