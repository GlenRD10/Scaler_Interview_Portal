import React, { useState } from "react";

import classes from "./Header.module.css";

const Header = () => {
    const [greeting, setGreeting] = useState('Evening')
    // setGreeting('Evening');

    return (
        <div className={classes.header}>
            <h3>Good {greeting}!</h3>
        </div>
    );
};

export default Header;