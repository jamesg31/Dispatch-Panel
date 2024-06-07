import { createRoot } from "react-dom/client";
import Theme from "../shared/components/theme";
import { SonoronWebSocketProvider } from "./context/sonoronWebSocketContext";
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
      <SonoronWebSocketProvider>
        <Theme>
          <ConfiguredApp />
        </Theme>
      </SonoronWebSocketProvider>
    </StoreContextProvider>
  );
};

// get the root element
const root = createRoot(document.getElementById("root"));
root.render(<App />);
