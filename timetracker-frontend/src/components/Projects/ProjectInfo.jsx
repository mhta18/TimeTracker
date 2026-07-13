import "./ProjectInfo.css";

export default function ProjectInfo({ project }) {
    return (
        <div className="project-info-card">

            <div className="project-main">

                <h3>{project.name}</h3>

                <p>{project.description}</p>

            </div>

            <div className="project-summary">

                <div className="summary-item">

                    <span>Created</span>

                    <strong>
                        {new Date(project.created_at).toLocaleDateString()}
                    </strong>

                </div>

                <div className="summary-item">

                    <span>Status</span>

                    <span className="status-badge">
                        {project.status}
                    </span>

                </div>

            </div>

        </div>
    );
}