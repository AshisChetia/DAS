import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {

    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [token, setToken] = useState(true); 

    return (
        <div className='navbar-container'>
            {/* Logo */}
            <img onClick={()=>navigate('/')} className='logo' src={assets.logo} alt="" />

            {/* Desktop Menu */}
            <ul className='desktop-menu'>
                <NavLink to='/'>
                    <li className='menu-item'>HOME</li>
                    <hr className='active-indicator' />
                </NavLink>
                <NavLink to='/doctors'>
                    <li className='menu-item'>ALL DOCTORS</li>
                    <hr className='active-indicator' />
                </NavLink>
                <NavLink to='/about'>
                    <li className='menu-item'>ABOUT</li>
                    <hr className='active-indicator' />
                </NavLink>
                <NavLink to='/contact'>
                    <li className='menu-item'>CONTACT</li>
                    <hr className='active-indicator' />
                </NavLink>
            </ul>

            {/* Right Side */}
            <div className='nav-right'>
                {
                    token 
                    ? <div className='profile-group'>
                        <div className='profile-trigger'>
                            <img className='profile-pic' src={assets.profile_pic} alt="" />
                            <img className='dropdown-icon' src={assets.dropdown_icon} alt="" />
                        </div>
                        <div className='dropdown-menu'>
                            <div className='dropdown-content'>
                                <p onClick={()=>navigate('my-profile')} className='dropdown-item'>My Profile</p>
                                <p onClick={()=>navigate('my-appointments')} className='dropdown-item'>My Appointments</p>
                                <p onClick={()=>setToken(false)} className='dropdown-item'>Logout</p>
                            </div>
                        </div>
                    </div>
                    : <button onClick={()=>navigate('/login')} className='login-btn'>Create account</button>
                }
                
                {/* --- FIX: DIRECT SVG ICON (No Image File Needed) --- */}
                <button onClick={()=>setShowMenu(true)} className="menu-icon-btn">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
                
                {/* --- MOBILE MENU OVERLAY --- */}
                <div className={`mobile-menu ${showMenu ? 'show-mobile-menu' : 'hide-mobile-menu'}`}>
                    <div className='mobile-menu-header'>
                        <img className='logo-mobile' src={assets.logo} alt="" />
                        {/* Close Icon SVG */}
                        <button onClick={()=>setShowMenu(false)} className='close-icon-btn'>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <ul className='mobile-nav-list'>
                        <NavLink onClick={()=>setShowMenu(false)} to='/'><p className='mobile-link'>HOME</p></NavLink>
                        <NavLink onClick={()=>setShowMenu(false)} to='/doctors'><p className='mobile-link'>ALL DOCTORS</p></NavLink>
                        <NavLink onClick={()=>setShowMenu(false)} to='/about'><p className='mobile-link'>ABOUT</p></NavLink>
                        <NavLink onClick={()=>setShowMenu(false)} to='/contact'><p className='mobile-link'>CONTACT</p></NavLink>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar