import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {

    const [username, setUsername] = useState("");
    const [email, setEmail]     = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function signUp(e) {
        e.preventDefault(); // voorkomt refresh
        setLoading(true);

        console.log("Ingevulde waardes:", {
            username,
            email,
            password,
        });

        try {
            const response = await axios.post(
                "https://novi-backend-api-wgsgz.ondigitalocean.app/api/users",
                {
                    email: email,
                    password: password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "novi-education-project-id": "d6200c4d-2a0a-435d-aba6-6171c6a7296e"
                    },
                }
            );

            console.log("Registratie gelukt:", response.data);

            // 👉 Doorlinken naar login
            navigate("/signin");

        } catch (error) {
            console.error("Registratie faalde:", error.response?.data || error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <h1>Registreren</h1>

            <p>Lorem ipsum dolor sit amet...</p>

            <form onSubmit={signUp}>

                <label htmlFor="username">
                    <input
                        type="text"
                        placeholder="Uw gebruikersnaam"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>

                <label htmlFor="email">
                    <input
                        type="email"
                        placeholder="Uw e-mailadres"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>

                <label htmlFor="password">
                    <input
                        type="password"
                        placeholder="Uw wachtwoord"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>

                <button type="submit" disabled={loading}>
                    {loading ? "Account wordt aangemaakt..." : "Account aanmaken"}
                </button>
            </form>

            <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
        </>
    );
}

export default SignUp;
