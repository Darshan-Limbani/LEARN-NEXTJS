import {NEXT_URL} from "@/config/index";
import {useRouter} from "next/router";
import {createContext, useEffect, useState} from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const router = useRouter();
    useEffect(() => {
        checkUserLoggedIn();
    }, []);

//     Register User

    const register = async (user) => {
        console.log(user);
    };

//     Login User

    const login = async ({email: identifier, password}) => {

        console.log("LOGIN IN AUTH", identifier, password);

        const res = await fetch(`${NEXT_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                identifier, password
            })
        });

        const data = await res.json();
        console.log("AUTH : ", data);
        if (res.ok) {
            setUser(data.user);
            router.push('/account/dashboard');
        } else {
            // toast.error("ERROR");
            setError(data.message);
            // setError(null);
        }
    };

//     LogOut User
    const logOut = async () => {
        console.log('logOut');
    };

//     Check is user is logged in
    const checkUserLoggedIn = async (user) => {
        // console.log('Check ');

        const res = await fetch(`${NEXT_URL}/api/user`);
        const data = await res.json();
        if (res.ok) {
            setUser(data.user);
        } else {
            setUser(null);
        }


    };

    return (
        <AuthContext.Provider value={{user, setError, error, register, login, logOut}}>{children}</AuthContext.Provider>
    );
};

export default AuthContext;