import {useState, useEffect} from 'react';

function ServiceHistoryList() {
    const[searches, setSearches] = useState('')
    const[appointments, setAppointments] = useState([])
    const getAppointment = async () => {
        const ServiceResponse = await fetch('http://localhost:8080/api/service/');
        if (ServiceResponse.ok) {
            const data = await ServiceResponse.json();
            setAppointments(data.appointments)
        }
    }

    useEffect(() => {getAppointment();}, [])
    return (
        <>
        <div>
            <form>
                <input type="search/" placeholder='Search by VIN' onChange={(e) => setSearches(e.target.value)}/>
            </form>

        </div>
        <h1 className="card-title">Service History</h1>
        <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Customer name</th>
            <th>Vip?</th>
            <th>Date</th>
            <th>Time</th>
            <th>Technician</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {appointments.filter((each) => {return each.vin.toUpperCase().includes(searches.toUpperCase())}).map(appointment=> {
            return (
              <tr key={appointment.id}>
                <td>{ appointment.vin }</td>
                <td>{ appointment.name }</td>
                <td>{ appointment.vip ? "No": "Yes" }</td>
                <td>{ appointment.date }</td>
                <td>{ appointment.time}</td>
                <td>{ appointment.technician.name}</td>
                <td>{ appointment.reason}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </>
    )
}

export default ServiceHistoryList;
