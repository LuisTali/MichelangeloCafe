import React from "react";
import navbarRoutes from "../../../routes/navbarRoutes.js";
import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () =>{

    return <div className="navbar">
        {navbarRoutes.map((route) => <Link key={route.id} to={route.path}>{route.title}</Link>)}
    </div>

}

export default Navbar;