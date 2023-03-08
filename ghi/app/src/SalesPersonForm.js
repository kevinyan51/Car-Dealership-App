import React, {useState} from 'react';

function SalesPersonForm(){
    const [name, setName] = useState('');
    const [employee_number, setEmployee_number] = useState('');

    const handleNameChange = event => {
        const value = event.target.value
        setName(value)
    }
    const handleEmployee_numberChange = event => {
        const value = event.target.value
        setEmployee_number(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};

        data.name = name;
        data.employee_number = employee_number;

        const sales_personUrl = 'http://localhost:8090/api/salespersons/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await fetch(sales_personUrl, fetchConfig);
        if (response.ok) {
            const newSales_person = await response.json();

            setName('');
            setEmployee_number('');
        }
    }

    return(

        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a Sales Person</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input value={name} onChange={handleNameChange} id="name" placeholder="name" required type="text" className="form-control"/>
                <label>Name</label>
              </div>
              <div className="form-floating mb-3">
                <input value={employee_number} onChange={handleEmployee_numberChange} id="employee_number" placeholder="employee_number" required type="text" className="form-control"/>
                <label>Employee Number</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>

  );
    }
export default SalesPersonForm;
