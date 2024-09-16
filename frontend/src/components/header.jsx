import React, { useState, useEffect } from 'react';

// import '../styles/main.scss';

import HeaderBurger  from './HeaderBurger';
import HeaderDisplay from './HeaderDisplay';


function Header() {

    const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1000);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        isMobile ? (
            <HeaderBurger />
        ) : (
            <HeaderDisplay />
            )

    );



}

export default Header;



  