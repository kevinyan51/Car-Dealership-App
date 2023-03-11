import React, { useEffect, useState} from 'react';

function SaleRecordForm(){
    const [automobile, setAutomobile] = useState('');
    const [automobiles, setAutomobiles] = useState([])
    const [sales_person, setSales_person] = useState('');
    const [sales_persons, setSales_persons] = useState([])
    const [customer, setCustomer] = useState('');
    const [customers, setCustomers] = useState([])
    const [price, setPrice] = useState('');

    const handleAutomobileChange = event => {
        const value = event.target.value
        setAutomobile(value)
    }
    const handleSales_personChange = event => {
        const value = event.target.value
        setSales_person(value)
    }
    const handleCustomerChange = event => {
        const value = event.target.value
        setCustomer(value)
    }
    const handlePriceChange = event => {
        const value = event.target.value
        setPrice(value)
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};

        data.automobile = automobile;
        data.sales_person = sales_person;
        data.customer = customer;
        data.price = price;

        const sales_recordUrl = 'http://localhost:8090/api/salerecords/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await fetch(sales_recordUrl, fetchConfig);
        if (response.ok) {
            const newSale_report = await response.json();

            setAutomobile('');
            setSales_person('');
            setCustomer('');
            setPrice('');
        }
    }

    const fetchAutoData = async () => {
        const automobileUrl = 'http://localhost:8090/api/automobiles/';
        const automobileResponse = await fetch(automobileUrl);
        if (automobileResponse.ok) {
            const automobileData = await automobileResponse.json();

            setAutomobiles(automobileData.automobiles);
        }
    }
    const fetchSales_personData = async () => {
        const sales_personUrl = 'http://localhost:8090/api/salespersons/';
        const sales_personResponse = await fetch(sales_personUrl);
        if (sales_personResponse.ok) {
            const sales_personData = await sales_personResponse.json();

            setSales_persons(sales_personData.sales_person);
        }
    }
    const fetchCustomerData = async () => {
        const customerUrl = 'http://localhost:8090/api/customers/';
        const customerResponse = await fetch(customerUrl);
        if (customerResponse.ok) {
            const customerData = await customerResponse.json();

            setCustomers(customerData.customer);
        }
    }

    useEffect(() => {
        fetchAutoData();
        fetchSales_personData();
        fetchCustomerData();
    }, []);

    return(
        <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>Create a new sale record</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <select onChange={handleAutomobileChange} value={automobile} name="automobile" id="automobile" className="form-select">
                        <option value="">Choose an automobile</option>
                        {automobiles.map(automobile => {
                            if(automobile.sold===false) {
                                return (
                                    <option value={automobile.vin} key={automobile.vin}>
                                        {automobile.vin}
                                    </option>
                                );
                            }
                        })}
                        </select>
                    </div>
                    <div className="mb-3">
                        <select onChange={handleSales_personChange} required value={sales_person} name="sales_person" id="sales_person" className="form-select">
                        <option value="">Choose a sales person</option>
                        {sales_persons.map(sales_person => {
                            return (
                                <option value={sales_person.name} key={sales_person.name}>
                                    {sales_person.name}
                                </option>
                            );
                        })}
                        </select>
                    </div>
                    <div className="mb-3">
                        <select onChange={handleCustomerChange} required value={customer} name="customer" id="customer" className="form-select">
                        <option value="">Choose a customer</option>
                        {customers.map(customer => {
                            return (
                                <option value={customer.name} key={customer.name}>
                                    {customer.name}
                                </option>
                            );
                        })}
                        </select>
                    </div>
                    <div className="form-floating mb-3">
                        <input value={price} onChange={handlePriceChange} id="price" required type="number" className="form-control"/>
                        <label> Sale Price</label>
                    </div>
                  <button className="btn btn-primary">Create</button>
                </form>
              </div>
            </div>
          </div>

      );
    }
export default SaleRecordForm;
