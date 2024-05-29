import * as React from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import DepartmentIcon from "./departmentIcon";

export type Log = {
  id: number;
  nickname: string;
  can_hear: boolean;
  active: boolean;
};

export default function TransmitLog(props: { logs: Array<Log> }) {
  const listRef = React.useRef(null);
  const { height, width } = useWindowDimensions();
  const [maxHeight, setMaxHeight] = React.useState(0);

  React.useEffect(() => {
    const top = listRef.current.getBoundingClientRect().top;
    setMaxHeight(height - top - 16);
  }, [height]);

  return (
    <List
      style={{ maxHeight: maxHeight, width: "100%", overflow: "auto" }}
      ref={listRef}
    >
      {props.logs.map((log: Log, i: number) => (
        <ListItem key={i}>
          <ListItemIcon>
            <DepartmentIcon nickname={log.nickname} active={log.active} />
          </ListItemIcon>
          <ListItemText
            primary={log.nickname}
            sx={{ color: log.active ? "secondary.main" : "text.primary" }}
          />
        </ListItem>
      ))}
    </List>
  );
}
