const {app, BrowserWindow, screen } = require('electron')
const path = require('path')
const isDev = require("electron-is-dev");

function createWindow () {
  // Create the browser window.
  var dim = screen.getPrimaryDisplay();

  var w = Math.floor(dim.size.width/1.5);
  var h = Math.floor(dim.size.height/1.5);
  var win = new BrowserWindow({width: w, height: h})

  // and load the index.html of the app
  win.loadURL(isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`
  );

  if (isDev) {
    win.webContents.openDevTools();
  }
}

app.on('ready', createWindow)
