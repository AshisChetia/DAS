import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../context/AdminContext';
import { FaTimes } from 'react-icons/fa'; // Import 'X' icon
import './AllAppointments.css';

const AllAppointments = () => {

    const { aToken, appointments, getAllAppointments } = useContext(AdminContext);

    useEffect(() => {
        if (aToken) {
            getAllAppointments();
        }
    }, [aToken]);

    // Simple Age Calculator Helper
    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    return (
        <div className='appointments-container'>
            <p className='appointments-title'>All Appointments</p>

            <div className='appointments-table'>

                {/* Table Header */}
                <div className='table-header'>
                    <p>#</p>
                    <p>Patient</p>
                    <p className='hide-on-mobile'>Age</p>
                    <p className='hide-on-mobile'>Date & Time</p>
                    <p className='hide-on-mobile'>Doctor</p>
                    <p>Fees</p>
                    <p>Action</p>
                </div>

                {/* Table Body */}
                {appointments.map((item, index) => (
                    <div className='table-row' key={index}>
                        <p>{index + 1}</p>

                        <div className='patient-info'>
                            <img className='patient-img' src={item.userData.image} alt="" />
                            <p>{item.userData.name}</p>
                        </div>

                        <p className='hide-on-mobile'>{calculateAge(item.userData.dob)}</p>

                        <p className='hide-on-mobile'>{item.slotDate}, {item.slotTime}</p>

                        <div className='doc-info hide-on-mobile'>
                            <img className='patient-img' src={item.docData.image} alt="" />
                            <p>{item.docData.name}</p>
                        </div>

                        <p>${item.amount}</p>

                        {/* Cancel Button */}
                        {item.cancelled
                            ? <p className='text-red-500 text-xs font-medium'>Cancelled</p>
                            : <button className='cancel-btn'><FaTimes /></button>
                        }

                    </div>
                ))}

            </div>
        </div>
    )
}

export default AllAppointments;