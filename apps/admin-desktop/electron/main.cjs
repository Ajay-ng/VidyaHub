const { app, BrowserWindow } = require("electron");
const path = require("node:path");
const fs = require("node:fs");

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 900,
    title: "School Management - Admin",
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  win.webContents.on("did-fail-load", (_event, code, description, url) => {
    console.error("Failed to load:", {
      code,
      description,
      url,
    });
  });

  if (app.isPackaged) {
    const indexPath = path.join(
      process.resourcesPath,
      "admin-panel",
      "index.html",
    );

    console.log("Loading frontend:", indexPath);
    console.log("File exists:", fs.existsSync(indexPath));

    if (!fs.existsSync(indexPath)) {
      console.error("Packaged frontend index.html is missing.");
      return;
    }

    win.loadFile(indexPath);
  } else {
    win.loadURL("http://localhost:5173");
  }

  // Keep DevTools open temporarily while debugging.
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
