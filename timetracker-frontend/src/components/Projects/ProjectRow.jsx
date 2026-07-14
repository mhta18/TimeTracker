import { Link } from "react-router-dom";

import {

    FaEye,

    FaEdit,

    FaTrash

} from "react-icons/fa";

export default function ProjectRow({

    project,
    user,
    onDelete

}) {


    return (

        <tr>

            <td>{project.name}</td>

            <td>{project.description}</td>

            <td>

                <span>

                    {project.status}

                </span>

            </td>

            <td>

                {new Date(project.created_at).toLocaleDateString()}

            </td>

            <td className="actions-project">

                <Link to={`/projects/${project.id}`}>

                    <FaEye />

                </Link>
                {user?.role !== "supervisor" && (
                    <Link to={`/projects/${project.id}/edit`}>

                        <FaEdit />

                    </Link>
                )}
                {user?.role !== "supervisor" && (
                    <button
                        onClick={() => onDelete(project.id)}
                    >
                        <FaTrash />
                    </button>
                )}
            </td>

        </tr>

    );

}