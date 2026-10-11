export {};

declare global {
    interface Window {
        api: {
            platform: NodeJS.Platform;
            minimize: () => void;
            close: () => void;
        };
    }
}