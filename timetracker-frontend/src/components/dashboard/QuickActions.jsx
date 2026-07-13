import "../dashboard/Sections.css";

import { Link } from "react-router-dom";

function QuickActions() {

    return (

        <div className="card">

            <h3>Quick Actions</h3>
            <br />
            <Link to="/projects/create">
                Create Project
            </Link>

            <br />

            <Link to="/tasks/create">
                Create Task
            </Link>

        </div>

    );

}

export default QuickActions;