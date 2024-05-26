// App.js
import React from 'react';
import Auth from './components/auth';
import WaterBillsEntry from './components/waterBills';
import { useState } from 'react';
import ElectricityBillsEntry from './components/electricityBills';
import Home from './components/Home';
import "./App.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [showAuth, setShowAuth] = useState(false);

  const handleShowAuth = () => {
    setShowAuth(true);
  };

  return (
    <div>
      <Home/>
      <ToastContainer />

      {/* <button onClick={handleShowAuth}>Login/Register</button> */}
      {/* <Auth /> */}
      {/* {showAuth && <Auth />} */}
      {/* <WaterBillsEntry/> */}
      {/* <ElectricityBillsEntry/> */}
    </div>
  );
};

export default App;
