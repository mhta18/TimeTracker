import { useState } from "react";

import { Link } from "react-router-dom";

import api from "../../api/api";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import AuthLayout from "../../components/AuthLayout/AuthLayout";

function Register() {

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            await api.post("/auth/register", {

                username,
                password

            });

            alert("Registered successfully");

        }

        catch (err) {

            alert(err.response.data.message);

        }

    }

    return (

        <AuthLayout title="Register">

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

                    Register

                </Button>

            </form>

            <p>

                Already have an account?

                <Link to="/">

                    Login

                </Link>

            </p>

        </AuthLayout>

    );

}

export default Register;