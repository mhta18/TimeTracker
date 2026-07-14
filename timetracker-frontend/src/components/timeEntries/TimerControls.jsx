export default function TimerControls({ status, taskId, onAction }) {
    return (
        <div className="timer-controls">
            {(!status || status === "paused" || status === "stopped") && (
                <button className="btn btn-start" onClick={() => onAction("start", taskId)}>
                    Start
                </button>
            )}

            {status === "running" && (
                <>
                    <button className="btn btn-pause" onClick={() => onAction("pause", taskId)}>
                        Pause
                    </button>
                    <button className="btn btn-stop" onClick={() => onAction("stop", taskId)}>
                        Stop
                    </button>
                </>
            )}
        </div>
    );
}