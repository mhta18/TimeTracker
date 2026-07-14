import { useState, useEffect } from "react";
import api from "../../api/api";
import "./projectForm.css";
export default function ProjectForm({
    mode,
    initialValues,
    onSubmit
}) {

    const isEdit = mode === "edit";
    const [teams, setTeams] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        status: "Active",
        team_id: ""
    });

    useEffect(() => {
        loadTeams()
        if (initialValues) {
            setFormData({
                name: initialValues.name || "",
                description: initialValues.description || "",
                status: initialValues.status || "Active",
                team_id: initialValues.team_id || ""
            });
        }
    }, [initialValues]);


    async function loadTeams() {

        try {

            const response = await api.get("/teams/");

            setTeams(response.data);

        }
        catch (error) {

            console.error(
                "Failed to load teams",
                error
            );

        }

    }

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(formData);
    }

    return (
        <form
            className="project-form"
            onSubmit={handleSubmit}
        >
            <div className="form-group">

                <label>
                    Project Name
                </label>

                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

            </div>

            <div className="form-group">

                <label>
                    Description
                </label>

                <textarea
                    rows="5"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />

            </div>

            <div className="form-row">

                <div className="form-group">

                    <label>
                        Status
                    </label>

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option>Active</option>
                        <option>Completed</option>
                        <option>On Hold</option>
                    </select>

                </div>

                <div className="form-group">

                    <label>
                        Team ID
                    </label>

                    <select
                        name="team_id"
                        value={formData.team_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Team</option>

                        {teams.map(team => (
                            <option
                                key={team.id}
                                value={team.id}
                            >
                                {team.name}
                            </option>
                        ))}
                    </select>
                </div>

            </div>

            <button type="submit" className="submit-btn-project">
                {isEdit ? "Update Project" : "Create Project"}
            </button>
        </form>
    );
}