import * as React from "react";
import {
  communicationsIcon,
  fireIcon,
  lspdIcon,
  bcsoIcon,
  sahpIcon,
  unknownIcon,
} from "./icons/departments";
import { SvgIcon } from "@mui/material";
import useStore from "../../shared/hooks/useStore";

const DepartmentIcon = (props: { nickname: string; active: boolean }) => {
  const { config } = useStore();

  const getIcon = (nickname: string): JSX.Element => {
    for (const icon of config.icons) {
      if (nickname.match(icon.match) != null) {
        if (icon.department == "Communications") return communicationsIcon();
        else if (icon.department == "Fire") return fireIcon();
        else if (icon.department == "LSPD") return lspdIcon();
        else if (icon.department == "BCSO") return bcsoIcon();
        else if (icon.department == "SAHP") return sahpIcon();
        else {
          console.warn(
            "No icon for department: " +
              icon.department +
              ", available departments are (Communications, Fire, LSPD, BCSO, and SAHP)"
          );
          return unknownIcon();
        }
      }
    }
    return unknownIcon();
  };

  if (props.active) {
    return <SvgIcon color="secondary">{getIcon(props.nickname)}</SvgIcon>;
  } else {
    return <SvgIcon>{getIcon(props.nickname)}</SvgIcon>;
  }
};

export default DepartmentIcon;
