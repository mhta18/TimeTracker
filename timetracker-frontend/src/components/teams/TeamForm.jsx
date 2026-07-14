import { useEffect, useState } from "react";
import api from "../../api/api";

import "./TeamForm.css";

export default function TeamForm({

    initialValues,
    onSubmit,
    submitText,
    title

}) {

    const [supervisors, setSupervisors] = useState([]);

    const [formData, setFormData] = useState({

        name: "",
        description: "",
        supervisor_id: ""

    });

    useEffect(() => {

        loadSupervisors();

    }, []);

    useEffect(() => {

        if (!initialValues) return;

        setFormData({

            name: initialValues.name || "",
            description: initialValues.description || "",
            supervisor_id: initialValues.supervisor_id || ""

        });

    }, [initialValues]);

    async function loadSupervisors() {

        try {

            const response = await api.get("/auth/supervisors");

            setSupervisors(response.data);

        }

        catch (error) {

            console.error(error);

        }

    }

    function handleChange(e) {

        const { name, value } = e.target;

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

        <div className="team-form-page">

            <div className="team-form-card">

                <div className="team-form-header">


                        <h1>

                            {title}

                        </h1>

                        <p>

                            Manage your team information.

                        </p>

                </div>

                <form

                    onSubmit={handleSubmit}

                    className="team-form"

                >

                    <div className="form-group">

                        <label>

                            Team Name

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

                    <div className="form-group">

                        <label>

                            Supervisor Name

                        </label>

                        <select
                            name="supervisor_id"
                            value={formData.supervisor_id}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Supervisor</option>

                            {supervisors.map(user => (

                                <option
                                    key={user.id}
                                    value={user.id}
                                >
                                    {user.username}
                                </option>

                            ))}
                        </select>

                    </div>

                    <div className="form-actions">


                        <button

                            className="submit-btn-team"

                            type="submit"

                        >

                            {submitText}

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}