import React from "react";
import navbarRoutes from "../../../routes/navbarRoutes.js";
import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () =>{

    return <div className="navbar">
        <div className="links">
            {navbarRoutes.map((route) => <Link key={route.id} to={route.path}>{route.title}</Link>)}
        </div>
    </div>

}

export default Navbar;