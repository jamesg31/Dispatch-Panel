import Store from "electron-store";
import locations from "./configs/locations.json";
import postals from "./configs/postals.json";

export const CONFIG_VERSION = "0.2.4";
export const LOCATIONS_VERSION = "0.2.4";
export const POSTALS_VERSION = "0.3.2";
export const SETTINGS_VERSION = "0.3.3";
export const STATE_VERSION = "0.3.3";

export type ConfigSchemaType = {
  config: ConfigType;
  version: string;
};

export type ConfigType = {
  frequencies: FrequencyConfig[];
  icons: IconConfig[];
};

export type LocationsSchemaType = {
  config: LocationConfig[];
  version: string;
};

export type PostalsSchemaType = {
  config: PostalConfig[];
  version: string;
};

export type SettingsSchemaType = {
  config: SettingsType;
  version: string;
};

export type SettingsType = {
  theme: "dark" | "light";
  sonoranWebSocketUrl: string;
  frequenciesSection: boolean;
  transmitLogSection: boolean;
  showTransmitLogIcons: boolean;
  showTransmitLogLocations: boolean;
  showTransmitLogPostals: boolean;
  showTransmitLogTimestamps: boolean;
  autoUpdate: boolean;
};

export type StateSchemaType = {
  config: StateType;
  version: string;
};

export type StateType = {
  filters: FiltersConfig;
  lastWelcomeVersion: string;
};

export type FrequencyConfig = {
  name: string;
  xmit: [number, number];
  recv: [number, number];
};

export type LocationConfig = {
  name: string;
  x: number;
  y: number;
};

export type PostalConfig = {
  label: string;
  x: number;
  y: number;
};

export type IconConfig = {
  match: string;
  department: string;
};

export type FiltersConfig = {
  canHear: boolean;
};

const configStore = new Store<ConfigSchemaType>({
  name: "config",
  defaults: {
    version: CONFIG_VERSION,
    config: {
      frequencies: [],
      icons: [],
    },
  },
});

const locationsStore = new Store<LocationsSchemaType>({
  name: "locations",
  defaults: locations,
});

const postalStore = new Store<PostalsSchemaType>({
  name: "postals",
  defaults: postals,
});

const settingsStore = new Store<SettingsSchemaType>({
  name: "settings",
  defaults: {
    version: SETTINGS_VERSION,
    config: {
      theme: "dark",
      sonoranWebSocketUrl: "ws://[::1]:33802",
      frequenciesSection: true,
      transmitLogSection: true,
      showTransmitLogIcons: true,
      showTransmitLogLocations: true,
      showTransmitLogPostals: true,
      showTransmitLogTimestamps: true,
      autoUpdate: true,
    },
  },
});

const stateStore = new Store<StateSchemaType>({
  name: "state",
  defaults: {
    version: STATE_VERSION,
    config: {
      filters: {
        canHear: true,
        lastWelcomeVersion: "",
      },
    },
  },
});

export { configStore, locationsStore, postalStore, settingsStore, stateStore };
