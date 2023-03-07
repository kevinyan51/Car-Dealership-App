import {useState, useEffect} from 'react';
function VehicleList() {
    const[vehicles, setVehicle] = useState([])
    const getVehicle = async () => {
    const VehicleResponse = await fetch('http://localhost:8100/api/models/');
    if (VehicleResponse.ok) {
        const data = await VehicleResponse.json();
        setVehicle(data.models)
    }
    }
    useEffect(() => {getVehicle();}, [])
    return (
        <>
        <h1 className="card-title">Vehicle models</h1>
        <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map(vehicle=> {
            return (
              <tr key={vehicle.href}>
                <td>{ vehicle.name }</td>
                <td>{ vehicle.manufacturer.name}</td>
                <td className="align-middle"><img src={vehicle.picture_url} alt="" height="100" width="100"></img></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </>
    )
}
export default VehicleList;
