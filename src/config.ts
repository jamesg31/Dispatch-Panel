import Store from "electron-store";
import locations from "./configs/locations.json";
import postals from "./configs/postals.json";

export const CONFIG_VERSION = "0.2.4";
export const LOCATIONS_VERSION = "0.2.4";
export const POSTALS_VERSION = "0.3.2";
export const SETTINGS_VERSION = "0.2.4";
export const STATE_VERSION = "0.2.4";

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
  autoUpdate: boolean;
};

export type StateSchemaType = {
  config: StateType;
  version: string;
};

export type StateType = {
  filters: FiltersConfig;
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
    config: {
      frequencies: [],
      icons: [],
    },
    version: CONFIG_VERSION,
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
    config: {
      theme: "dark",
      sonoranWebSocketUrl: "ws://[::1]:33802",
      frequenciesSection: true,
      transmitLogSection: true,
      autoUpdate: true,
    },
    version: SETTINGS_VERSION,
  },
});

const stateStore = new Store<StateSchemaType>({
  name: "state",
  defaults: {
    config: {
      filters: {
        canHear: true,
      },
    },
    version: STATE_VERSION,
  },
});

export { configStore, locationsStore, postalStore, settingsStore, stateStore };
