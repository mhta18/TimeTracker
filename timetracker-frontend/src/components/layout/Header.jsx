import { useState, useEffect } from "react";
import api from "../../api/api";
import "./Header.css";

export default function Header() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await api.get("/auth/me", { withCredentials: true }
                );
                setUser(response.data);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentUser();
    }, []);

    if (loading) {
        return (
            <header className="header">
                <h2>Dashboard</h2>
                <div>Loading profile...</div>
            </header>
        );
    }

    return (
        <header className="header">
            <h2>Dashboard</h2>
            <div>
                {user ? (
                    <>
                        Hello, <strong>{user.username}</strong>
                    </>
                ) : (
                    "Not logged in"
                )}
            </div>
        </header>
    );
}