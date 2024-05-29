import Store from "electron-store";

export type ConfigSchemaType = {
  frequencies: FrequenciesConfig[];
};

export type FrequenciesConfig = {
  name: string;
  xmit: Array<number>;
  recv: Array<number>;
};

const store = new Store<ConfigSchemaType>({
  defaults: {
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
  },
});

// for development, reset the store
// @ts-ignore
store.clear();

export default store;
