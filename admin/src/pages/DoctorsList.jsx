import React, { useContext, useEffect } from "react";
import { AdminContext } from "../context/AdminContext";
import './DoctorsList.css'

const DoctorsList = () => {

    const { doctors, aToken, getAllDoctors } = useContext(AdminContext);

    useEffect(() => {
        if (aToken) {
            getAllDoctors();
        }
    }, [aToken]);

    return (
        <div className="list-container">
            <h1 className="list-title">All Doctors</h1>

            <div className="doctors-grid">
                {doctors.map((item, index) => (
                    <div className="doctor-card" key={index}>
                        <img src={item.image} alt="" className="doc-card-image" />
                        <div className="p-info">
                            <p className="doc-name">{item.name}</p>
                            <p className="doc-speciality">{item.speciality}</p>

                            <div className="doc-availability">
                                <input type="checkbox" checked={item.available === true} readOnly />
                                <p>Available</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DoctorsList;