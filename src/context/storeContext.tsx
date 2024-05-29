import * as React from "react";
import { ConfigType, SettingsType, StateType } from "../config";

type Store = {
  config: ConfigType;
  settings: SettingsType;
  state: StateType;
  setConfig: (config: ConfigType) => void;
  setSettings: (settings: SettingsType) => void;
  setState: (state: StateType) => void;
};

export const StoreContext = React.createContext<Store>(null);

export const StoreContextProvider = (props: React.PropsWithChildren) => {
  const setConfig = (config: ConfigType) => {
    setStore((prev) => ({ ...prev, config }));
    window.electron.store.set("config", "config", config);
  };

  const setSettings = (settings: SettingsType) => {
    setStore((prev) => ({ ...prev, settings }));
    window.electron.store.set("settings", "config", settings);
  };

  const setState = (state: StateType) => {
    setStore((prev) => ({ ...prev, state }));
    window.electron.store.set("state", "config", state);
  };

  const [store, setStore] = React.useState<Store>({
    config: null,
    settings: null,
    state: null,
    setConfig: setConfig,
    setSettings: setSettings,
    setState: setState,
  });

  React.useEffect(() => {
    window.electron.store.get("config", "config").then((config: ConfigType) => {
      setStore((prev) => ({ ...prev, config }));
    });
    window.electron.store
      .get("settings", "config")
      .then((settings: SettingsType) => {
        setStore((prev) => ({ ...prev, settings }));
      });
    window.electron.store.get("state", "config").then((state: StateType) => {
      setStore((prev) => ({ ...prev, state }));
    });
  }, []);

  return (
    <StoreContext.Provider value={store}>
      {store.config && store.settings && store.state ? (
        <React.Fragment>{props.children}</React.Fragment>
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </StoreContext.Provider>
  );
};
