import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { Outlet } from "react-router-dom";

import "./DashboardLayout.css";

export default function DashboardLayout() {

    return (

        <div className="layout">

            <Sidebar />

            <div className="main-content">

                <Header />

                <div className="page-content">

                    <Outlet />

                </div>

            </div>

        </div>

    );

}