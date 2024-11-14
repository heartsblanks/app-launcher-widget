const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 300,
    height: 600,
    x: 1280, // Positioning on the right side
    y: 100,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // For secure data handling
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('open-apps', (event, category) => {
  const appsToOpen = getAppsForCategory(category);
  appsToOpen.forEach(app => {
    // Use Node.js to open apps or URLs; examples:
    if (app.type === 'app') {
      require('child_process').exec(`open "${app.path}"`);
    } else if (app.type === 'website') {
      require('electron').shell.openExternal(app.url);
    }
  });
});

function getAppsForCategory(category) {
  // Define apps based on category
  if (category === 'on-call') {
    return [
      { type: 'app', path: '/path/to/your/on-call-app.exe' },
      { type: 'website', url: 'https://on-call-tool.com' }
    ];
  } else if (category === 'regular') {
    return [
      { type: 'app', path: '/path/to/your/regular-app.exe' },
      { type: 'website', url: 'https://regular-tool.com' }
    ];
  }
  return [];
}
