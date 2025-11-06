import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";

function SignIn() {
    const {login, isAuth, logout} = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email);
    };


    return (
        <>
            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id
                molestias qui quo unde?</p>

            <form onSubmit={handleSubmit}>

                <label htmlFor="username">
                    <input
                        type="text"
                        placeholder="Uw Gebruikersnaam"
                        id="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}/>
                </label>

                <label htmlFor="password">
                    <input
                        type="password"
                        placeholder="Uw Wachtwoord"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}/>
                </label>

                <div>
                    {isAuth === false ? (
                        <>
                            <button type="button" onClick={login}>Inloggen</button>
                        </>
                    ) : (
                        <>
                            <button type="button" onClick={logout}>Uitloggen</button>
                        </>
                    )}
                </div>
            </form>

            <p>Heb je nog geen account <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;