import "../dashboard/Sections.css";

function RunningTask({ task }) {

    return (

        <div className="card">

            <h2>Running Task</h2>
            <br />
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