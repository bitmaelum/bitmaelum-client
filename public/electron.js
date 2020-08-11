const {app, BrowserWindow} = require('electron')
const path = require('path')
const isDev = require("electron-is-dev");

function createWindow () {
  // Create the browser window.
  var win = new BrowserWindow({width: 800, height: 600})

  console.log("ISDEV: " + isDev)

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
