import { NavLink } from "react-router-dom";
import {useNavigate} from "react-router-dom";
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

    function logout() {
        localStorage.removeItem("user");
        navigate("/login");
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

                <NavLink to="/timer">
                    <FaClock />
                    Timer
                </NavLink>

            </nav>

            <button className="logout-btn" onClick={logout} >
                <FaSignOutAlt />
                Logout
            </button>

        </aside>

    );

}