import { StoreContext } from "../context/storeContext";
import * as React from "react";

const useStore = () => {
  const { config, settings, state, setConfig, setSettings, setState } =
    React.useContext(StoreContext);

  return { config, settings, state, setConfig, setSettings, setState };
};

export default useStore;
