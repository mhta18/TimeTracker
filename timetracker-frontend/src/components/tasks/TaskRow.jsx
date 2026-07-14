import { Link } from "react-router-dom";
import {
    FaEye,
    FaEdit,
    FaTrash
} from "react-icons/fa";

export default function TaskRow({

    task,
    user,
    onDelete

}) {

    const editLink =
        user?.role === "member"
            ? `/tasks/${task.id}/status`
            : `/tasks/${task.id}/edit`;

    return (

        <tr>

            <td>{task.title}</td>

            <td>{task.project_name}</td>

            <td>
                <span className={`status ${task.status.toLowerCase()}`}>
                    {task.status}
                </span>
            </td>
            <td>
                {task.due_date
                    ? new Date(task.due_date).toLocaleDateString()
                    : "-"}
            </td>

            <td className="actions-task">

                <Link to={`/tasks/${task.id}/view`}>
                    <FaEye />
                </Link>

                <Link to={editLink}>
                    <FaEdit />
                </Link>

                {user?.role !== "member" && (
                    <button
                        onClick={() => onDelete(task.id)}
                    >
                        <FaTrash />
                    </button>
                )}

            </td>

        </tr>

    );

}