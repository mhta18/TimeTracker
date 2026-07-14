import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import api from "../api/api";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import "./DashboardLayout.css";

export default function DashboardLayout() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        loadUser();
    }, []);

    async function loadUser() {
        const response = await api.get("/auth/me");
        setUser(response.data);
    }
    return (

        <div className="layout">

            <Sidebar user={user} />

            <div className="main-content">

                <Header />

                <div className="page-content">

                    <Outlet />

                </div>

            </div>

        </div>

    );

}