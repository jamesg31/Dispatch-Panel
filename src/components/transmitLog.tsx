import * as React from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import DepartmentIcon from "./departmentIcon";
import { SonoronWebSocketContext } from "../context/sonoronWebSocketContext";
import { FrequenciesConfig } from "../config";
import useFrequenciesConfig from "../hooks/useFrequenciesConfig";

export type Log = {
  id: number;
  nickname: string;
  can_hear: boolean;
  active: boolean;
  xmit: Array<number>;
  recv: Array<number>;
};

export default function TransmitLog() {
  const [logs, setLogs] = React.useState<Array<Log>>([]);
  const [maxHeight, setMaxHeight] = React.useState(0);
  const sonoronWebSocket = React.useContext(SonoronWebSocketContext);
  const listRef = React.useRef(null);
  const { height, width } = useWindowDimensions();
  const frequencies = useFrequenciesConfig().frequenciesConfig;

  const getChannel = (xmit: Array<number>): string | undefined => {
    for (const frequency of frequencies) {
      if (frequency.xmit[0] == xmit[0] && frequency.xmit[1] == xmit[1]) {
        return frequency.name;
      }
    }
  };

  const onSonoronWebSocketMessage = React.useCallback((event: MessageEvent) => {
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
              xmit: data.client.state.freq_xmit,
              recv: data.client.state.freq_recv,
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
  }, []);

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
        <ListItem key={i} sx={{ pt: 0, pb: 0, pl: 0.5, pr: 0.5 }}>
          <ListItemIcon>
            <DepartmentIcon nickname={log.nickname} active={log.active} />
          </ListItemIcon>
          <ListItemText
            primary={log.nickname}
            secondary={getChannel(log.xmit) || "Unknown Channel"}
            sx={{ color: log.active ? "secondary.main" : "text.primary" }}
          />
        </ListItem>
      ))}
    </List>
  );
}
