import React, { useContext } from "react";
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom';
import { FaHome, FaUserPlus, FaUserMd, FaCalendarAlt } from 'react-icons/fa';
import './Sidebar.css'

const Sidebar = () => {

    const { aToken } = useContext(AdminContext);

    return (
        <div className="sidebar">
            {aToken && <ul className='sidebar-list'>
                    <NavLink className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`} to={'/admin-dashboard'}>
                        <FaHome className="sidebar-icon" />
                        <p className="sidebar-text">DashBoard</p>
                    </NavLink>

                    <NavLink className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`} to={'/all-appointments'}>
                        <FaCalendarAlt className="sidebar-icon" />
                        <p className="sidebar-text">Appointments</p>
                    </NavLink>

                    <NavLink className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`} to={'/add-doctor'}>
                        <FaUserPlus className="sidebar-icon" />
                        <p className="sidebar-text">Add Doctor</p>
                    </NavLink>

                    <NavLink className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`} to={'/doctor-list'}>
                        <FaUserMd className="sidebar-icon" />
                        <p className="sidebar-text">Doctors List</p>
                    </NavLink>
                </ul>}
        </div>
    )
}

export default Sidebar;