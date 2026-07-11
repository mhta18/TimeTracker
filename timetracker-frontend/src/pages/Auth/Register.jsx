import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaClock } from "react-icons/fa";
import api from "../../api/api";
import "./Login.css";

export default function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

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
            await api.post(
                "/auth/register",
                form
            );

            navigate("/login");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Registration failed."
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

                <h2>Create Account</h2>

                <p className="subtitle">
                    Create your account to start managing projects.
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
                        {loading ? "Creating..." : "Register"}
                    </button>

                </form>

                <p className="register-link">
                    Already have an account?
                    <Link to="/login"> Login</Link>
                </p>

            </div>
        </div>
    );
}