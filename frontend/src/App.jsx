import React, { useContext } from 'react';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddDoctor from './pages/AddDoctor';
import DoctorsList from './pages/DoctorsList';
import AllAppointments from './pages/AllAppointments';

const App = () => {

  const { aToken } = useContext(AdminContext)
 
  return (
    <div className='bg-[#F8F9FD]'> 
      <ToastContainer />

      {aToken ? (
        <div className='app-container'>
          <Navbar />

            <div className="flex-layout" style={{display: 'flex'}}>
              <Sidebar />

              <div style={{width: '100%', padding: '20px'}}>
                <Routes>
                  <Route path='/' element={<></>} />
                  <Route path='/admin-dashboard' element={<Dashboard />} />
                  <Route path='/add-doctor' element={<AddDoctor />} />
                  <Route path='/doctor-list' element={<DoctorsList />} />
                  <Route path='/all-appointments' element={<AllAppointments />} />
                </Routes>
              </div>
            </div>
          
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;