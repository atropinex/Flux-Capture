import { app, screen, type BrowserWindow } from 'electron';
import fs from 'node:fs';
import path from 'node:path';

// The only numbers to tweak
export const WINDOW = {
    widthRatio: 0.7,   // 70% of the screen's usable width
    heightRatio: 0.75, // 75% of the usable height
    minWidth: 900,
    minHeight: 600,
};

type Bounds = { x?: number; y?: number; width: number; height: number };

const stateFile = () => path.join(app.getPath('userData'), 'window-state.json');

export function loadBounds(): Bounds {
    const { width: sw, height: sh } = screen.getPrimaryDisplay().workAreaSize;

    const fallback: Bounds = {
        width: Math.max(WINDOW.minWidth, Math.round(sw * WINDOW.widthRatio)),
        height: Math.max(WINDOW.minHeight, Math.round(sh * WINDOW.heightRatio)),
    };

    try {
        const saved = JSON.parse(fs.readFileSync(stateFile(), 'utf8')) as Bounds;
        if (typeof saved.width !== 'number' || typeof saved.height !== 'number') return fallback;

        // Only reuse the saved position if it's still on a connected display
        const onScreen = screen.getAllDisplays().some((d) => {
            const a = d.workArea;
            return (
                typeof saved.x === 'number' &&
                typeof saved.y === 'number' &&
                saved.x >= a.x && saved.y >= a.y &&
                saved.x < a.x + a.width && saved.y < a.y + a.height
            );
        });

        return onScreen ? saved : { width: saved.width, height: saved.height };
    } catch {
        return fallback; // first launch or unreadable file
    }
}

export function trackBounds(win: BrowserWindow) {
    let timer: NodeJS.Timeout | undefined;

    const save = () => {
        if (win.isMinimized() || win.isMaximized()) return;
        try {
            fs.writeFileSync(stateFile(), JSON.stringify(win.getBounds()));
        } catch {}
    };

    const queueSave = () => {
        clearTimeout(timer);
        timer = setTimeout(save, 400); // debounce while dragging
    };

    win.on('resize', queueSave);
    win.on('move', queueSave);
    win.on('close', save);
}