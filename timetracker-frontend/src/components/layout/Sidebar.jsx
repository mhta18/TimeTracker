import {
    FaHome,
    FaFolder,
    FaTasks,
    FaUsers,
    FaClock,
    FaHistory,
    FaSignOutAlt
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {

    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem("user");
        navigate("/login");
    }

    return (

        <aside className="sidebar">

            <h2 className="sidebar-logo">
                <FaClock />
                TimeTracker
            </h2>

            <nav>

                <NavLink to="/dashboard">
                    <FaHome />
                    Dashboard
                </NavLink>

                <NavLink to="/projects">
                    <FaFolder />
                    Projects
                </NavLink>

                <NavLink to="/tasks">
                    <FaTasks />
                    Tasks
                </NavLink>

                <NavLink to="/teams">
                    <FaUsers />
                    Teams
                </NavLink>

                <NavLink to="/timer">
                    <FaClock />
                    Timer
                </NavLink>

            </nav>

            <button
                className="logout-btn"
                onClick={logout}
            >
                <FaSignOutAlt />
                Logout
            </button>

        </aside>

    );
}