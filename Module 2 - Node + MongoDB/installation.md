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
3. Start the MongoDB local server
  
- To do this, go to the directory of MongoDB, then access the bin dictory.
- Open this dictory in another terminal/prompt or Powershell, then type:
```    
    ./mongod --dbpath <DIRECTORY OF THE DATA PATH>
```  

## Testing
To test this application, just follow the steps bellow:
1. Open your browser
2. Type **https://localhost:3000**
3. Just test the functionalities (do a CRUD - Create, Read, Update and Delete)

> What you do will be saved, because all data are being stored in your MongoDB archives.

## Closing server
To close your server, just type **Ctrl + C** both in your application and MongoDB servers. 