import { Link } from "react-router-dom";

import {
    FaEye,
    FaEdit,
    FaTrash
} from "react-icons/fa";


export default function TeamRow({

    team,

    onDelete

}) {


    return (

        <tr>
            <td>
                {team.name}
            </td>
            <td>

                {
                    team.supervisor ||
                    "No supervisor"
                }

            </td>
            <td>

                {
                    team.member_count || 0
                }

            </td>
            <td>

                {
                    new Date(
                        team.created_at
                    )
                        .toLocaleDateString()

                }

            </td>
            <td className="actions-team">

                <Link
                    to={`/teams/${team.id}/edit`}
                >

                    <FaEdit />

                </Link>
                <button

                    onClick={() =>
                        onDelete(team.id)
                    }

                >

                    <FaTrash />

                </button>
            </td>


        </tr>

    );


}