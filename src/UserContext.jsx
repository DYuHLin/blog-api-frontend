import { createContext, useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const getInitialState = () => {
        const localUser = sessionStorage.getItem("BLOG_USER");
        return localUser ? JSON.parse(localUser) : false;
    };
    const [user, setUser] = useState(getInitialState);

    const ProtectedRoutes = () => {

        return (
            user === false ? (<Navigate to="/posts/login" />) : user.accessToken ? (<Outlet /> ) : ""
        )
    };

    useEffect(() => {
        sessionStorage.setItem('BLOG_USER', JSON.stringify(user));
    }, [user]);

    return (
        <UserContext.Provider value={{user, setUser, ProtectedRoutes}}>
            {children}
        </UserContext.Provider>
    )
};

export default UserContext;