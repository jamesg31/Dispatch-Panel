import { createRoot } from "react-dom/client";
import Theme from "../shared/components/theme";
import { SonoranWebSocketProvider } from "./context/sonoranWebSocketContext";
import { StoreContextProvider } from "../shared/context/storeContext";
import ConfiguredApp from "./components/configuredApp";

declare global {
  interface Window {
    electron: {
      store: {
        get: (store: string, key: string) => any;
        set: (store: string, key: string, val: any) => void;
      };
      reload: () => void;
    };
  }
}

const App = () => {
  return (
    <StoreContextProvider>
      <SonoranWebSocketProvider>
        <Theme>
          <ConfiguredApp />
        </Theme>
      </SonoranWebSocketProvider>
    </StoreContextProvider>
  );
};

// get the root element
const root = createRoot(document.getElementById("root"));
root.render(<App />);
