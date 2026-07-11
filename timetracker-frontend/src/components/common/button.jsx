import "./Button.css";

function Button({

    children,
    type = "button"

}) {

    return (

        <button
            className="btn"
            type={type}
        >

            {children}

        </button>

    );

}

export default Button;