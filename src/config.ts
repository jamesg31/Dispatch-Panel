import Store from "electron-store";

export type ConfigSchemaType = {
  config: ConfigType;
};

export type ConfigType = {
  frequencies: FrequencyConfig[];
  locations: LocationConfig[];
};

export type SettingsSchemaType = {
  config: SettingsType;
};

export type SettingsType = {
  theme: "dark" | "light";
  sonoronWebSocketUrl: string;
  frequenciesSection: boolean;
  transmitLogSection: boolean;
};

export type StateSchemaType = {
  config: StateType;
};

export type StateType = {
  filters: FiltersConfig;
};

export type FrequencyConfig = {
  name: string;
  xmit: Array<number>;
  recv: Array<number>;
};

export type LocationConfig = {
  name: string;
  x: number;
  y: number;
};

export type FiltersConfig = {
  canHear: boolean;
};

const configStore = new Store<ConfigSchemaType>({
  name: "config",
  defaults: {
    config: {
      frequencies: [
        {
          name: "Statewide Dispatch",
          xmit: [150, 0],
          recv: [30, 0],
        },
        {
          name: "Los Santos Dispatch",
          xmit: [150, 500],
          recv: [30, 500],
        },
        {
          name: "Blaine County Dispatch",
          xmit: [150, 250],
          recv: [30, 250],
        },
        {
          name: "Tac 1",
          xmit: [150, 750],
          recv: [30, 750],
        },
        {
          name: "Tac 2",
          xmit: [151, 0],
          recv: [31, 0],
        },
        {
          name: "Car-Car Alpha",
          xmit: [151, 250],
          recv: [31, 250],
        },
        {
          name: "Car-Car Bravo",
          xmit: [31, 500],
          recv: [31, 500],
        },
        {
          name: "Fire Dispatch",
          xmit: [151, 500],
          recv: [31, 750],
        },
        {
          name: "Fire Tac 1",
          xmit: [151, 750],
          recv: [32, 0],
        },
        {
          name: "Fire Tac 2",
          xmit: [152, 0],
          recv: [32, 250],
        },
        {
          name: "Fire Tac 3",
          xmit: [152, 250],
          recv: [32, 500],
        },
        {
          name: "CHC Towing",
          xmit: [152, 500],
          recv: [32, 750],
        },
        {
          name: "Dept of Corrections",
          xmit: [152, 750],
          recv: [33, 0],
        },
      ],
      locations: [
        {
          name: "Paleto Bay",
          x: -176,
          y: 6373,
        },
        {
          name: "Chiliad Mountain Wilderness",
          x: -510,
          y: 5019,
        },
        {
          name: "Braddock Pass",
          x: 2271,
          y: 5953,
        },
        {
          name: "Mount Gordo",
          x: 2823,
          y: 6013,
        },
        {
          name: "Mount Josiah",
          x: -1180,
          y: 3789,
        },
        {
          name: "Raton Canyon",
          x: -1196,
          y: 4366,
        },
        {
          name: "Mount Chiliad",
          x: 520,
          y: 5576,
        },
        {
          name: "San Chianski Mountain Range",
          x: 3215,
          y: 3128,
        },
        {
          name: "Fort Zancudo",
          x: -2143,
          y: 3067,
        },
        {
          name: "Stab City",
          x: 68,
          y: 3705,
        },
        {
          name: "Harmony",
          x: 293,
          y: 2660,
        },
        {
          name: "Boilingbroke Penitentiary",
          x: 1700,
          y: 2593,
        },
        {
          name: "Sandy Shores",
          x: 1685,
          y: 3749,
        },
        {
          name: "Grand Senora Desert",
          x: 983,
          y: 3082,
        },
        {
          name: "Grapeseed",
          x: 2289,
          y: 4846,
        },
        {
          name: "Humane Labs",
          x: 3518,
          y: 3729,
        },
        {
          name: "Redwood Lights Track",
          x: 1019,
          y: 2308,
        },
        {
          name: "Tataviam Mountains",
          x: 2050,
          y: 346,
        },
        {
          name: "SAHP HQ",
          x: 2467,
          y: -400,
        },
        {
          name: "Power Plant",
          x: 2733,
          y: 1537,
        },
        {
          name: "Great Chaparral",
          x: 176,
          y: 1914,
        },
        {
          name: "Vinewood Hills",
          x: -754,
          y: 746,
        },
        {
          name: "Pacific Bluffs",
          x: -2451,
          y: 119,
        },
        {
          name: "Vespucci",
          x: -1216,
          y: -1495,
        },
        {
          name: "Los Santos International Airport",
          x: -1100,
          y: -2695,
        },
        {
          name: "Port of Los Santos",
          x: 235,
          y: -2657,
        },
        {
          name: "Port of Los Santos",
          x: 984,
          y: -3110,
        },
        {
          name: "East Los Santos",
          x: 961,
          y: -1944,
        },
        {
          name: "South Los Santos",
          x: 171,
          y: -1750,
        },
        {
          name: "Downtown Los Santos",
          x: 79,
          y: -824,
        },
        {
          name: "Del Perro",
          x: -1589,
          y: -782,
        },
        {
          name: "Rockford Hills",
          x: -742,
          y: -253,
        },
        {
          name: "Vinewood",
          x: 286,
          y: -70,
        },
        {
          name: "Mirror Park",
          x: 1110,
          y: -505,
        },
      ],
    },
  },
});

const settingsStore = new Store<SettingsSchemaType>({
  name: "settings",
  defaults: {
    config: {
      theme: "dark",
      sonoronWebSocketUrl: "ws://[::1]:33802",
      frequenciesSection: true,
      transmitLogSection: true,
    },
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
  },
});

// for development, reset the store
// @ts-ignore
configStore.clear();
// @ts-ignore
settingsStore.clear();
// @ts-ignore
stateStore.clear();

export { configStore, settingsStore, stateStore };
