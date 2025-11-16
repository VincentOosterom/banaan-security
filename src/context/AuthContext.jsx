import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });

    const navigate = useNavigate();


    // LOGIN
    const login = async (jwt) => {
        try {
            // 1. token opslaan
            localStorage.setItem("token", jwt);

            // 2. token decoderen
            const decoded = jwtDecode(jwt);
            const userId = decoded.userId;
            const email = decoded.email;

            // 3. gebruiker ophalen
            const response = await axios.get(
                `https://novi-backend-api-wgsgz.ondigitalocean.app/api/users/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                        "novi-education-project-id": "d6200c4d-2a0a-435d-aba6-6171c6a7296e"
                    }
                }
            );

            // 4. user in context zetten
            setAuth({
                isAuth: true,
                user: {
                    id: userId,
                    email: email,
                    roles: response.data.roles,
                },
                status: "done",
            });

            // 5. doorlinken
            navigate("/profile");

        } catch (e) {
            console.error("Login mislukt:", e);
        }
    };



    // LOGOUT
    const logout = () => {
        localStorage.removeItem('token');

        setAuth({
            isAuth: false,
            user: null,
            status: 'done',
        });

        navigate('/');
    };

    // PERSIST ON REFRESH
    useEffect(() => {
        console.log("Context wordt gerefresht!");

        const token = localStorage.getItem("token");

        if (!token) {
            setAuth({
                isAuth: false,
                user: null,
                status: "done",
            });
            return;
        }

        if (!isTokenValid(token)) {
            console.warn("Token is verlopen")
            localStorage.removeItem("token");

            setAuth({
                isAuth: false,
                user: null,
                status: "done",
            });
            return;

        }

        const source = axios.CancelToken.source();

        async function fetchUser() {
            try {
                const decoded = jwtDecode(token);
                const userId = decoded.userId; // ✔ verplicht

                const response = await axios.get(
                    `https://novi-backend-api-wgsgz.ondigitalocean.app/api/users/${userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "novi-education-project-id": "d6200c4d-2a0a-435d-aba6-6171c6a7296e",
                        },
                        cancelToken: source.token,
                    }
                );

                setAuth({
                    isAuth: true,
                    user: response.data,
                    status: "done",
                });

            } catch (e) {
                console.error("Persist mislukt:", e);

                setAuth({
                    isAuth: false,
                    user: null,
                    status: "done",
                });
            }
        }

        fetchUser();
        return () => {
            source.cancel();
        };
    }, []);


    const data = {
        ...auth,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={data}>
            {auth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
