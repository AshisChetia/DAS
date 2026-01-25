import React from 'react'
import { assets } from '../assets/assets'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer-container'>
      <div className='footer-content'>
        
        {/* --- Left Section (Logo & Text) --- */}
        <div className='footer-left'>
            <img className='footer-logo' src={assets.logo} alt="" />
            <p className='footer-text'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
        </div>

        {/* --- Center Section (Links) --- */}
        <div className='footer-center'>
            <p className='footer-title'>COMPANY</p>
            <ul className='footer-links'>
                <li>Home</li>
                <li>About us</li>
                <li>Contact us</li>
                <li>Privacy policy</li>
            </ul>
        </div>

        {/* --- Right Section (Contact) --- */}
        <div className='footer-right'>
            <p className='footer-title'>GET IN TOUCH</p>
            <ul className='footer-links'>
                <li>+1-212-456-7890</li>
                <li>greatstackdev@gmail.com</li>
            </ul>
        </div>

      </div>

      {/* --- Copyright Text --- */}
      <div>
        <hr className='footer-line' />
        <p className='copyright-text'>Copyright © 2024 GreatStack - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer