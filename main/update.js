const { app } = require("electron");

function setupUpdates() {
  if (app.isPackaged && process.platform !== "linux") {
    require("update-electron-app")({
      repo: "bitmaelum/bitmaelum-client",
      updateInterval: "1 hour",
    });
  }
}

module.exports = {
  setupUpdates,
};
