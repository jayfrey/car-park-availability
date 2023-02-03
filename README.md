# Carpark Availability
A simple website that displays the lowest and highest carpark available lots along with the carpark numbers. The content will be auto-refreshed every 60 seconds.

### Prerequisite
* Docker (20.10.17)
* Docker Compose (v2.10.2)

### Tech Stack
* Express (4.18.2)
* React


### Installation
Navigate to the app folder in terminal and run the following commands in sequence.
```sh
cd carpark-availability
```

After finish deploying the table, spin up the stack by running the following command
```sh
docker-compose up -d
```

To healthcheck the stack. API service should be in healthy state 
```sh
docker ps
```

### Visit the website
Assuming all of the necessary services have started and are in healthy state. You may click [here](http://localhost/) to visit the application.
