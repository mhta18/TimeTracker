import { useEffect, useState } from "react";
import api from "../api/api";

import StatCard from "../components/StatCard";
import RunningTask from "../components/RunningTask";
import RecentTasks from "../components/RecentTasks";
import QuickActions from "../components/QuickActions";

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
                task => task.status === "In Progress"
            );

            setRunningTask(running || null);

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="dashboard">

            <h1>Dashboard</h1>

            <div className="stats">

                <StatCard
                    title="Projects"
                    value={projects.length}
                />

                <StatCard
                    title="Tasks"
                    value={tasks.length}
                />

            </div>

            <RunningTask task={runningTask} />

            <RecentTasks tasks={tasks.slice(0, 5)} />

            <QuickActions />

        </div>
    );
}

export default Dashboard;