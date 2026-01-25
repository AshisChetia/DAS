import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import './Doctors.css' // We will create this CSS file next

const Doctors = () => {

  const { speciality } = useParams()
  const { doctors } = useContext(AppContext)
  const [filterDoc, setFilterDoc] = useState([])
  const navigate = useNavigate()

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div className='doctors-page-container'>
      <p className='doctors-page-title'>Browse through the doctors specialist.</p>
      
      <div className='doctors-content'>
        
        {/* --- LEFT FILTER SIDEBAR --- */}
        <div className='filter-sidebar'>
          <p 
            onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} 
            className={`filter-option ${speciality === 'General physician' ? 'active-filter' : ''}`}
          >
            General physician
          </p>
          <p 
            onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} 
            className={`filter-option ${speciality === 'Gynecologist' ? 'active-filter' : ''}`}
          >
            Gynecologist
          </p>
          <p 
            onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} 
            className={`filter-option ${speciality === 'Dermatologist' ? 'active-filter' : ''}`}
          >
            Dermatologist
          </p>
          <p 
            onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} 
            className={`filter-option ${speciality === 'Pediatricians' ? 'active-filter' : ''}`}
          >
            Pediatricians
          </p>
          <p 
            onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} 
            className={`filter-option ${speciality === 'Neurologist' ? 'active-filter' : ''}`}
          >
            Neurologist
          </p>
          <p 
            onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} 
            className={`filter-option ${speciality === 'Gastroenterologist' ? 'active-filter' : ''}`}
          >
            Gastroenterologist
          </p>
        </div>

        {/* --- RIGHT DOCTOR GRID --- */}
        <div className='doctors-grid'>
          {filterDoc.map((item, index) => (
            <div onClick={() => navigate(`/appointment/${item._id}`)} className='doctor-card' key={index}>
              <div className='image-container'>
                  <img className='doctor-img' src={item.image} alt="" />
              </div>
              <div className='doctor-info'>
                  <div className='status-row'>
                      <p className='status-dot'></p><p>Available</p>
                  </div>
                  <p className='doctor-name'>{item.name}</p>
                  <p className='doctor-speciality'>{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Doctors