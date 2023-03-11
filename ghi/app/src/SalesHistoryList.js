import {useState, useEffect} from 'react';

function SalesHistoryList(){
    const[sales_records, setSales_records] = useState([])
    const[sales_person, setSales_person] = useState('')
    const[sales_persons, setSales_persons] = useState([])

    const handleSales_personChange = event => {
        const value = event.target.value
        setSales_person(value)
    }

    const getSalesrecord = async () => {
        const sales_recordUrl = 'http://localhost:8090/api/salerecords/';
        const sales_recordResponse = await fetch(sales_recordUrl);
        if (sales_recordResponse.ok) {
            const sales_recordData = await sales_recordResponse.json();
            setSales_records(sales_recordData.sale_record)
        }
    }
    const getSales_person = async () => {
        const sales_personUrl = 'http://localhost:8090/api/salespersons/';
        const sales_personResponse = await fetch(sales_personUrl);
        if (sales_personResponse.ok) {
            const sales_personData = await sales_personResponse.json();

            setSales_persons(sales_personData.sales_person)
        }
    }

    useEffect(() => {
        getSalesrecord();
        getSales_person();
    }, [])

    const filterDropdown = sales_records.filter((sales_record) => sales_record.sales_person.name === sales_person)


    return(
        <>
        <h1 className="card-title">Sales Person History</h1>
            <select onChange={handleSales_personChange} value={sales_person} name="sales_person" id="sales_person" className="form-select">
                <option value="" >Select Sales Person</option>
                {sales_persons.map(sales_person => {
                    return (
                        <option value={sales_person.name} key={sales_person.name}>
                            {sales_person.name}
                        </option>
                    )
                })}
            </select>
        <table className="table table-striped">
        <thead>
          <tr>
            <th>Sales Person</th>
            <th>Customer</th>
            <th>Vin</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {filterDropdown.map(sales_record=> {
            return (
              <tr key={sales_record.href}>
                <td>{ sales_record.sales_person.name }</td>
                <td>{ sales_record.customer.name }</td>
                <td>{ sales_record.automobile.vin }</td>
                <td>{ sales_record.price }</td>
              </tr>
            );
          })}
        </tbody>
        </table>
        </>

      );
}
export default SalesHistoryList;
