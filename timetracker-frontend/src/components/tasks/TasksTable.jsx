import TaskRow from "./TaskRow";

// import "./TasksTable.css";

export default function TasksTable({

    tasks,

    onDelete

}) {

    return (

        <table className="project-table">

            <thead>

                <tr>

                    <th>Title</th>

                    <th>Project</th>

                    <th>Status</th>

                    <th>Priority</th>

                    <th>Due Date</th>

                    <th>Actions</th>

                </tr>

            </thead>

            <tbody>

                {tasks.map(task => (

                    <TaskRow

                        key={task.id}

                        task={task}

                        onDelete={onDelete}

                    />

                ))}

            </tbody>

        </table>

    );

}