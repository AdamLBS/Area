# Backend documentation

## Backend stack
Stratos backend service uses [AdonisJS](https://adonisjs.com/) tech.

### Prerequisites
You should install node 18.
To launch the backend project, you should install [docker](https://www.docker.com/) first.

### Docker
Before trying to run the project, you should install all images required for the backend.
The Dockerfile builds the project and the docker-compose pulls the Postgresql image.
Run these commands below:

`docker pull node:18-alpine3.18`
`docker-compose up --build`

### To run:
Clone the backend project.
Run these commands below:
`yarn`
`yarn dev` -> to run the dev mode

All configurations for the Postgresql are for the dev mode.
On the docker dashboard, you can see your containers that are running called "backend".
You can only run the "PostgreSQL" service to test your code.
The "adonis" container builds the adonisJS project to test the "production" mode but you can just run `yarn dev` instead
