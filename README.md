# CarsNow

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
Service Backend:
I started by adding the service app into the service project. I created a technician model, Service Appointment model and a Automobile VO model because i identified that the automobile model was in a seperate microservice and so I would poll for it later. First I identified that my service appointment model needed the ability to select a technician so i identified a one to many relationship there and did not create a one to many relationship for my vin so that cars outside the dealership can also create an appointment. I ran the migrations and moved onto the views file and started with writing encoders and view functions. I created an encoder for each of my three models. I created view functions to list my technicians and to create one. I did the same with my appointment forms but also added a 'PUT' and 'DELETE' method in order change whether or not it is completed. For the function getting the list of appointments, i used a try block for technicians because its the only one that needs data from another model. In order to test it, I had to move on to getting the poller to work. I created a function to poll the data from the list of automobiles from the Inventory microservice. I added the url's into both the service app and for the service project to accept all the paths from the service app. After getting this all to work, I moved onto the front-end

Service Frontend:
I started off with the Technician form which was done very similarly to all the other forms with the use of useState because I did not need the useEffect since it was not necessary to get data from anywhere else in order to fill out this form. I moved onto the service appointment form, which again was done very similarly to prior forms. It needed a selection of technicians so i created a drop down for it but that also meant I needed to use the React hook, useEffect so I wrote a function to fetch the data from technician and used useState to store it as well so I could utilize the map function in my JSX. Next, I moved on to the service appointment list, similarly to how the other lists were done, i needed to fetch the data of all the appointments. Along with that, I needed to be able to cancel and mark it as completed. For the canceling button, I set it up as a delete method with the specific id. For the 'completed' button, I wanted to make sure that I was only filtering appointments that were not completed yet since I set the default in my models to be false so all newly created appointments were not completed but clicking the completion button would send a 'PUT' request and change completed to be true and since the list is filtered by only those which are not complete, it will remove itself without deleting itself. Lastly, I worked on the Service History List. The idea of implementation to the form in general was very similar to all the other lists i did. The only exception was that I wanted to store the searches being typed into my search bar to compare if it was a vin that was existant in the service appointment history and pull up all the prior appointments. I wanted the searches to be compatible lower or uppercase so I had to convert both the search and the vins to be uppercase so even when a lowercase vin was typed, the same equivalent would be found and filtered. After that, all that was left was to use map in the JSX in order to display all of history of appointments for that particular vin.

Paths used:
CRUD/Insomnia:
http://localhost:8100/api/manufacturers/: used for listing and creating a manufacturer
http://localhost:8100/api/models/: used for listing and creating a vehicle model
http://localhost:8100/api/automobiles/: used for listing and creating a vehicle model
http://localhost:8080/api/technician/: used for listing and creating a technician
http://localhost:8080/api/service/: used for listing and creating an appointment
http://localhost:8080/api/service/id/: used for updating appointment 'completed' to be true or to cancel appointment
Polling:
http://inventory-api:8000/api/automobiles/: used for polling to get list of automobiles
React Frontend:
http://localhost:3000/manufacturer: list of manufacturers
http://localhost:3000/manufacturer/new: form to create a new manufacturer
http://localhost:3000/vehicle: list of vehicle models
http://localhost:3000/vehicle/new: form to create a new vehicle model
http://localhost:3000/automobile: list of automobiles
http://localhost:3000/automobile/new: form to create a new automobile
http://localhost:3000/technician: form to create a technician
http://localhost:3000/service/new: form to create a new service appointment
http://localhost:3000/service: list of all service appointments
http://localhost:3000/service/history: list of service history(searchable)
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
