import { useEffect, useState } from "react";
import api from "../../api/api";

import "./TaskForm.css";

export default function TaskForm({
    initialValues,
    onSubmit,
    submitText
}) {

    const [projects, setProjects] = useState([]);
    const [members, setMembers] = useState([]);

    const [formData, setFormData] = useState({
        project_id: "",
        assigned_to: "",
        title: "",
        description: "",
        priority: "Medium",
        status: "Pending",
        due_date: ""
    });


    useEffect(() => {
        loadProjects();
    }, []);

    useEffect(() => {

        if (!initialValues) return;

        setFormData({
            project_id: initialValues.project_id,
            assigned_to: initialValues.assigned_to,
            title: initialValues.title,
            description: initialValues.description,
            priority: initialValues.priority,
            status: initialValues.status,
            due_date: initialValues.due_date
                ? initialValues.due_date.substring(0, 10)
                : ""
        });

    }, [initialValues]);


    useEffect(() => {

        if (!formData.project_id) {

            setMembers([]);
            return;

        }

        loadMembers(formData.project_id);

    }, [formData.project_id]);

    async function loadProjects() {

        try {

            const response = await api.get("/projects");

            setProjects(response.data);

        }

        catch (error) {

            console.error(error);

        }

    }

    async function loadMembers(projectId) {

        try {

            const response = await api.get(
                `/projects/${projectId}/members`
            );

            setMembers(response.data);

        }

        catch (error) {

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

    function handleFormSubmit(e) {

        e.preventDefault();

        onSubmit(formData);

    }

    return (
        <div className="form-container">
            <form
                className="task-form"
                onSubmit={handleFormSubmit}
            >

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
                        name="description"
                        rows="5"
                        value={formData.description}
                        onChange={handleChange}
                    />

                </label>

                <label>

                    Priority

                    <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                    >

                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>

                    </select>

                </label>

                <label>

                    Status

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >

                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>

                    </select>

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