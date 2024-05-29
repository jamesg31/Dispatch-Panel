import * as React from "react";
import { LocationsConfig } from "../config";

export default function useLocationsConfig() {
  const [locationsConfig, setLocationsConfig] =
    React.useState<LocationsConfig[]>();

  React.useEffect(() => {
    window.electron.store
      .get("locations")
      .then((locations: LocationsConfig[]) => {
        setLocationsConfig(locations);
      });
  }, []);

  return {
    locationsConfig,
  };
}
