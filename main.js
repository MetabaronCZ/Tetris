/* eslint @typescript-eslint/explicit-function-return-type: "off" */
const { app, BrowserWindow } = require('electron');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 700,
        height: 800,
        show: false,
        resizable: false,
        useContentSize: true,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.setMenuBarVisibility(false);

    win.loadFile('./dist/index.html');

    // win.maximize();
    win.show();

    // win.webContents.openDevTools({ mode: 'right' });
};

app.on('ready', createWindow);
