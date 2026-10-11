import { app, BrowserWindow, Menu, ipcMain } from 'electron';
import { loadBounds, trackBounds, WINDOW } from './windowstate';
import path from 'node:path';

function createWindow() {
    const win = new BrowserWindow({
        ...loadBounds(),
        minWidth: WINDOW.minWidth,
        minHeight: WINDOW.minHeight,
        frame: false,
        transparent: true,
        backgroundColor: '#00000000',
        hasShadow: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.cjs'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    trackBounds(win);

    win.webContents.on('did-fail-load', (_e, code, desc, url) => {
        console.error('Failed to load:', code, desc, url);
    });
    win.webContents.on('preload-error', (_e, preloadPath, error) => {
        console.error('Preload error:', preloadPath, error);
    });

    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        win.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
        if (process.env.DEVTOOLS === '1') {
            win.webContents.openDevTools({ mode: 'detach' });
        }
    } else {
        win.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
    }
}

app.whenReady().then(() => {
    Menu.setApplicationMenu(null);
    createWindow();

    ipcMain.on('window:minimize', (e) => BrowserWindow.fromWebContents(e.sender)?.minimize());
    ipcMain.on('window:close', (e) => BrowserWindow.fromWebContents(e.sender)?.close());

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});