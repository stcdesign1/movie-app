import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="header">
            <Link to='/movie-app'>Moovies</Link>
            <nav>
                <ul>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </nav>
        </div>
    )
}

export default Header;