# CarCar

Team:

* Kevin Yan - Which microservice? Service
* Yi Li - Which microservice? Sales

## Design

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

Explain your models and integration with the inventory
microservice, here.
