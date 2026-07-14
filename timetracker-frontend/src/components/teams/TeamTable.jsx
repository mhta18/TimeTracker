import TeamRow from "./TeamRow";



export default function TeamTable({

    teams,

    onDelete

}) {


    return (

        <table className="team-table">


            <thead>

                <tr>

                    <th>
                        Name
                    </th>

                    <th>
                        Supervisor
                    </th>

                    <th>
                        Created
                    </th>

                    <th>
                        Actions
                    </th>


                </tr>

            </thead>



            <tbody>


                {
                    teams.map(team => (


                        <TeamRow

                            key={team.id}

                            team={team}

                            onDelete={onDelete}

                        />


                    ))
                }



            </tbody>


        </table>

    );


}