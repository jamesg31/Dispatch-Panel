// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  store: {
    get: async (store: string, val: string) =>
      ipcRenderer.invoke("electron-store-get", store, val),
    set: (store: string, property: string, val: Object) =>
      ipcRenderer.invoke("electron-store-set", store, property, val),
  },
  reload: () => ipcRenderer.invoke("reload"),
  openConfigDir: () => ipcRenderer.invoke("open-config-dir"),
});
