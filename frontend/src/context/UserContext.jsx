import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setIsUserLoggedIn(true);
        }
    }, []);

    const login = (token) => {
        setIsUserLoggedIn(true);
        localStorage.setItem('accessToken', token);
    };

    const logout = () => {
        setIsUserLoggedIn(false);
        localStorage.removeItem('accessToken');
    };

    return (
        <UserContext.Provider value={{ isUserLoggedIn, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};