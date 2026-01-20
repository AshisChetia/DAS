import React, { useContext } from 'react';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';

const App = () => {

  const { aToken } = useContext(AdminContext)
 
  return (
    <div className='bg-[#F8F9FD]'> 
      <ToastContainer />

      {aToken ? (
        <>
          <Navbar />
          <div style={{display: 'flex', alignItems: 'start'}}>
            <h1 style={{margin: '20px'}}>Welcome to Admin Panel</h1>
          </div>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;