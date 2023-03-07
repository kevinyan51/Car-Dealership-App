import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import React from 'react';
import { useState, useEffect } from "react";
import ManufacturerForm from './ManufacturerForm';
import ManufacturerList from './ManufacturerList';
import AutomobileForm from './AutomobileForm';
import AutomobileList from './AutomobileList';


function App() {
  const [manufacturer, setManufacturer] = useState([])
  const [automobile, setAutomobile] = useState([])

  const getManufacturer = async () => {
    const url = 'http://localhost:8100/api/manufacturers/'
    const response = await fetch(url);

    if (response.ok){
      const data = await response.json();
      const manufacturer = data.manufacturer
      setManufacturer(manufacturer)
    }
  }

  const getAutomobile = async () => {
    const url = 'http://localhost:8100/api/automobiles/'
    const response = await fetch(url);

    if(response.ok){
      const data = await response.json();
      const automobile = data.automobile
      setAutomobile(automobile)
    }

  }

  useEffect(() => {
    getManufacturer();
    getAutomobile();
  }, []);

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/manufacturer" element={<ManufacturerList manufacturer={manufacturer} />} />
          <Route path="/manufacturer/new" element={<ManufacturerForm />} />
          <Route path="/automobile" element={<AutomobileList automobile={automobile} />} />
          <Route path="/automobile/new" element={<AutomobileForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
