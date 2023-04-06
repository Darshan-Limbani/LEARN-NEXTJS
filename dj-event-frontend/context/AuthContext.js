import {createContext, useState} from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

//     Register User

    const register = async (user) => {
        console.log(user);
    };

//     Login User

    const login = async ({email: identifier, password}) => {
        console.log(identifier, password);
    };
//     LogOut User


    const logOut = async () => {
        console.log('logOut');
    };

//     Check is user is logged in
    const checkUserLoggedIn = async (user) => {
        console.log('Check ');
    };

    return (
        <AuthContext.Provider value={{user, error, register, login, logOut}}>{children}</AuthContext.Provider>
    );
};

export default AuthContext;