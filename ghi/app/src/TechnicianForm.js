import React, {useState} from 'react';

function TechnicianForm(){
    const [name, setName] = useState('');
    const [employeeNumber, setEmployeeNumber] = useState('');
    const handleNameChange = event => {
        const value = event.target.value
        setName(value)
    }
    const handleEmployeeNumber = event => {
        const value = event.target.value
        setEmployeeNumber(value)
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};

        data.name = name;
        data.employee_number = employeeNumber
        const technicianUrl = 'http://localhost:8080/api/technician/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await fetch(technicianUrl, fetchConfig);
        if (response.ok) {
            const newTechnician = await response.json();
            setName('');
            setEmployeeNumber('');
        }
    }

    return(

        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a Technician</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input value={name} onChange={handleNameChange} id="name" placeholder="name" required type="text" className="form-control"/>
                <label>Name</label>
              </div>
              <div className="form-floating mb-3">
                <input value={employeeNumber} onChange={handleEmployeeNumber } id="employee_number" placeholder="employee_number" required type="texts" className="form-control"/>
                <label>Employee Number</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>

  );
    }
export default TechnicianForm;
