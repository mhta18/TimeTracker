import ProjectRow from "./ProjectRow";

import "./ProjectTable.css";

export default function ProjectTable({

    projects,

    onDelete

}) {

    return (

        <table className="project-table">

            <thead>

                <tr>

                    <th>Name</th>

                    <th>Description</th>

                    <th>Status</th>

                    <th>Created</th>

                    <th>Actions</th>

                </tr>

            </thead>

            <tbody>

                {projects.map(project => (

                    <ProjectRow

                        key={project.id}

                        project={project}

                        onDelete={onDelete}

                    />

                ))}

            </tbody>

        </table>

    );

}