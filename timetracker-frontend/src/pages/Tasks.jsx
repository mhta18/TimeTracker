import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/api";
import TasksTable from "../components/tasks/TasksTable";



export default function Tasks() {

    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);

    useEffect(() => {

        loadTasks();

    }, []);

    async function loadTasks() {

        try {

            const res = await api.get("/tasks/");

            setTasks(res.data);

        } catch (err) {

            console.error(err);

        }

    }

    async function handleDelete(id) {

        if (!window.confirm("Delete task?"))
            return;

        try {

            await api.delete(`/tasks/${id}`);

            setTasks(tasks =>
                tasks.filter(task => task.id !== id)
            );

        } catch (err) {

            console.error(err);

        }

    }

    return (

        <div className="projects-page">

            <div className="projects-header">

                <h1>Tasks</h1>

                <button
                    className="new-project-btn"
                    onClick={() => navigate("/tasks/create")}
                >
                    + New Task
                </button>

            </div>

            <TasksTable

                tasks={tasks}

                onDelete={handleDelete}

            />

        </div>

    );

}