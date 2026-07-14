import { useState } from "react";
import TimerControls from "./TimerControls";

export default function TimerCard({ runningEntry, formattedTime, onAction, tasks = [] }) {
    const [selectedTaskId, setSelectedTaskId] = useState("");

    const isTimerActive = runningEntry && runningEntry.status === "running";

    if (!isTimerActive) {
        return (
            <div className="timer-card no-active">
                <h3>No active timer</h3>
                <p>Select a task below to start tracking your time:</p>
                <div className="task-selector-container">
                    <select
                        value={selectedTaskId}
                        onChange={(e) => setSelectedTaskId(e.target.value)}
                        className="task-select"
                    >
                        <option value="">Choose a Task</option>
                        {tasks.map(task => (
                            <option key={task.id} value={task.id}>
                                {task.title}
                            </option>
                        ))}
                    </select>
                    <button
                        className="btn btn-start"
                        disabled={!selectedTaskId}
                        onClick={() => {
                            onAction("start", selectedTaskId);
                            setSelectedTaskId("");
                        }}
                    >
                        Start Tracking
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="timer-card active">
            <div className="card-header">
                <h2>{runningEntry.task_title || "Untitled Task"}</h2>
                <span className="project-tag">
                    Project: {runningEntry.project_name || "No Project"}
                </span>
                <span className={`status-badge ${runningEntry.status}`}>
                    Status: {runningEntry.status}
                </span>
            </div>
            <hr className="divider" />
            <div className="big-timer-display">
                {formattedTime}
            </div>
            <hr className="divider" />
            <div className="controls-section">
                <TimerControls
                    status={runningEntry.status}
                    taskId={runningEntry.task_id || runningEntry.id}
                    onAction={onAction}
                />
            </div>
        </div>
    );
}