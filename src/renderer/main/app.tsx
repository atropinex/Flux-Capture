import { useState } from 'react';
import Sidebar from './components/sidebarview/sidebar';
import TitleBar from './components/titlebarview/titlebar';
import RecordView from './components/recordview/recordview';
import Placeholder from './components/placeholderview/placeholders';
import ThemePicker from './components/themepicker/themepicker';
import styles from './app.module.css';

export type ViewId = 'record' | 'profiles' | 'scenes' | 'settings';

export default function App() {
    const [view, setView] = useState<ViewId>('record');

    return (
        <div className={styles.frame}>
            <div className={styles.island}>
                <div className={styles.column}>
                    <TitleBar />
                </div>
            </div>
        </div>
    );
}