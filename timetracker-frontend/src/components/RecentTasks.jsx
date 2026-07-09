function RecentTasks({ tasks }) {

    return (

        <div>

            <h2>Recent Tasks</h2>

            {

                tasks.map(task => (

                    <div
                        key={task.id}
                        className="taskCard"
                    >

                        <h3>{task.title}</h3>

                        <p>{task.status}</p>

                    </div>

                ))

            }

        </div>

    );

}

export default RecentTasks;