# Summary
This is the project summary

## What is a microservice?
A microservice is an application architecture where the many separeted APIs are connected to a central API called "API" Gateway, responsible to receive all 
requests, redirect then to its respectives APIs then return the response to the client.

Each API (including API Gateway) has its own MongoDB data separately to each other.

## Project division
The project is divided in **API Gateway**, **Cinema Catalog** and **Movies**, where the first is the Gateway and the other two are the APIs connected by it.

In this project, you will run all API servers and MongoDB servers in its own ports.

Each API project has two directories:
- /seeds - The seeds you will use to create your MongoDB collection
- /src - The API's files

> You will find more instructions in the README.md files inside directories in each APIs.
