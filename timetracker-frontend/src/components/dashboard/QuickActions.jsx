import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../api/api";

import "../dashboard/Sections.css";

function QuickActions() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        loadUser();
    }, []);

    async function loadUser() {
        try {
            const response = await api.get("/auth/me");
            setUser(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="card">

            <h2>Quick Actions</h2>

            {user?.role === "admin" && (
                <>
                    <Link to="/projects/create">
                        Create Project
                    </Link>

                    <br />

                    <Link to="/teams/create">
                        Create Team
                    </Link>
                </>
            )}

            {user?.role === "supervisor" && (
                <>
                    <Link to="/tasks/create">
                        Create Task
                    </Link>
                </>
            )}

            {user?.role === "member" && (
                <p className="no-actions">
                    No quick actions available.
                </p>
            )}

        </div>
    );
}

export default QuickActions;