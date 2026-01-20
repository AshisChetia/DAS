import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const { aToken, setAToken } = useContext(AdminContext);
    const navigate = useNavigate();

    const logout = () => {
        navigate('/');
        aToken && setAToken('');
        aToken && localStorage.removeItem('aToken');
    }

    return (
        <div className="navbar">
            <div className="nav-logo">
                <img className="w-36 cursor-pointer" src="/logo.png" alt="nav-logo" />
                <h2>Prescripto</h2>
                <p>Admin Panel</p>
            </div>
            <button onClick={logout} className="logout-btn">Logout</button>
        </div>
    )
}

export default Navbar;