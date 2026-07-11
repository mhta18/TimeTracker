import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaClock } from "react-icons/fa";
import api from "../../api/api";
import "./Login.css";

export default function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await api.post(
                "/auth/login",
                form,
                { withCredentials: true }
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            navigate("/dashboard");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Invalid username or password."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-page">
            <div className="login-container">

                <h1 className="logo">
                    <FaClock />
                    TimeTracker
                </h1>

                <h2>Welcome Back</h2>

                <p className="subtitle">
                    Login to continue managing your projects.
                </p>

                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}

                <form
                    className="login-form"
                    onSubmit={handleSubmit}
                >

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                <p className="register-link">
                    Don't have an account?
                    <Link to="/register"> Register</Link>
                </p>

            </div>
        </div>
    );
}