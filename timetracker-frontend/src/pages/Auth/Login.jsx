import { useState } from "react";

import { Link } from "react-router-dom";

import api from "../../api/api";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import AuthLayout from "../../components/AuthLayout/AuthLayout";

function Login() {

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            await api.post("/auth/login", {

                username,
                password

            });

            alert("Logged in");
            window.location.href = "/dashboard";

        }

        catch (err) {

            alert(err.response.data.message);

        }

    }

    return (

        <AuthLayout title="Login">

            <form onSubmit={handleSubmit}>

                <Input

                    label="Username"

                    value={username}

                    onChange={(e) => setUsername(e.target.value)}

                />

                <Input

                    label="Password"

                    type="password"

                    value={password}

                    onChange={(e) => setPassword(e.target.value)}

                />

                <Button type="submit">

                    Login

                </Button>

            </form>

            <p>

                Don't have an account?

                <Link to="/register">

                    Register

                </Link>

            </p>

        </AuthLayout>

    );

}

export default Login;