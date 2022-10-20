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
MONGODB_CONNECTION=mongodb://localhost:27017
PORT=3000
NODE_ENV=production
```
3. Start the application's server
```    
$ npm start
```
4. Start the MongoDB local server
- Create an empty directory to store your database 
- Go to the directory of MongoDB, then access the /bin dictory.
- Open this dictory in another terminal/prompt or Powershell, then type:
```    
$ ./mongod --dbpath <DIRECTORY OF THE DATA PATH>
```

## Testing
To test this application, just follow the steps bellow:
1. Open your browser
2. Type **http://localhost:3000**
3. Just test the functionalities (do a CRUD - Create, Read, Update and Delete)

> What you do will be saved, because all data are being stored in your MongoDB archives.

## Closing server
To close your server, just type **Ctrl + C** both in your application and MongoDB server.
