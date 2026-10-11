import type { ReactNode } from 'react';
import type { ViewId } from '../../app';
import { BoltIcon, RecordIcon, ProfilesIcon, ScenesIcon, SettingsIcon } from '../../../reuseables/icons';

type Item = { id: ViewId; label: string; icon: ReactNode };

const top: Item[] = [
    { id: 'record', label: 'Record', icon: <RecordIcon /> },
    { id: 'profiles', label: 'Profiles', icon: <ProfilesIcon /> },
    { id: 'scenes', label: 'Scenes', icon: <ScenesIcon /> },
];

const bottom: Item[] = [{ id: 'settings', label: 'Settings', icon: <SettingsIcon /> }];

type Props = { active: ViewId; onChange: (id: ViewId) => void };

export default function Sidebar({ active, onChange }: Props) {
    const renderItems = (items: Item[]) => (
        <nav>
            {items.map((item) => (
                <button
                    key={item.id}
                    className={`nav-btn${active === item.id ? ' active' : ''}`}
                    data-tooltip={item.label}
                    aria-label={item.label}
                    onClick={() => onChange(item.id)}
                >
                    {item.icon}
                </button>
            ))}
        </nav>
    );

    return (
        <aside className="sidebar">
            <div className="brand" aria-hidden="true">
                <BoltIcon />
            </div>
            {renderItems(top)}
            <div className="spacer" />
            {renderItems(bottom)}
        </aside>
    );
}