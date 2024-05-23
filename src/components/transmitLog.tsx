import * as React from "react";
import { VariableSizeList as List } from "react-window";
import Box from "@mui/material/Box";

export type Log = {
  id: number;
  nickname: string;
  can_hear: boolean;
  active: boolean;
};

const getItemSize = (index: number) => 20;

export default function TransmitLog(props: { logs: Array<Log> }) {
  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => (
    <div style={style}>
      {props.logs[props.logs.length - (index + 1)].active
        ? "Active"
        : "Inactive"}{" "}
      :{props.logs[props.logs.length - (index + 1)].nickname}
    </div>
  );

  return (
    <Box>
      <List
        height={150}
        itemCount={props.logs.length}
        itemSize={getItemSize}
        width={300}
      >
        {Row}
      </List>
    </Box>
  );
}
