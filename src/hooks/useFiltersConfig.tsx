import * as React from "react";
import { FiltersConfig } from "../config";

export default function useFiltersConfig() {
  const [filtersConfig, setFiltersConfig] = React.useState<FiltersConfig>();

  React.useEffect(() => {
    window.electron.store.get("filters").then((filters: FiltersConfig) => {
      setFiltersConfig(filters);
    });
  }, []);

  React.useEffect(() => {
    window.electron.store.set("filters", filtersConfig);
  }, [filtersConfig]);

  return {
    filtersConfig,
    setFiltersConfig,
  };
}
