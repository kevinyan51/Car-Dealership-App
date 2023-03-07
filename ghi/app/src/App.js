import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerList from './ManufacturerList';
// import ManufacturerForm from './ManufacturerForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/manufacturer" >
            <Route path ='' element={<ManufacturerList />} />
            {/* <Route path='new' element={<ManufacturerForm />} /> */}
          </Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
