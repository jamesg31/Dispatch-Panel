import * as React from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import DepartmentIcon from "./departmentIcon";
import useSonoranWebSocket from "../hooks/useSonoranWebSocket";
import useStore from "../../shared/hooks/useStore";
import FilterMenu from "./filterMenu";

export type Log = {
  id: number;
  nickname: string;
  can_hear: boolean;
  active: boolean;
  xmit: Array<number>;
  recv: Array<number>;
  game?: Game;
};

export type Game = {
  x: number;
  y: number;
};

const TransmitLog = () => {
  const [logs, setLogs] = React.useState<Array<Log>>([]);
  const [maxHeight, setMaxHeight] = React.useState(0);
  const [canHearChecked, setCanHearChecked] = React.useState(false);
  const sonoranWebSocket = useSonoranWebSocket();
  const { config, locations, postals } = useStore();
  const listRef = React.useRef(null);
  const { height, width } = useWindowDimensions();

  const getChannel = (xmit: Array<number>): string | undefined => {
    for (const frequency of config.frequencies) {
      if (frequency.xmit[0] == xmit[0] && frequency.xmit[1] == xmit[1]) {
        return frequency.name;
      }
    }
  };

  const getLocation = (x: number, y: number): string => {
    let closestLocation;
    let closestDistance;
    for (const location of locations) {
      let distance = Math.sqrt(
        Math.pow(x - location.x, 2) + Math.pow(y - location.y, 2)
      );
      if (distance < closestDistance || closestDistance == null) {
        closestLocation = location;
        closestDistance = distance;
      }
    }
    return closestLocation.name;
  };

  const getPostal = (x: number, y: number): string => {
    let closestPostal;
    let closestDistance;
    for (const postal of postals) {
      let distance = Math.sqrt(
        Math.pow(x - postal.x, 2) + Math.pow(y - postal.y, 2)
      );
      if (distance < closestDistance || closestDistance == null) {
        closestPostal = postal;
        closestDistance = distance;
      }
    }
    return closestPostal.label;
  };

  const onSonoranWebSocketMessage = React.useCallback((event: MessageEvent) => {
    let data = JSON.parse(event.data);
    // if message type client_xmit_change
    if (data.type == "client_xmit_change") {
      if (data.xmit_type == "unit_talk_permit") {
        setLogs((prevLogs) => {
          const newLog = {
            id: data.client.id,
            nickname: data.client.nickname,
            can_hear: data.can_hear,
            active: true,
            xmit: data.client.state.freq_xmit,
            recv: data.client.state.freq_recv,
            game: data.client.state.game
              ? {
                  x: data.client.state.game.position[0],
                  y: data.client.state.game.position[1],
                }
              : undefined,
          };
          const updatedLogs = [newLog, ...prevLogs.slice(0, 49)];
          return updatedLogs;
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
    setMaxHeight(height - top - 9);
  }, [height]);

  React.useEffect(() => {
    sonoranWebSocket.addEventListener("message", onSonoranWebSocketMessage);

    return () => {
      sonoranWebSocket.removeEventListener(
        "message",
        onSonoranWebSocketMessage
      );
    };
  }, [sonoranWebSocket]);
  return (
    <Paper variant="outlined" sx={{ width: "100%" }}>
      <Stack direction="row" justifyContent="space-between" sx={{ pl: 1 }}>
        <Typography variant="h6">Transmit Log</Typography>
        <FilterMenu value={canHearChecked} onChange={setCanHearChecked} />
      </Stack>
      <List
        sx={{
          maxHeight: maxHeight,
          minHeight: maxHeight,
          overflow: "auto",
          pt: 0,
        }}
        ref={listRef}
      >
        {logs.map((log: Log, i: number) => {
          if (canHearChecked && !log.can_hear) {
            return null;
          } else {
            return (
              <ListItem key={i} sx={{ pt: 0, pb: 0, pl: 0.5, pr: 0.5 }}>
                <ListItemIcon>
                  <DepartmentIcon nickname={log.nickname} active={log.active} />
                </ListItemIcon>
                <ListItemText
                  primary={log.nickname}
                  secondary={
                    (getChannel(log.xmit) || "Unknown Channel") +
                    (log.game
                      ? " | " + getLocation(log.game.x, log.game.y) + " (" + getPostal(log.game.x, log.game.y) + ")"
                      : "")
                  }
                  sx={{
                    color: log.active ? "secondary.main" : "text.primary",
                  }}
                />
              </ListItem>
            );
          }
        })}
      </List>
    </Paper>
  );
};

export default TransmitLog;
