import { createRoot } from "react-dom/client";
import Theme from "../shared/components/theme";
import { Typography, Stack, Box, Divider, Link } from "@mui/material";
import pjson from "../../package.json";
import { StoreContextProvider } from "../shared/context/storeContext";

declare global {
  interface Window {
    electron: {
      store: {
        get: (store: string, key: string) => any;
        set: (store: string, key: string, val: any) => void;
      };
      reload: () => void;
      openConfigDir: () => void;
    };
  }
}

const changelog = [
  {
    version: "0.3.3",
    date: "2024-06-17",
    changes: [
      "This welcome page! It will appear on first open and after each update.",
      "More customizable transmit logs, now inlcuding timestamps if wanted. Can be configured within the settings.",
      "Always on top option. This will attempt to force the panel to stay on top of other windows even on focus loss. Can be enabled in the settings.",
      "Reverted electron-builder to v24.9.1 to try to combat antivirus false positives.",
    ],
  },
  {
    version: "0.3.2",
    date: "2024-06-15",
    changes: ["Initial public release!"],
  },
];

const App = () => {
  return (
    <StoreContextProvider>
      <Theme>
        <Box sx={{ p: 1 }}>
          <Typography
            sx={{ textAlign: "center" }}
            variant="h5"
            fontWeight={500}
          >
            Welcome to Dispatch Panel: v{pjson.version}
          </Typography>
          <Divider sx={{ mt: 1, mb: 0.5 }} aria-hidden="true" />
          <Typography variant="h6">Need to know:</Typography>
          <Stack spacing={1}>
            <Typography>
              Welcome to Dispatch Panel! The panel will automatically connect to
              Teamspeak assuming it is open, and the Sonoran Radio plugin is
              installed.
            </Typography>
            <Typography>
              If you are missing frequencies or the correct postals please
              ensure you have your config.json and postals.json provided by your
              community installed. Configuration files should be placed{" "}
              <Link
                onClick={() => {
                  window.electron.openConfigDir();
                }}
              >
                here
              </Link>
              . Make sure to overwrite the existing files.
            </Typography>
            <Typography>
              To open the settings, use the Control + S (Windows), or Command +
              S (MacOS) keybind. This will allow you toggle auto updates, change
              your theme, configure what parts of the panel you want to see, and
              manage your Sonoran Radio connection.
            </Typography>
            <Typography>
              I hope you enjoy using the Dispatch Panel. If you have any feature
              requests, bugs, issues, general questions, or feedback on new
              features I would love to hear them. Please post them{" "}
              <Link
                href="https://github.com/jamesg31/Dispatch-Panel/issues"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </Link>
              . I am working hard to release new features and make changes
              quickly.
            </Typography>
          </Stack>
          <Divider sx={{ mt: 1, mb: 0.5 }} aria-hidden="true" />
          <Typography variant="h6">Changelog:</Typography>
          <Stack spacing={1}>
            {changelog.map((change) => (
              <Box key={change.version}>
                <Typography>
                  v{change.version} ({change.date}):
                </Typography>
                <Typography>
                  <ul style={{ margin: 0 }}>
                    {change.changes.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Theme>
    </StoreContextProvider>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
