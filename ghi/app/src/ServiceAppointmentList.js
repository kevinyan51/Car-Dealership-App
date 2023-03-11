import {useState, useEffect} from 'react';

function ServiceAppointmentList() {

    const[appointments, setAppointments] = useState([])
    const getAppointment = async () => {
      const ServiceResponse = await fetch('http://localhost:8080/api/service/');
      if (ServiceResponse.ok) {
          const data = await ServiceResponse.json();
          setAppointments(data.appointments)
      }
  }
    const CancelAppointment = async (id) => {
        fetch(`http://localhost:8080/api/service/${id}/`, {
            method: 'delete'
        })
        .then(() => {
            return getAppointment()
            })
    }
    const CompletedAppointment = async (id) => {
      const finished = appointments.find((appointment) => appointment.id === id);
      finished.completed = true;
      const url = `http://localhost:8080/api/service/${id}/`
      const fetchConfig = {
        method: 'put',
        body: JSON.stringify(
          {completed: true}
        ),
        headers: {
          'Content-Type': 'application/json',
        }
      }
      await fetch(url, fetchConfig)
      getAppointment()
    }
      const CompletedFilter = appointments.filter((appointment) => appointment.completed === false);

    useEffect(() => {getAppointment();}, [])
    return (
        <>
        <h1 className="card-title">Service appointments</h1>
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {CompletedFilter.map(appointment=> {
            return (
              <tr key={appointment.id}>
                <td>{ appointment.vin }</td>
                <td>{ appointment.name }</td>
                <td>{ appointment.vip ? "No": "Yes" }</td>
                <td>{ appointment.date }</td>
                <td>{ appointment.time}</td>
                <td>{ appointment.technician.name}</td>
                <td>{ appointment.reason}</td>
                <td>
                <button type="button" className="btn btn-danger" onClick={ () => CancelAppointment(appointment.id)}>Cancel</button>
                <button type="button" className="btn btn-success" onClick={ () => CompletedAppointment(appointment.id)}>Completed</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </>
    )
}
export default ServiceAppointmentList;
