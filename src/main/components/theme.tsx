import * as React from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import useStore from "../hooks/useStore";

const Theme = (props: React.PropsWithChildren) => {
  const { settings } = useStore();
  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          mode: settings.theme,
        },
      })}
    >
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
};

export default Theme;
