import React, {useEffect, useState} from 'react';


function VehicleForm(props) {
    const [name, setName] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [picture_url, setPicture_URL] = useState('');

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }
    const handleManufacturer = (event) => {
        const value = event.target.value;
        setManufacturer(value);
    }
    const handlePicture_URL = (event) => {
        const value = event.target.value;
        setPicture_URL(value);
    }
    const [manufacturers, setManufacturers] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.manufacturer_id = manufacturer;
        data.name = name;
        data.picture_url = picture_url;
        console.log(data)

        const modelUrl = 'http://localhost:8100/api/models/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const response = await fetch(modelUrl, fetchConfig);
        if (response.ok) {
            const newCar = await response.json();
            console.log(newCar)
            setName('');
            setManufacturer('');
            setPicture_URL('');
        }
      }
    const fetchData = async () => {
        const url = 'http://localhost:8100/api/manufacturers/';

        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          setManufacturers(data.manufacturers);
        }
      }

      useEffect(() => {
        fetchData();
      }, []);

    return (
        <>
        <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <form onSubmit={handleSubmit} >
                <div className="form-floating mb-3">
                    <input onChange={handleNameChange} value={name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                    <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handlePicture_URL} value={picture_url} placeholder="picture_url" required type="text" name="picture_url" id="picture_url" className="form-control" />
                    <label htmlFor="picture_url">Picture URL</label>
                </div>
                <div className="mb-3">
                    <select onChange={handleManufacturer} required value={manufacturer} name="manufacturer" id="manufacturer" className="form-select">
                    <option value="">Choose a manufacturer</option>
                    {manufacturers.map(manufacturer => {
                        return (
                            <option value={manufacturer.id} key={manufacturer.id}>
                                {manufacturer.name}
                            </option>
                        );
                    })}
                    </select>
                </div>
                <button className="btn btn-primary">Create</button>
                </form>
            </div>
            </div>
        </div>
        </>
    )

}

export default VehicleForm
