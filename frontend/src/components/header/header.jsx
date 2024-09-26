import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderBurger from './HeaderBurger';
import HeaderDisplay from './HeaderDisplay';

function Header() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setIsUserLoggedIn(true);
        }
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1000);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setIsUserLoggedIn(false);
        navigate('/');
        window.location.reload();
    };

    return (
        isMobile ? (
            <HeaderBurger isUserLoggedIn={isUserLoggedIn} handleLogout={handleLogout} />
        ) : (
            <HeaderDisplay isUserLoggedIn={isUserLoggedIn} handleLogout={handleLogout} />
        )
    );
}

export default Header;