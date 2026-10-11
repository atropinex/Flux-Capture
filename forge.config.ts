import type { ForgeConfig } from '@electron-forge/shared-types';
import { VitePlugin } from '@electron-forge/plugin-vite';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';

const config: ForgeConfig = {
    packagerConfig: {
        name: 'Flux-Capture',
        // icon: './assets/icon', // uncomment once assets/icon.ico exists (no extension in the path)
    },
    makers: [
        new MakerSquirrel({ name: 'FluxCapture' }),
        new MakerZIP({}, ['win32']),
    ],
    plugins: [
        new VitePlugin({
            build: [
                { entry: 'src/main/main.ts', config: 'vite.main.config.ts', target: 'main' },
                { entry: 'src/main/preload.ts', config: 'vite.preload.config.ts', target: 'preload' },
            ],
            renderer: [{ name: 'main_window', config: 'vite.renderer.config.ts' }],
        }),
    ],
};

export default config;