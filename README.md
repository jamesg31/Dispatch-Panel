# Dispatch Panel - a 3rd party Sonoran Radio Dispatch Panel

This project is not affiliated with Sonoran Radio, or Sonoran Software Systems, LLC. This project is licensed under the terms of the GNU General Public License Version 3 (GLP-3.0). For the full license see [COPYING](COPYING).

## Installation

### Install Dispatch Panel

**For Windows, download the file ending in .exe, for MacOS, download the file ending in .dmg.**

Download latest stable release [here](https://github.com/jamesg31/Dispatch-Panel/releases/latest).

See all releases [here](https://github.com/jamesg31/Dispatch-Panel/releases).

Run the download on your respective operating system. This install the Dispatch Panel.

### Install Configuration

To show the available channels for your community, you will need to install a config file. This will setup the correct frequencies for units. To do so, obtain a copy from someone in your community, or create one based on the example [here](/examples/config.json). Place this config in the following folder:

Windows:

- Open Run
- Enter `%APPDATA%`, click enter.
- Open the `Dispatch Panel` directory.

MacOS:

- Open Finder
- In the top bar, click `Go`, then `Library`
- Navigate to `Application Support`, then `Dispatch Panel`

### Postals

By default, the dispatch panel will use DevBlocky's new postals, which is used by a majority of FiveM communities. To change the postals, please edit the postals.json file located in the configuration folder above.

## Usage

The Dispatch Panel should automatically connect to Teamspeak 3 if it is open. If not, a banner will appear. To attempt connection again, click "Reconnect".

To open settings use the Control+S or Command+S hotkey. When done modifying settings, click save. This will reload the Dispatch Panel. Within settings, you can change between light or dark mode, hide sections of the dispatch panel, and edit your websocket connection url.
