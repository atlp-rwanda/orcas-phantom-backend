[![Build Status](https://travis-ci.org/atlp-rwanda/orcas-phantom-backend.svg?branch=ch-traviscov-backend)](https://travis-ci.org/atlp-rwanda/orcas-phantom-backend)
[![Coverage Status](https://coveralls.io/repos/github/atlp-rwanda/orcas-phantom-backend/badge.svg?branch=develop)](https://coveralls.io/github/atlp-rwanda/orcas-phantom-backend?branch=develop)

# orcas-phantom-backend

Phantom is a web application that allows passengers to track bus location and movements around Kigali.

# API Documentation :pencil:
API endpoints Documentation are hosted [Here](https://phantom-backend.herokuapp.com/swaggerDocument/)

## Technologies && Tools

* [NodeJS](https://nodejs.org/) - JavaScript Runtime Environment.
* [ExpressJs](https://expressjs.com/) - A Minimal  Web Application Framework.
* [postgres](https://www.postgresql.org/) -open source object-relational database system.
* [jest](https://jestjs.io/) - A JavaScript test framework for Node.js programs, asynchronous testing, test coverage reports, and use of any assertion library.
* [Docker](https://www.docker.com) - is an application for MacOS and Windows machines for the building and sharing of containerized applications and microservices.
* [ESLint](https://eslint.org/) -  is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code. In many ways, it is similar to JSLint and JSHint with a few exceptions.
* [Travis](https://travis-ci.org) - is CI/CD Method used. 

## Getting Started

 ### Prerequisites

 Ensure you have NodeJS installed on your computer by entering  `node -v ` on your terminal. If you don't have NodeJS installed go to the [NodeJS Website](https://nodejs.org/en/download/), and follow the download instructions
 
### Installation

Clone the app
* ```https://github.com/atlp-rwanda/orcas-phantom-backend.git```

Install all the packages
* ```npm install ```

Run the server
*  ```npm start ```

## Testing
Run Test case
* ```npm run test```


## Working Routes

| Endpoint                |             Functionality             |
| ----------------------- | :-----------------------------------: |
| POST /api/login         |    admin log into his/her account     |
| POST /api/signup        |    admin create his/her account       |
| GET /api/users/         |    admin get all users                |
| GET /api/users/:id     |    admin get a specific user by id    |
| PATCH /api/users/:id   |    admin update a specific user       |
| DELETE /api/users/:id  |    admin delete a specific user       |
| GET /routes             |    admin get all routes               |
| GET /routes/:id         |    admin get a specific route by id   |
| POST /routes            |    admin add a new route              |
| DELETE /routes/:id      |    admin delete a specific route      |
| PATCH /routes/:id       |    admin update a specific route      |
| POST /busstop           |    admin create a new bus stop        |
| GET /busstop            |    admin get all bus stops            |
| GET /busstop/:id        |    admin get all bus stop by id       |
| PATCH /busstop/:id      |    admin update a bus stop            |
| DELETE /busstop/:id     |    admin delete a specific bus stop   |
| POST /buses             |    admin create a new bus             |
| GET /buses              |    admin get all buses                |
| GET /buses/:busId       |    admin get a specific bus by id     |
| PATCH /buses/:busId     |    admin update a specific bus by id  |
| DELETE /buses/:busId    |    admin delete a specific bus by id  |


### contributors

* [Orcas Phantom backend team](https://github.com/atlp-rwanda/orcas-phantom-backend.git) 
* [Isaac Komezusenge](https://github.com/Isaackomeza) 
* [Fiston Habimana](https://github.com/fistonhn)
* [Giraneza Fiacre](https://github.com/giranezafiacre)
* [Ange Imaraika](https://github.com/Imaraika)
* [Marius Robert Rwandarushya](https://github.com/Rwandarushya)
* [Eric Malaba](https://github.com/Malaba6)
* [Emmanuel Monehin](https://github.com/Monehin)
* [Maxime Ishimwe](https://github.com/maximeish)

### Acknowledgement

* [Andela Kigali - Rwanda](https://github.com/atlp-rwanda)