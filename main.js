const { app, BrowserWindow } = require('electron');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile('./dist/index.html');

    win.maximize();
    win.show();

    win.webContents.openDevTools({
        mode: 'right'
    });
};

app.on('ready', createWindow);
