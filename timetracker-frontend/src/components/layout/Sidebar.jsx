import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import {
    FaTachometerAlt,
    FaFolder,
    FaTasks,
    FaUsers,
    FaClock,
    FaSignOutAlt
} from "react-icons/fa";

import "./Sidebar.css";

export default function Sidebar({ user }) {

    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await api.post("/auth/logout");

            navigate("/login");
        } catch (error) {
            console.error("Failed to logout from server:", error);
            navigate("/login");
        }
    }


    return (

        <aside className="sidebar">

            <div className="sidebar-logo">
                TimeTracker
            </div>

            <nav>

                <NavLink to="/dashboard">
                    <FaTachometerAlt />
                    Dashboard
                </NavLink>

                {user?.role !== "member" && (
                    <>
                        <NavLink to="/projects">
                            <FaFolder />
                            Projects
                        </NavLink>
                    </>
                )}

                <NavLink to="/tasks">
                    <FaTasks />
                    Tasks
                </NavLink>

                {user?.role === "admin" && (
                    <NavLink to="/teams">
                        <FaUsers />
                        Teams
                    </NavLink>
                )}
                
                {user?.role === "member" && (
                    <NavLink to="/timer">
                        <FaClock />
                        Timer
                    </NavLink>
                )}

            </nav>

            <button className="logout-btn" onClick={handleLogout} >
                <FaSignOutAlt />
                Logout
            </button>

        </aside>

    );

}