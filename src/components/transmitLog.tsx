import * as React from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import DepartmentIcon from "./departmentIcon";
import { SonoronWebSocketContext } from "../context/sonoronWebSocketContext";

export type Log = {
  id: number;
  nickname: string;
  can_hear: boolean;
  active: boolean;
};

export default function TransmitLog() {
  const [logs, setLogs] = React.useState<Array<Log>>([]);
  const [maxHeight, setMaxHeight] = React.useState(0);
  const sonoronWebSocket = React.useContext(SonoronWebSocketContext);
  const listRef = React.useRef(null);
  const { height, width } = useWindowDimensions();

  const onSonoronWebSocketMessage = (event: MessageEvent) => {
    let data = JSON.parse(event.data);
    // if message type client_xmit_change
    if (data.type == "client_xmit_change") {
      if (data.xmit_type == "unit_talk_permit") {
        setLogs((prevLogs) => {
          return [
            {
              id: data.client.id,
              nickname: data.client.nickname,
              can_hear: data.can_hear,
              active: true,
            },
            ...prevLogs,
          ];
        });
      } else if (data.xmit_type == "unit_squelch") {
        setLogs((prevLogs) =>
          prevLogs.map((log) =>
            log.id === data.client.id ? { ...log, active: false } : log
          )
        );
      }
    }
  };

  React.useEffect(() => {
    const top = listRef.current.getBoundingClientRect().top;
    setMaxHeight(height - top - 24);
  }, [height]);

  React.useEffect(() => {
    sonoronWebSocket.addEventListener("message", onSonoronWebSocketMessage);

    return () => {
      sonoronWebSocket.removeEventListener(
        "message",
        onSonoronWebSocketMessage
      );
    };
  }, []);

  return (
    <List
      style={{ maxHeight: maxHeight, width: "100%", overflow: "auto" }}
      ref={listRef}
    >
      {logs.map((log: Log, i: number) => (
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
