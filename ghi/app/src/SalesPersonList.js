import {useState, useEffect} from 'react';
function SalesPersonList() {
    const[sales_persons, setSales_person] = useState([])
    const getSales_person = async () => {
    const sales_personResponse = await fetch('http://localhost:8090/api/salespersons/');
    if (sales_personResponse.ok) {
        const data = await sales_personResponse.json();
        setSales_person(data.sales_person)
    }
    }
    useEffect( () => {getSales_person();}, [])
    return (
        <>
        <h1 className="card-title">Sales Person</h1>
        <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Employee Number</th>
          </tr>
        </thead>
        <tbody>
          {sales_persons.map(sales_person=> {
            return (
              <tr key={sales_person.id}>
                <td>{ sales_person.name }</td>
                <td>{ sales_person.employee_number }</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </>
    )
}
export default SalesPersonList;
