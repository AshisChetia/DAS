import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import './RelatedDoctors.css'

const RelatedDoctors = ({ speciality, docId }) => {

    const { doctors } = useContext(AppContext)
    const navigate = useNavigate()

    const [relDoc, setRelDoc] = useState([])

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
            setRelDoc(doctorsData)
        }
    }, [doctors, speciality, docId])

    return (
        <div className='related-doctors-container'>
            <h1 className='rd-title'>Related Doctors</h1>
            <p className='rd-description'>Simply browse through our extensive list of trusted doctors.</p>
            
            <div className='rd-grid'>
                {relDoc.slice(0, 5).map((item, index) => (
                    <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='doctor-card' key={index}>
                        <div className='image-container'>
                            <img className='doctor-img' src={item.image} alt="" />
                        </div>
                        <div className='doctor-info'>
                            <div className='status-row'>
                                <span className='status-dot'></span><p>Available</p>
                            </div>
                            <p className='doctor-name'>{item.name}</p>
                            <p className='doctor-speciality'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RelatedDoctors