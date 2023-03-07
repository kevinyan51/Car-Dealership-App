import {useState, useEffect} from 'react';
function ManufacturerList() {
    const[manufacturer, setManufacturer] = useState([])
    const getManufacturer = async () => {
    const manufacturerResponse = await fetch('http://localhost:8100/api/manufacturers/');
    if (manufacturerResponse.ok) {
        const data = await manufacturerResponse.json();
        setManufacturer(data.manufacturers)
    }
    }
    useEffect( () => {getManufacturer();}, [])
    return (
        <>
        <h1 className="card-title">Manufacturers</h1>
        <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {manufacturer.map(manufacturers=> {
            return (
              <tr key={manufacturers.id}>
                <td>{ manufacturers.name }</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </>
    )
}
export default ManufacturerList;
