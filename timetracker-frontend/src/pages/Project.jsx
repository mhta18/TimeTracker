import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import "./Project.css"
import ProjectForm from "../components/projects/ProjectForm";

export default function Project() {

    const { id } = useParams();

    const navigate = useNavigate();

    const isEdit = Boolean(id);

    const [project, setProject] = useState(null);

    useEffect(() => {

        if (isEdit) {
            loadProject();
        }

    }, [id]);

    async function loadProject() {

        try {

            const res = await api.get(`/projects/${id}`);

            setProject(res.data);

        } catch (err) {

            console.error(err);

        }

    }

    async function handleSubmit(data) {

        try {

            if (isEdit) {

                await api.put(`/projects/${id}`, data);

                navigate(`/projects/${id}`);

            } else {

                await api.post("/projects/create", data);

                navigate("/projects");

            }

        } catch (err) {

            console.error(err);

        }

    }

    if (isEdit && !project) {

        return <h2>Loading...</h2>;

    }

    return (

        <div className="project-page">

            <div className="project-header">

                <h1 className="project-title">
                    {isEdit ? "Edit Project" : "Create Project"}
                </h1>

            </div>

            <div className="project-card">

                <ProjectForm
                    mode={isEdit ? "edit" : "create"}
                    initialValues={project}
                    onSubmit={handleSubmit}
                />

            </div>

        </div>
    );

}