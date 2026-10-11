import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from "../theme/themecontext";
import App from './app';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </StrictMode>,
);