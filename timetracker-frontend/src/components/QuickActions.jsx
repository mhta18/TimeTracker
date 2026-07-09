import { Link } from "react-router-dom";

function QuickActions() {

    return (

        <div className="card">

            <h3>Quick Actions</h3>

            <Link to="/projects/">
                Create Project
            </Link>

            <br />

            <Link to="/tasks/">
                Create Task
            </Link>

        </div>

    );

}

export default QuickActions;