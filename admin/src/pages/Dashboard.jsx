import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../context/AdminContext';
import { FaUserMd, FaCalendarCheck, FaUser, FaTimes, FaListAlt } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {

    const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext);

    useEffect(() => {
        if (aToken) {
            getDashData();
        }
    }, [aToken]);

    return dashData && (
        <div className='dashboard-container'>

            {/* 1. TOP STATS CARDS */}
            <div className='dash-cards'>

                <div className='card'>
                    <div className='card-icon'><FaUserMd /></div>
                    <div className='card-info'>
                        <h1>{dashData.doctors}</h1>
                        <p>Doctors</p>
                    </div>
                </div>

                <div className='card'>
                    <div className='card-icon'><FaCalendarCheck /></div>
                    <div className='card-info'>
                        <h1>{dashData.appointments}</h1>
                        <p>Appointments</p>
                    </div>
                </div>

                <div className='card'>
                    <div className='card-icon'><FaUser /></div>
                    <div className='card-info'>
                        <h1>{dashData.patients}</h1>
                        <p>Patients</p>
                    </div>
                </div>

            </div>

            {/* 2. LATEST BOOKINGS LIST */}
            <div className='latest-bookings'>
                <div className='dash-title'>
                    <FaListAlt color="#5f6fff" />
                    <p>Latest Bookings</p>
                </div>

                <div className='dash-list'>
                    {dashData.latestAppointments.map((item, index) => (
                        <div className='dash-list-item' key={index}>
                            <img className='dash-doc-img' src={item.docData.image} alt="" />
                            <div className='booking-info'>
                                <p className='booking-name'>{item.docData.name}</p>
                                <p className='booking-date'>{item.slotDate}</p>
                            </div>
                            {item.cancelled
                                ? <p className='text-red-500 text-xs font-medium'>Cancelled</p>
                                : <FaTimes onClick={() => cancelAppointment(item._id)} className='cancel-icon' />
                            }
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Dashboard;