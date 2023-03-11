import React, {useState, useEffect} from 'react';

function ServiceAppointmentForm(){
    const [name, setName] = useState('');
    const [vinNumber, setVin] = useState('');
    const [date ,setDate] = useState('');
    const [time ,setTime] = useState('');
    const [reason, setReason] = useState('');
    const [technician, setTechnician] = useState('');

    const handleNameChange = event => {
        const value = event.target.value
        setName(value)
    }
    const handleVin= event => {
        const value = event.target.value
        setVin(value)
    }
    const handleDate= event => {
        const value = event.target.value
        setDate(value)
    }
    const handleTime= event => {
        const value = event.target.value
        setTime(value)
    }
    const handleReason= event => {
        const value = event.target.value
        setReason(value)
    }
    const handleTechnician= event => {
      const value = event.target.value
      setTechnician(value)
    }

    const [technicians, setTechnicians] = useState([])
    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.vin = vinNumber;
        data.name = name;
        data.date = date;
        data.time = time;
        data.reason = reason;
        data.technician = technician;
        const appointmentUrl = 'http://localhost:8080/api/service/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await fetch(appointmentUrl, fetchConfig);
        if (response.ok) {
            const newAppointment = await response.json();
            setName('');
            setVin('');
            setDate('');
            setTime('');
            setReason('');
            setTechnician('');
        }
    }

    const fetchTechnician = async () => {
        const technicianUrl = 'http://localhost:8080/api/technician/';


        const response = await fetch(technicianUrl);

        if (response.ok) {
          const data = await response.json();
          setTechnicians(data.technicians);

        }
      }

      useEffect(() => {
        fetchTechnician();
      }, []);

    return(

        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a Service Appointment</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input value={name} onChange={handleNameChange} id="name" placeholder="name" required type="text" className="form-control"/>
                <label>Name</label>
              </div>
              <div className="form-floating mb-3">
                <input value={vinNumber} onChange={handleVin} id="vin" placeholder="vin" required type="text" className="form-control"/>
                <label>VIN</label>
              </div>
              <div className="form-floating mb-3">
                <input value={date} onChange={handleDate} id="date" placeholder="date" required type="date" className="form-control"/>
                <label>Date</label>
              </div>
              <div className="form-floating mb-3">
                <input value={time} onChange={handleTime} id="time" placeholder="time" required type="time" className="form-control"/>
                <label>Date</label>
              </div>
              <div className="form-floating mb-3">
              <textarea onChange={handleReason} value={reason} className="form-control" id="reason" name="reason" rows="5"></textarea>
                <label className="form-label">Reason</label>
              </div>
              <div className="mb-3">
                <select onChange={handleTechnician} value={technician} required id="technician" name="technician" className="form-select">
                  <option value="">Select a Technician</option>
                    {technicians.map(technician => {
                        return (
                            <option value={technician.href} key={technician.name}>
                                {technician.name}
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

  );
    }
export default ServiceAppointmentForm;
