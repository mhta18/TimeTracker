import { useState, useEffect } from "react";
import api from "../api/api";
import TimerCard from "../components/timeEntries/TimerCard";
import TimerHistory from "../components/timeEntries/TimerHistory";
import "./Timer.css";

export default function Timer() {
    const [runningEntry, setRunningEntry] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [entries, setEntries] = useState([]);
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        loadTimer();
    }, []);

    useEffect(() => {
        if (!runningEntry || runningEntry.status !== "running") return;

        const interval = setInterval(() => {
            const startTime = new Date(runningEntry.start_time).getTime();
            setElapsed(Math.max(0, Date.now() - startTime));
        }, 1000);

        return () => clearInterval(interval);
    }, [runningEntry]);

    async function loadTimer() {
        try {
            const [tasksRes, running, history] = await Promise.all([
                api.get("/tasks"),
                api.get("/timeEntries/current"),
                api.get("/timeEntries")
            ]);

            setTasks(tasksRes.data);
            setRunningEntry(running.data);
            setEntries(history.data);

            if (running.data && running.data.status === "running") {
                const diff = Date.now() - new Date(running.data.start_time).getTime();
                setElapsed(Math.max(0, diff));
            } else if (running.data && running.data.total_duration) {
                setElapsed(running.data.total_duration * 1000);
            } else {
                setElapsed(0);
            }
        } catch (error) {
            console.error("Failed to load timer data", error);
        }
    }

    async function handleTimerAction(action, taskId) {
        if (!taskId) return;
        try {
            if (action === "start") {
                await api.post(`/timeEntries/task/${taskId}/start`);
            } else {
                await api.patch(`/timeEntries/task/${taskId}/${action}`);
            }
            await loadTimer();
        } catch (error) {
            console.error(`Failed to perform ${action} action`, error);
        }
    }

    async function handleDelete(entryId) {
        if (!window.confirm("Are you sure you want to delete this time entry?")) return;
        try {
            await api.delete(`/timeEntries/${entryId}`);
            await loadTimer();
        } catch (error) {
            console.error("Failed to delete time entry:", error);
        }
    }

    function formatTime(ms) {
        if (!ms || ms < 0) return "00:00:00";
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return [
            hours.toString().padStart(2, "0"),
            minutes.toString().padStart(2, "0"),
            seconds.toString().padStart(2, "0")
        ].join(":");
    }

    return (
        <div className="timer-page">
            <h1 className="page-title">Timer Control Center</h1>

            <TimerCard
                runningEntry={runningEntry}
                formattedTime={formatTime(elapsed)}
                onAction={handleTimerAction}
                tasks={tasks}
            />

            <TimerHistory
                entries={entries}
                onResume={(taskId) => handleTimerAction("resume", taskId)}
                onDelete={handleDelete}
            />
        </div>
    );
}