import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import VehicleForm from './VehicleForm';
import VehicleList from './VehicleList';

import AutomobileForm from './AutomobileForm';
import AutomobileList from './AutomobileList';
import TechnicianForm from './TechnicianForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/manufacturer" >
            <Route path ='' element={<ManufacturerList />} />
            <Route path='new' element={<ManufacturerForm />} />
          </Route>
          <Route path="/vehicle" >
            <Route path ='' element={<VehicleList />} />
            <Route path='new' element={<VehicleForm />} />
          </Route>
          <Route path="/automobile" >
            <Route path='' element={<AutomobileList />} />
            <Route path="/automobile/new" element={<AutomobileForm />} />
          </Route>
          <Route path='/technician' element={<TechnicianForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
