import { Link } from "react-router-dom";

import {

    FaEye,

    FaEdit,

    FaTrash

} from "react-icons/fa";

import ProjectStatus from "./ProjectStatus";

export default function ProjectRow({

    project,

    onDelete

}) {

    return (

        <tr>

            <td>{project.name}</td>

            <td>{project.description}</td>

            <td>

                <ProjectStatus
                    status={project.status}
                />

            </td>

            <td>

                {new Date(project.created_at).toLocaleDateString()}

            </td>

            <td className="actions">

                <Link to={`/projects/${project.id}`}>

                    <FaEye />

                </Link>

                <Link to={`/projects/${project.id}/edit`}>

                    <FaEdit />

                </Link>

                <button
                    onClick={() => onDelete(project.id)}
                >
                    <FaTrash />
                </button>

            </td>

        </tr>

    );

}