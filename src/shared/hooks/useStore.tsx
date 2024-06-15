import { StoreContext } from "../context/storeContext";
import * as React from "react";

const useStore = () => {
  const {
    config,
    locations,
    postals,
    settings,
    state,
    setConfig,
    setLocations,
    setSettings,
    setState,
  } = React.useContext(StoreContext);

  return {
    config,
    locations,
    postals,
    settings,
    state,
    setConfig,
    setLocations,
    setSettings,
    setState,
  };
};

export default useStore;
