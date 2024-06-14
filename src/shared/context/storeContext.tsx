import * as React from "react";
import {
  ConfigType,
  SettingsType,
  LocationConfig,
  StateType,
} from "../../config";

type Store = {
  config: ConfigType;
  locations: LocationConfig[];
  settings: SettingsType;
  state: StateType;
  setConfig: (config: ConfigType) => void;
  setLocations: (locations: LocationConfig[]) => void;
  setSettings: (settings: SettingsType) => void;
  setState: (state: StateType) => void;
};

export const StoreContext = React.createContext<Store>(null);

export const StoreContextProvider = (props: React.PropsWithChildren) => {
  const setConfig = (config: ConfigType) => {
    setStore((prev) => ({ ...prev, config }));
    window.electron.store.set("config", "config", config);
  };

  const setLocations = (locations: LocationConfig[]) => {
    setStore((prev) => ({ ...prev, locations }));
    window.electron.store.set("config", "config", locations);
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
    locations: null,
    settings: null,
    state: null,
    setConfig: setConfig,
    setLocations: setLocations,
    setSettings: setSettings,
    setState: setState,
  });

  React.useEffect(() => {
    window.electron.store.get("config", "config").then((config: ConfigType) => {
      setStore((prev) => ({ ...prev, config }));
    });
    window.electron.store
      .get("locations", "config")
      .then((locations: LocationConfig[]) => {
        setStore((prev) => ({ ...prev, locations }));
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
      {store.config && store.locations && store.settings && store.state ? (
        <React.Fragment>{props.children}</React.Fragment>
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </StoreContext.Provider>
  );
};
