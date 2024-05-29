import * as React from "react";
import { FrequenciesConfig } from "../config";

export default function useFrequenciesConfig() {
  const [frequenciesConfig, setFrequenciesConfig] =
    React.useState<FrequenciesConfig[]>();

  React.useEffect(() => {
    window.electron.store
      .get("frequencies")
      .then((frequencies: FrequenciesConfig[]) => {
        setFrequenciesConfig(frequencies);
      });
  }, []);

  return {
    frequenciesConfig,
  };
}
