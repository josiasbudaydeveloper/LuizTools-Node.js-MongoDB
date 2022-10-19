# About
Here you will find how to install and run this project on your machine

## Installation
Open your project in a terminal or prompt, then follow this steps:

1. Install the application dependencies 
```
$ npm install
```
2. In the application root directory, create a archive named ".env", then write there the follow:
```
MOVIES_API=http://localhost:3000
CINEMA_CATALOG_API=http://localhost:3001
PORT=4000
SECRET=mysecret
EXPIRES=1800
MONGODB_CONNECTION=mongodb://localhost:27019
DATABASE=api-gateway
```
3. Start the application's server
```    
$ npm start
```
4. Start the MongoDB local server
- Create an empty directory to store your database (API Gateway)
- To do this, go to the directory of MongoDB, then access the /bin dictory.
- Open this dictory in another terminal/prompt or Powershell, then type:
```    
$ ./mongod --dbpath <API GATEWAY DIRECTORY PATH> --port 27019
```
- In MongoDB Compass, in Mongosh (command line), do the following comands:
```    
> use api-gateway
> db.users.insertMany([{
      "email": "admin@test.com",
      "password": "$2a$12$ZrZXzdbZwn8JVzbJVrZ9TecaxFcpxemjOlNXNtFHO6lTs6V3e.vhm"
    },
    {
      "email": "guest@test.com",
      "password": "$2a$12$ZrZXzdbZwn8JVzbJVrZ9TecaxFcpxemjOlNXNtFHO6lTs6V3e.vhm"
  }]);
```
5. Create an index in MongoDB Compass to add automatic timout JWT key deletion

Read the file Module 4 - Microservices/api-gateway/seeds/ttlBlackList.js

## These are the routes of the application:
> **All API servers and MongoDB servers must be running to work!**
> 
> All routes, except **/login** must be logged in to work!
> 
> Excepting the API Gateway's Routes, routes with POST and DELETE method can only be accessed by the admin user.
### API Gateway's Routes
#### POST: http://localhost:4000/login - To do Login
#### POST: http://localhost:4000/logout - To do Logout

### Cinema Catalog service's Routes
#### GET: http://localhost:4000/cities - Returning all cities we have cinemas
#### GET: http://localhost:4000/cities/:cityId/cinemas - Returning all cinemas in a specific city
#### GET: http://localhost:4000/cities/:cityId/movies - Returning all movies in a specific city
#### GET: http://localhost:4000/cities/:cityId/movies/:movieId - Returning all movie sessions in a specific city
#### GET: http://localhost:4000/cinemas/:cinemaId/movies - Returning all movies in specific cinema
#### GET: http://localhost:4000/cinemas/:cinemaId/movies/:movieId - Returning all movie sessions in a specific cinema

### Movies service's Routes
#### GET: http://localhost:4000/movies - Returning all movies
#### GET: http://localhost:4000/movies/:id - Returning a specific movie
#### GET: http://localhost:4000/movies/premieres - Returning all premiere movies
#### POST: http://localhost:4000/movies - Posting a movie
#### DELETE: http://localhost:4000/movies - Deleting a movie

## Testing
To test this application, just follow the steps bellow:
1. Download a Rest Client. I recommend Httpie -> https://httpie.io/
2. Open your Test Client and test the functionalities

> What you do will be saved, because all data are being stored in your MongoDB archives.

## Closing server
To close your server, just type **Ctrl + C** both in your application and MongoDB server.
