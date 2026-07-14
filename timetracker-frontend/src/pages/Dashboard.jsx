import { useEffect, useState } from "react";
import api from "../api/api";

import "./Dashboard.css";

import StatCard from "../components/dashboard/StatCard";
import RunningTask from "../components/dashboard/RunningTask";
import RecentTasks from "../components/dashboard/RecentTasks";
import QuickActions from "../components/dashboard/QuickActions";

import {
    FaFolder,
    FaTasks,
    FaClock,
    FaCheckCircle,
} from "react-icons/fa";

function Dashboard() {
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [runningTask, setRunningTask] = useState(null);

    useEffect(() => {
        loadDashboard();
    }, []);

    async function loadDashboard() {
        try {
            const projectsRes = await api.get("/projects");
            const tasksRes = await api.get("/tasks");

            setProjects(projectsRes.data);
            setTasks(tasksRes.data);

            const running = tasksRes.data.find(
                (task) => task.status === "In_Progress"
            );

            setRunningTask(running || null);
        } catch (error) {
            console.error(error);
        }
    }

    const completedTasks = tasks.filter(
        (task) => task.status === "Completed"
    ).length;

    return (
        <div className="dashboard-page">


            <div className="stats-grid">

                <StatCard
                    title="Projects"
                    value={projects.length}
                    icon={<FaFolder />}
                />

                <StatCard
                    title="Tasks"
                    value={tasks.length}
                    icon={<FaTasks />}
                />

                <StatCard
                    title="Completed"
                    value={completedTasks}
                    icon={<FaCheckCircle />}
                />

                <StatCard
                    title="Running"
                    value={runningTask ? "1" : "0"}
                    icon={<FaClock />}
                />

            </div>

            <div className="dashboard-content">

                <div className="dashboard-left">

                    <RunningTask
                        task={runningTask}
                    />

                    <QuickActions />

                </div>

                <div>

                    <RecentTasks
                        tasks={tasks.slice(0, 5)}
                    />

                </div>

            </div>

        </div>
    );
}

export default Dashboard;