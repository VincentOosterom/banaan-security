import {createContext, useState} from "react";
import {useNavigate} from "react-router-dom";


export const AuthContext = createContext({})

function AuthContextProvider({children}) {
    const [authState, setAuthState] = useState({
        isAuth: false,
        user: ''
    });

    const navigate = useNavigate();

    const login = (email) => {
        console.log('Gebruiker is ingelogd', email);
        setAuthState({
            isAuth: true,
            user: email
        });
        navigate('/profile');
    };

    const logout = () => {
        console.log('Gebruiker is uigelogd')
        setAuthState({
            isAuth: false,
            user: ''
        })
        navigate('/');
    }

    const data = {
        isAuth: authState.isAuth,
        user: authState.user,
        login,
        logout,
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContextProvider;
