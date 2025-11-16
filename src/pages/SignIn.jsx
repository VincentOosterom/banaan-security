import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

function SignIn() {
    const {login} = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");

        console.log("Ingevulde login:", { email, password });

        try {
            const response = await axios.post(
                "https://novi-backend-api-wgsgz.ondigitalocean.app/api/login",
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

            console.log("Login succesvol:", response.data);

            const jwt = response.data.token;
            login(jwt);

        } catch (e) {
            console.error("Login fout:", e.response?.data || e);
            setError("Email of wachtwoord klopt niet");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <h1>Inloggen</h1>

            <form onSubmit={handleSubmit}>

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

                {error && <p style={{color: "red"}}>{error}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? "Bezig..." : "Inloggen"}
                </button>
            </form>

            <p>Heb je nog geen account? <Link to="/signup">Registreer je hier</Link>.</p>
        </>
    );
}

export default SignIn;
