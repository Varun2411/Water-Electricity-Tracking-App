import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ElectricityBillsEntry from './components/electricityBills';
import WaterBillsEntry from './components/waterBills';
import DashB from './components/Dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
    <Routes>
        <Route path = '/' element = {<App/>}/>
        <Route path='/electric' element={<ElectricityBillsEntry/>}/>
        <Route path='/water' element = {<WaterBillsEntry/>}/>
        <Route path='/dashboard' element = {<DashB/>}/>
      {/* </Route> */}
    </Routes>
  </Router>
  // <DashB/> 
);

reportWebVitals();







// import React from 'react';
// import { render } from 'react-dom';
// import App from './App';
// import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

// render(<App />, document.getElementById('root'));