import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../api/api";
import TeamForm from "../components/teams/TeamForm";

export default function TeamPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const editing = Boolean(id);

    const [team, setTeam] = useState(null);

    const [loading, setLoading] = useState(editing);

    useEffect(() => {

        if (editing) {

            loadTeam();

        }

    }, [id]);



    async function loadTeam() {

        try {

            const response = await api.get(`/teams/${id}`);

            setTeam(response.data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    }



    async function handleSubmit(formData) {

        try {

            if (editing) {

                await api.put(`/teams/${id}`, formData);

            }

            else {

                await api.post("/teams/create", formData);

            }

            navigate("/teams");

        }

        catch (error) {

            console.error(error);

        }

    }

    if (loading) {

        return <p>Loading...</p>;

    }

    return (

        <TeamForm

            initialValues={team}

            onSubmit={handleSubmit}

            submitText={
                editing
                    ? "Update Team"
                    : "Create Team"
            }

            title={
                editing
                    ? "Edit Team"
                    : "Create New Team"
            }

        />

    );

}