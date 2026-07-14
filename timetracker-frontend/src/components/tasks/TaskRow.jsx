import { Link } from "react-router-dom";

import {
    FaEdit,
    FaTrash

} from "react-icons/fa";

export default function TaskRow({

    task,

    onDelete

}) {

    return (

        <tr>

            <td>{task.title}</td>

            <td>{task.project_name}</td>

            <td>

                <span className={`status ${task.status.toLowerCase()}`}>

                    {task.status}

                </span>

            </td>

            <td>{task.priority}</td>

            <td>

                {task.due_date
                    ? new Date(task.due_date).toLocaleDateString()
                    : "-"}

            </td>

            <td className="actions-task">

                <Link
                    
                    to={`/tasks/${task.id}/edit`}
                >
                    <FaEdit />
                </Link>

                <button
                    
                    onClick={() => onDelete(task.id)}
                >
                    <FaTrash />
                </button>

            </td>

        </tr>

    );

}