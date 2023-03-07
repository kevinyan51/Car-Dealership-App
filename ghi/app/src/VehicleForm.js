import React, {useEffect, useState } from 'react';


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
        data.manufacturer = manufacturer;
        data.name = name;
        data.color = color;
        data.picture_url = picture_url;
        data.bin = bin
        console.log(data)

        const shoeUrl = 'http://localhost:8100/api/models/'
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const response = await fetch(shoeUrl, fetchConfig);
        if (response.ok) {
            const newShoe = await response.json();
            console.log(newShoe)
            setName('');
            setManufacturer('');
            setColor('');
            setPicture_URL('');
            setBin('');
        }
      }
    const fetchData = async () => {
        const url = 'http://localhost:8100/api/manufacturers/';

        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          setManufacturers(data.models);
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
                <form onSubmit={handleSubmit} id="create-location-form">
                <div className="form-floating mb-3">
                    <input onChange={handleNameChange} value={name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                    <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleManufacturer} value={manufacturer} placeholder="manufacturer" required type="text" name="manufacturer" id="manufacturer" className="form-control" />
                    <label htmlFor="manufacturer">Manufacturer</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleColor} value={color} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                    <label htmlFor="city">Color</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handlePicture_URL} value={picture_url} placeholder="picture_url" required type="text" name="picture_url" id="picture_url" className="form-control" />
                    <label htmlFor="picture_url">Picture_url</label>
                </div>
                <div className="mb-3">
                    <select onChange={handleBin} value={bin} required name="bin" id="bin" className="form-select">
                    <option value="">Choose a bin</option>
                    {bins.map(bin => {
                        return (
                            <option value={bin.href} key={bin.href}>
                                {bin.closet_name}
                            </option>
                        )
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
