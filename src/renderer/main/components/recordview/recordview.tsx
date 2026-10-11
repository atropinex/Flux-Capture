import { useState } from 'react';
import { DotIcon, StopIcon, TimelapseIcon } from '../../../reuseables/icons';

export default function RecordView() {
    const [recording, setRecording] = useState(false);

    return (
        <section className="view active">
            <h1>Record</h1>
            <div className="preview">No source selected</div>
            <div className="controls">
                <button
                    className="icon-btn record"
                    data-tooltip={recording ? 'Stop recording' : 'Start recording'}
                    aria-label={recording ? 'Stop recording' : 'Start recording'}
                    onClick={() => setRecording((r) => !r)}
                >
                    {recording ? <StopIcon /> : <DotIcon />}
                </button>
                <button className="icon-btn" data-tooltip="Timelapse" aria-label="Timelapse">
                    <TimelapseIcon />
                </button>
            </div>
        </section>
    );
}