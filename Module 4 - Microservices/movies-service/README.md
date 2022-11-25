# About
Here you will find how to install and run this project on your machine

## Installation
Open your project in a terminal or prompt, then follow this steps:

1. Install the application dependencies 
```
$ npm install
```
2. In the application root directory, create an archive named ".env", then write there the follow:
```
MONGODB_CONNECTION=mongodb://localhost:27017
DATABASE=movies-service
PORT=3000
MS_NAME=movies-service
SECRET=mysecret
```
3. Start the application's server
```    
$ npm start
```
4. Start the MongoDB local server
- Create an empty directory to store your database (Movies)
- Go to the directory of MongoDB, then access the /bin dictory.
- Open this dictory in another terminal/prompt or Powershell, then type:
```    
$ ./mongod --dbpath <DIRECTORY OF THE MOVIES'S DATA PATH> --port 27017
```
5. Go to Module 4 - Module 4 - Microservices\movies-service\seeds\movies.json then copy it's content
6. In MongoDB Compass, in Mongosh (command line), do the following comands:
```    
> use movies-service
> db.movies.insertMany(<PASTE HERE THE CONTENT YOU JUST COPIED>);
```

## Closing server
> You will need your APIs and MongoDB servers running for the application to work. 
> 
> In total, will be 3 terminals/prompts or Powershell tabs for the three API's (Gateway, Cinema Catalog and Movies) more 3 for it's respectives MongoDB Servers.
>
> This is necessary to simulate an Microservice architecture, where the API's are separeted from each other and each has it's own MongoDB servers separeted too.
> So **don't close** this server until you test the all applications and MongoDB server running.

To close your server, just type **Ctrl + C** both in your application and MongoDB server.
