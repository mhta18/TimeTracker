import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/api";

import TeamTable from "../components/teams/TeamTable";

import "./Teams.css";


export default function Teams() {

    const [teams, setTeams] = useState([]);

    const navigate = useNavigate();


    useEffect(() => {
        loadTeams();
    }, []);



    async function loadTeams() {

        try {

            const response = await api.get("/teams");

            setTeams(response.data);

        }

        catch (error) {

            console.error(error);

        }

    }



    async function handleDelete(id) {

        if (!window.confirm(
            "Delete this team?"
        )) return;


        try {

            await api.delete(`/teams/${id}`);

            loadTeams();

        }

        catch (error) {

            console.error(error);

        }

    }



    return (

        <div className="teams-page">


            <div className="teams-header">

                <h1>
                    Teams
                </h1>


                <button
                    className="new-team-btn"
                    onClick={() =>
                        navigate("/teams/create")
                    }
                >

                    + New Team

                </button>


            </div>



            <TeamTable

                teams={teams}

                onDelete={handleDelete}

            />


        </div>

    );
}