import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/api";
import ProjectTable from "../components/projects/ProjectTable";

import "./Projects.css";

export default function Projects() {

    const [projects, setProjects] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        loadProjects();
    }, []);

    async function loadProjects() {

        try {
            const response = await api.get("/projects/", { withCredentioals: true });
            setProjects(response.data);
        } catch (error) {
            setProjects(null)
            console.error(error);
        }

    }

    async function handleDelete(id) {

        if (!window.confirm("Delete this project?")) return;

        try {

            await api.delete(`/projects/${id}`);

            setProjects(current =>
                current.filter(project => project.id !== id)
            );
        }

        catch (error) {

            console.error(error);

        }

    }

    return (

        <div className="projects-page">

            <div className="projects-header">

                <h1>Projects</h1>

                <button
                    className="new-project-btn"
                    onClick={() => navigate("/projects/create")}
                >
                    + New Project
                </button>

            </div>

            <ProjectTable
                projects={projects}
                onDelete={handleDelete}
            />

        </div>

    );

}