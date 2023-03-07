import {useState, useEffect} from 'react';

function AutomobileList(){
    const [automobiles, setAutomobiles] = useState([])
    const getAutomobile = async () => {
    const automobileResponse = await fetch('http://localhost:8100/api/automobiles/');
    if (automobileResponse.ok) {
        const data = await automobileResponse.json();
        setAutomobiles(data.autos)
    }
    }
    useEffect(() => {
        getAutomobile();
    }, [])
    return (
        <>
        <h1 className="card-title">Automobiles</h1>
        <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Color</th>
            <th>Year</th>
            <th>Model</th>
            <th>Manufacturer</th>
          </tr>
        </thead>
        <tbody>
          {automobiles.map(automobile=> {
            return (
              <tr key={automobile.href}>
                <td>{ automobile.vin }</td>
                <td>{ automobile.color }</td>
                <td>{ automobile.year }</td>
                <td>{ automobile.model.name }</td>
                <td>{ automobile.model.manufacturer.name }</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </>
    )
}
export default AutomobileList;
