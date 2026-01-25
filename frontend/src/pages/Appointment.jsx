import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import './Appointment.css'
import RelatedDoctors from '../components/RelatedDoctors'

const Appointment = () => {

    const { docId } = useParams()
    const { doctors, currencySymbol } = useContext(AppContext)
    const [daysOfWeek, setDaysOfWeek] = useState(['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'])

    const [docInfo, setDocInfo] = useState(null)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')

    const fetchDocInfo = async () => {
        const docInfo = doctors.find(doc => doc._id === docId)
        setDocInfo(docInfo)
    }

    const getAvailableSlots = async () => {
        setDocSlots([])

        // Getting current date
        let today = new Date()

        for (let i = 0; i < 7; i++) {
            // Getting date with index
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            // Setting end time of the date with index
            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)

            // Setting hours
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            let timeSlots = []

            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

                // Add slot to array
                timeSlots.push({
                    datetime: new Date(currentDate),
                    time: formattedTime
                })

                // Increment time by 30 minutes
                currentDate.setMinutes(currentDate.getMinutes() + 30)
            }

            setDocSlots(prev => [...prev, timeSlots])
        }
    }

    useEffect(() => {
        fetchDocInfo()
    }, [doctors, docId])

    useEffect(() => {
        fetchDocInfo()
    }, [doctors, docId])

    useEffect(() => {
        getAvailableSlots()
    }, [docInfo])

    useEffect(() => {
        console.log(docSlots)
    }, [docSlots])

    return docInfo && (
        <div className='appointment-container'>
            {/* --- Doctor Details --- */}
            <div className='doc-details-card'>
                <div className='doc-img-box'>
                    <img className='doc-img' src={docInfo.image} alt="" />
                </div>

                <div className='doc-info'>
                    {/* Name & Verified Icon */}
                    <div className='name-verified'>
                        <p className='doc-name'>{docInfo.name}</p>
                        <img className='verified-icon' src={assets.verified_icon} alt="" />
                    </div>

                    {/* Degree & Speciality */}
                    <div className='doc-degree'>
                        <p>{docInfo.degree} - {docInfo.speciality}</p>
                        <button className='experience-btn'>{docInfo.experience}</button>
                    </div>

                    {/* About Section */}
                    <div className='about-section'>
                        <p className='about-title'>About <img src={assets.info_icon} alt="" /></p>
                        <p className='about-text'>{docInfo.about}</p>
                    </div>
                    
                    <p className='doc-fee'>
                        Appointment fee: <span>{currencySymbol}{docInfo.fees}</span>
                    </p>
                </div>
            </div>

            {/* --- Booking Slots --- */}
            <div className='booking-slots'>
                <p>Booking slots</p>
                
                {/* Day Selector */}
                <div className='days-row'>
                    {docSlots.length && docSlots.map((item, index) => (
                        <div onClick={() => setSlotIndex(index)} className={`day-card ${slotIndex === index ? 'active-day' : ''}`} key={index}>
                            <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                            <p>{item[0] && item[0].datetime.getDate()}</p>
                        </div>
                    ))}
                </div>

                {/* Time Selector */}
                <div className='time-row'>
                    {docSlots.length && docSlots[slotIndex].map((item, index) => (
                        <p onClick={() => setSlotTime(item.time)} className={`time-pill ${item.time === slotTime ? 'active-time' : ''}`} key={index}>
                            {item.time.toLowerCase()}
                        </p>
                    ))}
                </div>

                <button className='book-btn-final'>Book an appointment</button>
            </div>

            <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
            
        </div>
    )
}

export default Appointment