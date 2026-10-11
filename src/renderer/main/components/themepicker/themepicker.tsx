import {themes} from "../../../theme/theme";
import { useTheme } from '../../../theme/themecontext';
import styles from './themepicker.module.css';

export default function ThemePicker() {
    const { theme, setTheme } = useTheme();

    return (
        <div className={styles.grid}>
            {themes.map((t) => (
                <button
                    key={t.id}
                    className={`${styles.card}${theme === t.id ? ' ' + styles.selected : ''}`}
                    onClick={() => setTheme(t.id)}
                    aria-label={t.label}
                    aria-pressed={theme === t.id}
                >
                    <span className={styles.swatch} style={{ background: t.swatch }} />
                    <span className={styles.name}>{t.label}</span>
                </button>
            ))}
        </div>
    );
}