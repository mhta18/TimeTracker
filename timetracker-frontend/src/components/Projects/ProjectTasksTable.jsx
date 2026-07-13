import { Link } from "react-router-dom";
import {
    FaEdit,
    FaTrash
} from "react-icons/fa";

import "./ProjectTasksTable.css";

export default function ProjectTasksTable({ tasks }) {
    return (
        <div className="project-tasks-card">

            <div className="card-header">
                <h3>Tasks</h3>
            </div>

            <table className="project-task-table">

                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Assigned To</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {tasks.length === 0 ? (

                        <tr>
                            <td
                                colSpan="4"
                                className="empty"
                            >
                                No tasks found.
                            </td>
                        </tr>

                    ) : (

                        tasks.map(task => (

                            <tr key={task.id}>

                                <td>{task.title}</td>

                                <td>

                                    <span
                                        className={`status ${task.status.toLowerCase().replace(/\s/g, "-")}`}
                                    >
                                        {task.status}
                                    </span>

                                </td>

                                <td>
                                    {task.assigned_username || "-"}
                                </td>

                                <td className="actions">

                                    <Link to={`/tasks/${task.id}/edit`}>
                                        <FaEdit />
                                    </Link>

                                    <button>
                                        <FaTrash />
                                    </button>

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </div>
    );
}