import { Link } from "react-router-dom";
import "../dashboard/Sections.css";
function RecentTasks({ tasks }) {

    return (

        <div className="card">

            <h2>Recent Tasks</h2>

            {

                tasks.map(task => (

                    <div
                        key={task.id}
                        className="taskCard"
                    >

                        <Link to={`/tasks/${task.id}/view`}>
                            {task.title}
                        </Link>

                        <p>{task.status}</p>

                    </div>

                ))

            }

        </div>

    );

}

export default RecentTasks;