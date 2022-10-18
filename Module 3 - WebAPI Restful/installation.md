# About
Here you will find how to install and run this project on your machine

## Installation
Open your project in a terminal/prompt, then follow this steps:

1. Install the application dependencies 
```
    $ npm install
```
2. Start the application's server
```    
    $ npm start
```

## These are the routes of the application:
##### GET: http://localhost:3000 - Index

### All routes below require login
How?
1. In the body of your request, create and set the Authorization property to 6d7390e4-2ab6-47d3-9c3e-80b0200386bf
2. This is the key of the API, disponible in "data\keys.json"
3. Now you are logged and can use the application.

> About the POST and PUT routes, we need to follow a scheme to pass in the validation system. 
> 
> All users must be and JSON with the follow values (in lowercase):
> - name
> - age
> - uf (state)
> - password
> - email
>
> Syntax example:
> {
  "name": String,
    "age": String,
  "uf": String,
  "password": String,
  "email": String
}

##### GET: http://localhost:3000/users - Getting Users

##### GET: http://localhost:3000/users/:id - Getting a specific user

##### POST: http://localhost:3000/users/ - Creating a new user

##### PUT: http://localhost:3000/users/:id  - Updating a new user totally

##### PATCH: http://localhost:3000/users/:id - Updating a new user partially

##### DELETE: http://localhost:3000/users/:id - Deleting an user

## Testing
To test this application, just follow the steps bellow:
1. Download a Rest Client. I recommend Httpie -> https://httpie.io/
2. Open your Test Client and test the functionalities

> What you do will be saved, because all data are being stored in your JSON archives.

## Closing server
To close your server, just type **Ctrl + C**
