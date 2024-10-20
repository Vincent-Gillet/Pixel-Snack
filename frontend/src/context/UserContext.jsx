import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const expirationTime = localStorage.getItem('tokenExpirationTime');
        const currentTime = new Date().getTime();

        if (token && expirationTime && currentTime < expirationTime) {
            setIsUserLoggedIn(true);
            const timeLeft = expirationTime - currentTime;
            setTimeout(() => {
                logout();
                navigate('/login');
            }, timeLeft);
        } else {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('tokenExpirationTime');
        }
    }, [navigate]);

    const login = (token) => {
        const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;
        setIsUserLoggedIn(true);
        localStorage.setItem('accessToken', token);
        localStorage.setItem('tokenExpirationTime', expirationTime);

        setTimeout(() => {
            logout();
            navigate('/login');
        }, 24 * 60 * 60 * 1000); 
    };

    const logout = () => {
        setIsUserLoggedIn(false);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('tokenExpirationTime');
    };

    return (
        <UserContext.Provider value={{ isUserLoggedIn, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};