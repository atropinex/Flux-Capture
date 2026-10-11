import IconButton from '../../../reuseables/iconbutton/iconbutton';
import {MinimizeIcon, CloseIcon} from '../../../reuseables/icons';
import styles from './titlebar.module.css';

export default function TitleBar() {
    return (
        <header className={styles.bar}>
            <div className={styles.drag}>
                <p className={styles.titleTxt}>Flux-Capture</p>
            </div>
            <div className={styles.controls}>
                <IconButton
                    variant="control"
                    label="Minimize"
                    icon={<MinimizeIcon/>}
                    onClick={() => window.api.minimize()}
                />
                <IconButton
                    variant="control"
                    tone="danger"
                    label="Close"
                    icon={<CloseIcon/>}
                    onClick={() => window.api.close()}
                />
            </div>
        </header>
    );
}