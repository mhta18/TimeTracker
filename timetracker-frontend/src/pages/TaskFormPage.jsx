import { useEffect, useState } from "react";
import {
    useNavigate,
    useParams
} from "react-router-dom";

import api from "../api/api";
import TaskForm from "../components/tasks/TaskForm";

export default function TaskFormPage({ mode = "full" }) {

    const { id } = useParams();

    const navigate = useNavigate();

    const isEdit = Boolean(id);

    const isStatusOnly = mode === "status";

    const [task, setTask] = useState(null);

    useEffect(() => {

        if (isEdit) {
            loadTask();
        }

    }, [id]);

    async function loadTask() {

        try {

            const response = await api.get(`/tasks/${id}`);

            setTask(response.data);

        }

        catch (error) {

            console.error(error);

        }

    }

    async function handleSubmit(formData) {
  
        try {

            if (!isEdit) {

                await api.post(
                    "/tasks/create",
                    formData
                );

            }

            else if (isStatusOnly) {

                await api.patch(
                    `/tasks/${id}/status`,
                    {
                        status: formData.status
                    }
                );

            }

            else {

                await api.put(
                    `/tasks/${id}`,
                    formData
                );

            }

            navigate("/tasks");

        }

        catch (error) {

            console.error(error);

        }

    }

    return (

        <div className="page-card">

            <h1>

                {!isEdit
                    ? "Create Task"
                    : isStatusOnly
                        ? "Update Task Status"
                        : "Edit Task"}

            </h1>

            <TaskForm

                initialValues={task}

                statusOnly={isStatusOnly}

                onSubmit={handleSubmit}

                submitText={
                    !isEdit
                        ? "Create Task"
                        : isStatusOnly
                            ? "Update Status"
                            : "Update Task"
                }

            />

        </div>

    );

}