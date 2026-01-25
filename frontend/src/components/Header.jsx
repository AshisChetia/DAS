import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='header-container'>
        <div className='header-content'>
            <p className='header-title'>Book Appointment <br /> With Trusted Doctors</p>
            <div className='header-description'>
                <img className='group-profiles' src={assets.group_profiles} alt="" />
                <p>Simply browse through our extensive list of trusted doctors,<br /> schedule your appointment hassle-free.</p>
            </div>
            <a href="#speciality" className='book-btn'>
                Book appointment <img className='arrow-icon' src={assets.arrow_icon} alt="" />
            </a>
        </div>
    </div>
  )
}

export default Header