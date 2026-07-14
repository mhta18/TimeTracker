import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";
import "./TaskDetails.css";

export default function TaskDetails() {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTaskDetails() {
            try {
                const response = await api.get(`/tasks/${id}`);
                setTask(response.data);
            } catch (error) {
                console.error("Failed to fetch task details:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchTaskDetails();
    }, [id]);

    if (loading) return <div className="loading">Loading task details...</div>;
    if (!task) return <div className="error">Task not found.</div>;

    return (
        <div className="task-details-container">
            <div className="task-details-card">
                <div className="task-details-header">
                    <h2>{task.title}</h2>
                    <span className={`priority-badge ${task.priority?.toLowerCase()}`}>
                        {task.priority || "Medium"}
                    </span>
                </div>

                <div className="task-details-body">
                    <div className="detail-group">
                        <label>Project</label>
                        <p>{task.project_name || "No Project Assigned"}</p>
                    </div>

                    <div className="detail-group">
                        <label>Assigned To</label>
                        <p>{task.assigned_to_name || "Unassigned"}</p>
                    </div>

                    <div className="detail-group">
                        <label>Status</label>
                        <span className={`status-tag ${task.status?.toLowerCase()}`}>
                            {task.status || "Pending"}
                        </span>
                    </div>

                    <div className="detail-group">
                        <label>Description</label>
                        <p className="description-text">
                            {task.description || "No description provided."}
                        </p>
                    </div>
                </div>

                <div className="task-details-footer">
                    <Link to="/tasks" className="btn-back">Back to Tasks</Link>
                </div>
            </div>
        </div>
    );
}