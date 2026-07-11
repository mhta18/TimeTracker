export default function ProjectStatus({ status }) {

    return (

        <span className={`status ${status.toLowerCase()}`}>

            {status}

        </span>

    );

}