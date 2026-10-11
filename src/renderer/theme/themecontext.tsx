import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { DEFAULT_THEME, themes } from './theme';

type Ctx = { theme: string; setTheme: (id: string) => void };

const ThemeContext = createContext<Ctx>({ theme: DEFAULT_THEME, setTheme: () => {} });

function loadSaved(): string {
    try {
        const saved = localStorage.getItem('theme');
        if (saved && themes.some((t) => t.id === saved)) return saved;
    } catch {}
    return DEFAULT_THEME;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState(loadSaved);

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        try {
            localStorage.setItem('theme', theme);
        } catch {}
    }, [theme]);

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);