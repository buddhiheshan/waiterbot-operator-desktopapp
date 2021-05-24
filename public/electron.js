const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
// const http = require("./socketServer");
const {mqtt, mqtt_ws} = require("./mqttServer");

let mainWindow;


function createWindow() {
    mainWindow = new BrowserWindow({ width: 900, height: 680 });
    mainWindow.maximize();
    mainWindow.setMenuBarVisibility(false);
    mainWindow.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );
    mainWindow.webContents.openDevTools()
    mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
        mqtt.close();
        mqtt_ws.close();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});