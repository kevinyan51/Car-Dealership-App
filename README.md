# CarCar

Team:

* Kevin Yan - Which microservice? Service Microservice
* Yi Li - Which microservice? Sales Microservice

## Design
Getting started:
Begin by forking and cloning the repo into a directory of your own choice.
Next, make sure Docker desktop is running and you must run the following two commands in your terminal:
    ‘docker volume create beta-data’ and then 'docker compose up --build'.

## Inventory microservice
Inventory FrontEnd:
The project came an Inventory API which provided all the backend(such as models, views, urls). The inventory microservice for the front-end was a shared process. Inventory consisted of manufacturers, vehicle models and automobiles.

Manufacturer:
We began with creating a form with React. We utilized the react hook 'useState' in order to reset the form to a blank slate after its been filled out. We included JSX in our return for a form with a handle submit asynchronous function awaiting to fetch from the list of manufacturers. For our list of Manufacturers, we created a function to get the data of all of the manufacturers created through the use of the useState hook and we used the higher order function, map, in our JSX in order to show each manufacturer name. After completing the form and list, we imported it into our App.js and added the appropriate navigation links in the Nav.js.

Vehicle Model:
We began by creating a Vehicle Model form. This was done similarly to Manufacturer but because the creating of a Vehicle model form required the input of selecting a manufacturer, we needed to fetch the data from manufacturer so along with the useState hook, we also used the useEffect hook. We created a drop down selection for manufacturer instead of a text book so you may choose for an existing manufacturer. For the Vehicle Model list, we did it very similarly to how it was done with the manufacturer list, by getting all of the vehicles created and storing it with a useState hook and utilizing the map function in the JSX to display each vehicle created.

Automobile:
We identified automobile as the last one to do in the inventory front-end because it was dependent on the prior two. The automobile form was done similarly to the Vehicle form with both React hooks, useState and useEffect in order to gather data into one variable and to clear the state. The list was also done similarly fetching the data from the list of all the automobiles created and the form was created with JSX along with using the higher order function, map to display each Automobile.

URLs and Ports for Inventory microservice

List manufacturers (GET): http://localhost:8100/api/manufacturers/
Create a manufacturer (POST): http://localhost:8100/api/manufacturers/
    requires: "name"
Get a specific manufacturer (GET): http://localhost:8100/api/manufacturers/:id/
Update a specific manufacturer (PUT):	http://localhost:8100/api/manufacturers/:id/
Delete a specific manufacturer (DELETE): http://localhost:8100/api/manufacturers/:id/

List vehicle models (GET): http://localhost:8100/api/models/
Create a vehicle model (POST): http://localhost:8100/api/models/
    requires: "name", "picture_url", "manufacturer_id"
Get a specific vehicle model (GET): http://localhost:8100/api/models/:id/
Update a specific vehicle model (PUT): http://localhost:8100/api/models/:id/
Delete a specific vehicle model (DELETE): http://localhost:8100/api/models/:id/

List automobiles (GET): http://localhost:8100/api/automobiles/
Create an automobile (POST): http://localhost:8100/api/automobiles/
    requires: "color", "year", "vin", "model_id"
Get a specific automobile (GET): http://localhost:8100/api/automobiles/:vin/
Update a specific automobile (PUT): http://localhost:8100/api/automobiles/:vin/
Delete a specific automobile (DELETE): http://localhost:8100/api/automobiles/:vin/

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

For the Sales microservice, created four models: value object AutomobileVO, SalePerson, Customer and SaleRecord. There are foreign keys that link SaleRecord to saleperson, customer and automobile. Used a poller to make sure automobiles in the inventory were properly polled to the sales microservice. Created functions in the views page to show the lists of saleperson, customer and salerecord and also to create new ones. All the automobiles created have the property "sold" defaulted to false. Then when the salerecord form is created for an automobile, the property "sold" is changed to true so this can be used to filter out all the automobiles that have been sold. Registerd the functions in the urls page so they worked in insomnia.

On the frontend side, the all the sales related forms and lists were created using React, useEffect and useState. Fetched all the data using their localhost urls with the port 8090 for sales. The create a salesperson form lets you input the name and employee number for a salesperson. The create a customer form lets you input the name, address and phone number for a customer. The create a salesrecord form has dropdown lists to select an automobile that hasn't been sold, a salesperson, a customer and also an input box for the price. The sales list page displays all the sales that have been made and shows the salesperson, employee number, customer, vin and price. The sales history page has a dropdown list to select a salesperson and that will display all the sales made by the selected salesperson.

Sales microservice URLs and Ports

List automobileVO (GET): http://localhost:8090/api/automobiles

List salesperson (GET): http://localhost:8090/api/salespersons/
Create a salesperson (POST): http://localhost:8090/api/salespersons/
    requires: "name", "employee number"

List customer (GET): http://localhost:8090/api/customers/
Create a customer (POST): http://localhost:8090/api/customers/
    requires: "name", "address", "phone number"

List salesrecords (GET): http://localhost:8090/api/salerecords/
Create a salesrecord (POST): http://localhost:8090/api/salerecords/
    requires: "automobile", "salesperson", "customer", "price"
