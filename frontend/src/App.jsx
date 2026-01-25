import React from 'react'
import { Route, Routes } from 'react-router-dom'


import Navbar from './components/Navbar'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Appointment from './pages/Appointment'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className="container">
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<div>Login Page</div>} />
        <Route path='/about' element={<div>About Page</div>} />
        <Route path='/contact' element={<div>Contact Page</div>} />
        <Route path='/my-profile' element={<div>My Profile</div>} />
        <Route path='/my-appointments' element={<div>My Appointments</div>} />
        <Route path='/appointment/:docId' element={<Appointment />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App;