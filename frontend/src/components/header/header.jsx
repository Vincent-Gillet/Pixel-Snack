import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderBurger from './HeaderBurger';
import HeaderDisplay from './HeaderDisplay';
import { UserContext } from '../../context/UserContext';

function Header() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
    const { isUserLoggedIn, logout } = useContext(UserContext);
    const navigate = useNavigate();

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
        logout();
        navigate('/');
        window.location.reload();
    };

    useEffect(() => {
        const handleScroll = () => {
            const burgerButton = document.querySelector('.bm-burger-button');
            if (window.scrollY > 50) {
                burgerButton.classList.add('scrolled');
            } else {
                burgerButton.classList.remove('scrolled');
            }
        };

        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        isMobile ? (
            <HeaderBurger isUserLoggedIn={isUserLoggedIn} handleLogout={handleLogout} />
        ) : (
            <HeaderDisplay isUserLoggedIn={isUserLoggedIn} handleLogout={handleLogout} />
        )
    );
}

export default Header;