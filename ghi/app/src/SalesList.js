import {useState, useEffect} from 'react';

function SalesList(){
    const[sales_records, setSales_records] = useState([])
    const getSalesrecord = async () => {
    const sales_recordResponse = await fetch('http://localhost:8090/api/salerecords/');
    if (sales_recordResponse.ok) {
        const data = await sales_recordResponse.json();
        setSales_records(data.sale_record)
    }
    }
    useEffect(() => {
        getSalesrecord();
    }, [])
    return (
        <>
        <h1 className="card-title">Sales List</h1>
        <table className="table table-striped">
        <thead>
          <tr>
            <th>Sales Person</th>
            <th>Employee Number</th>
            <th>Customer</th>
            <th>Vin</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {sales_records.map(sales_record=> {
            return (
              <tr key={sales_record.href}>
                <td>{ sales_record.sales_person.name }</td>
                <td>{ sales_record.sales_person.employee_number }</td>
                <td>{ sales_record.customer.name }</td>
                <td>{ sales_record.automobile.vin }</td>
                <td>{ sales_record.price }</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </>
    )
}
export default SalesList;
