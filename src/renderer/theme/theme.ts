import './default.css';
import './dark.css';
import './midnight.css';
import './aurora.css';

export type Theme = { id: string; label: string; swatch: string };

export const themes: Theme[] = [
    { id: 'default', label: 'Default', swatch: '#121316' },
    { id: 'dark', label: 'Dark', swatch: '#121316' },
    { id: 'midnight', label: 'Midnight', swatch: 'linear-gradient(160deg, #0a0d1a, #131a3a)' },
    { id: 'aurora', label: 'Aurora', swatch: 'linear-gradient(135deg, #1b4d4a, #2a2f6b)' },
];

export const DEFAULT_THEME = 'dark';