function RunningTask({ task }) {

    return (

        <div className="card">

            <h3>Running Task</h3>

            {

                task ?

                    <>
                        <h2>{task.title}</h2>
                        <p>{task.description}</p>
                    </>

                    :

                    <p>No active task</p>

            }

        </div>

    );

}

export default RunningTask;