// import "./TimerHistory.css";


import {

    FaPlay,
    FaTrash

} from "react-icons/fa";

export default function TimerHistory({ entries,onResume,onDelete }) {

    return (
        <div className="timer-history-container">
            <h3>Recent Time Entries</h3>
            <table className="history-table">
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Date</th>
                        <th>Duration</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="empty-row">No recent entries found</td>
                        </tr>
                    ) : (
                        entries.map((entry) => (
                            <tr key={entry.id}>
                                <td>{entry.task_title}</td>
                                <td>{new Date(entry.created_at).toLocaleDateString()}</td>
                                <td>{entry.total_duration}s</td>
                                <td>
                                    <span className="status-completed">
                                        {entry.status || "-"}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-timer">
                                        <button
                                            className="delete-btn"
                                            onClick={() => onDelete(entry.id)}
                                            title="Delete entry"
                                        >
                                            <FaTrash />
                                        </button>
                                        {entry.status === "paused" && (
                                            <button
                                                className="resume-btn"
                                                onClick={() => onResume(entry.task_id)}
                                                title="Resume tracking"
                                            >
                                                <FaPlay />
                                            </button>
                                        )}

                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}