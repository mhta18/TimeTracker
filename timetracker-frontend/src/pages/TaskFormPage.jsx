import { useEffect, useState } from "react";

import {

    useNavigate,

    useParams

} from "react-router-dom";

import api from "../api/api";

import TaskForm from "../components/tasks/TaskForm";

import Button from "../components/common/button";

export default function TaskFormPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const isEdit = Boolean(id);

    const [task, setTask] = useState();

    useEffect(() => {

        if (isEdit) {

            loadTask();

        }

    }, []);

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

            if (isEdit) {

                await api.put(

                    `/tasks/${id}`,

                    formData

                );

            }

            else {

                await api.post(

                    "/tasks",

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

            <Button />

            <h1>

                {

                    isEdit

                        ? "Edit Task"

                        : "Create Task"

                }

            </h1>

            <TaskForm
                initialValues={task}

                onSubmit={handleSubmit}

                submitText={

                    isEdit

                        ? "Update Task"

                        : "Create Task"

                }

            />

        </div>

    );

}