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

type Callsign = {
  match: string;
  department: string;
  icon: React.ReactElement;
};

const callsigns: Array<Callsign> = [
  {
    match: " C-",
    department: "Communications",
    icon: communicationsIcon(),
  },
  {
    match: " Z-",
    department: "Communications",
    icon: communicationsIcon(),
  },
  {
    match: " F-",
    department: "Fire",
    icon: fireIcon(),
  },
  {
    match: "2.-",
    department: "LSPD",
    icon: lspdIcon(),
  },
  {
    match: "3.-",
    department: "BCSO",
    icon: bcsoIcon(),
  },
  {
    match: "5.-",
    department: "SAHP",
    icon: sahpIcon(),
  },
];

const getDepartment = (nickname: string): Callsign | undefined => {
  for (const callsign of callsigns) {
    if (nickname.match(callsign.match) != null) {
      return callsign;
    }
  }
};

const DepartmentIcon = (props: { nickname: string; active: boolean }) => {
  const department = getDepartment(props.nickname);
  const icon = department ? department.icon : unknownIcon();
  if (props.active) {
    return <SvgIcon color="secondary">{icon}</SvgIcon>;
  } else {
    return <SvgIcon>{icon}</SvgIcon>;
  }
};

export default DepartmentIcon;
