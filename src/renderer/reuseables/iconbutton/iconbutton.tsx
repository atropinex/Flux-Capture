import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './iconbutton.module.css';

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
    label: string;
    icon: ReactNode;
    variant?: 'nav' | 'control';
    tone?: 'default' | 'danger';
    active?: boolean;
};

export default function IconButton({label, icon, variant = 'nav', tone = 'default', active = false, ...rest}: Props) {
    const className = [
        styles.btn,
        styles[variant],
        tone === 'danger' && styles.danger,
        active && styles.active,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <button className={className} data-tooltip={label} aria-label={label} {...rest}>
            {icon}
        </button>
    );
}