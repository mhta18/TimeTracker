import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../api/api";

import ProjectInfo from "../components/projects/ProjectInfo";
import TaskTable from "../components/Tasks/TasksTable";

import "./ProjectDetails.css";

export default function ProjectDetails() {

    const { id } = useParams();

    const [project, setProject] = useState(null);

    const [tasks, setTasks] = useState([]);

    useEffect(() => {

        loadProject();

    }, []);

    async function loadProject() {

        try {

            const projectRes = await api.get(`/projects/${id}`);

            const taskRes = await api.get(`/projects/${id}/tasks`);

            setProject(projectRes.data);

            setTasks(taskRes.data);

        }

        catch (error) {

            console.error(error);

        }

    }

    if (!project) {

        return <p>Loading...</p>;

    }

    return (

        <div className="project-details-page">

           <div className="details-header">

                <h1>Project Details</h1>

            </div> 
            
            <ProjectInfo project={project}/>

            < TaskTable tasks={tasks} />

        </div>

    );

}