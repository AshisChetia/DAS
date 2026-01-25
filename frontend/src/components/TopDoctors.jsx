import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import './TopDoctors.css'

const TopDoctors = () => {

  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  return (
    <div className='top-doctors-container'>
      <h1 className='td-title'>Top Doctors to Book</h1>
      <p className='td-description'>Simply browse through our extensive list of trusted doctors.</p>
      
      <div className='td-grid'>
        {doctors.slice(0, 10).map((item, index)=>(
            <div onClick={() => {navigate(`/appointment/${item._id}`); scrollTo(0,0)}} className='doctor-card' key={index}>
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

      <button onClick={()=>{ navigate('/doctors'); scrollTo(0,0) }} className='more-btn'>More</button>
    </div>
  )
}

export default TopDoctors