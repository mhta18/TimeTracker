import { useEffect, useState } from "react";
import api from "../../api/api";

import "./TaskForm.css";

export default function TaskForm({
    initialValues,
    onSubmit,
    submitText,
    statusOnly = false
}) {

    const [projects, setProjects] = useState([]);
    const [members, setMembers] = useState([]);

    const [formData, setFormData] = useState({
        project_id: "",
        assigned_to: "",
        title: "",
        description: "",
        status: "To_Do",
        due_date: ""
    });

    useEffect(() => {

        if (!statusOnly) {
            loadProjects();
        }

    }, [statusOnly]);

    useEffect(() => {

        if (!initialValues) return;

        setFormData({
            project_id: initialValues.project_id || "",
            assigned_to: initialValues.assigned_to || "",
            title: initialValues.title || "",
            description: initialValues.description || "",
            status: initialValues.status || "To_Do",
            due_date: initialValues.due_date
                ? initialValues.due_date.substring(0, 10)
                : ""
        });

    }, [initialValues]);

    useEffect(() => {

        if (statusOnly) return;

        if (!formData.project_id) {

            setMembers([]);
            return;

        }

        loadMembers(formData.project_id);

    }, [formData.project_id, statusOnly]);

    async function loadProjects() {

        try {

            const response = await api.get("/projects");

            setProjects(response.data);

        } catch (error) {

            console.error(error);

        }

    }

    async function loadMembers(projectId) {

        try {

            const response = await api.get(
                `/projects/${projectId}/members`
            );

            setMembers(response.data);

        } catch (error) {

            console.error(error);

        }

    }

    function handleChange(e) {

        const { name, value } = e.target;

        if (name === "project_id") {

            setFormData(prev => ({
                ...prev,
                project_id: value,
                assigned_to: ""
            }));

            return;

        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

    }

    function handleSubmit(e) {

        e.preventDefault();

        onSubmit(formData);

    }

    return (

        <div className="form-container">

            <form
                className="task-form"
                onSubmit={handleSubmit}
            >

                {!statusOnly && (

                    <>

                        <label>

                            Project

                            <select
                                name="project_id"
                                value={formData.project_id}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select Project
                                </option>

                                {projects.map(project => (

                                    <option
                                        key={project.id}
                                        value={project.id}
                                    >
                                        {project.name}
                                    </option>

                                ))}

                            </select>

                        </label>

                        <label>

                            Assign To

                            <select
                                name="assigned_to"
                                value={formData.assigned_to}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select Member
                                </option>

                                {members.map(member => (

                                    <option
                                        key={member.id}
                                        value={member.id}
                                    >
                                        {member.username}
                                    </option>

                                ))}

                            </select>

                        </label>

                        <label>

                            Title

                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />

                        </label>

                        <label>

                            Description

                            <textarea
                                rows="5"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />

                        </label>

                        <label>

                            Due Date

                            <input
                                type="date"
                                name="due_date"
                                value={formData.due_date}
                                onChange={handleChange}
                            />

                        </label>

                    </>

                )}

                <label>

                    Status

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >

                        <option value="To_Do">
                            To_Do
                        </option>

                        <option value="In_Progress">
                            In_Progress
                        </option>

                        <option value="Completed">
                            Completed
                        </option>

                    </select>

                </label>

                <button
                    type="submit"
                    className="submit-btn-task"
                >
                    {submitText}
                </button>

            </form>

        </div>

    );

}