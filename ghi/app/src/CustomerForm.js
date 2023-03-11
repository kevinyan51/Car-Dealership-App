import React, {useState} from 'react';

function CustomerForm(){
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone_number, setPhone_number] = useState('');

    const handleNameChange = event => {
        const value = event.target.value
        setName(value)
    }
    const handleAddressChange = event => {
        const value = event.target.value
        setAddress(value)
    }
    const handlePhone_numberChange = event => {
        const value = event.target.value
        setPhone_number(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};

        data.name = name;
        data.address = address;
        data.phone_number = phone_number;

        const customerUrl = 'http://localhost:8090/api/customers/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await fetch(customerUrl, fetchConfig);
        if (response.ok) {
            const newCustomer = await response.json();

            setName('');
            setAddress('');
            setPhone_number('');
        }
    }
    return(

        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a Customer</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input value={name} onChange={handleNameChange} id="name" placeholder="name" required type="text" className="form-control"/>
                <label>Name</label>
              </div>
              <div className="form-floating mb-3">
                <input value={address} onChange={handleAddressChange} id="address" placeholder="address" required type="text" className="form-control"/>
                <label>Address</label>
              </div>
              <div className="form-floating mb-3">
                <input value={phone_number} onChange={handlePhone_numberChange} id="phone_number" placeholder="phone_number" required type="text" className="form-control"/>
                <label>Phone Number</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>

  );
    }
export default CustomerForm;
