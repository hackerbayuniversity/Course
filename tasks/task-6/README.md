# Task 6 - Relationships 

## Objectives

- Learn how to work with relationships in the database. 

## App we're building. 

We're building a website monitoring software. [Please read this document for details](/app/README.md) 

## Learning Resources

Topic | Resource
------------ | -------------
PostgreSQL | [Link to this resource](https://www.youtube.com/watch?v=CkjQSkWl0F0&list=PLFRIKEguV54bgwAcgFiOs5GMo3q2DhVDj)
Learning Sequelize | [Lionk to this resource](https://www.youtube.com/watch?v=-K9X9VPm4y4&list=PLIGDNOJWiL1-OJp8ZWBO2838ENa0tsy6H)
Using relationships with ORM | [Link to this resource](https://medium.com/statuscode/using-sequelize-orm-to-manage-relationships-in-a-postgresql-database-4fb3f78dfa5b)
Many to Many Relationships | [Link to this resource](https://medium.com/@THEozmic/how-to-create-many-to-many-relationship-using-sequelize-orm-postgres-on-express-677753a3edb5)

## Database Design

**Users**

Column Name | Type | Description
------------ | ------------- | -------------
ID | - | Auto Generated ID
Email | Text | Email of User
Password | Text | Password of the User

**Websites**

Column Name | Type | Description
------------ | ------------- | -------------
ID | - | Auto Generated ID
Name | Text | Name of the website you want to monitor
URL | Text | URL of the website
Status | Text | Status of the Website - if its `Online` or `Offline`
UserID | Foreign Key | FK to the User Table.

## Important

Please use the same Git Repo for all the tasks. 

## Tasks

#### Step 1: Adding a website to the database

- Create a POST API which takes in name and URL, saves data in the Website table in the database. Returns the complete object with ID `{id: <id>, name: <name>, url: <URL>, userId: <userId>}` as response.

```
Request Type: POST
Route: /website/add
Request Body: `{name: <name>, url: <URL>}`
Response Code: 200 
Response Body: `{id: <id>, name: <name>, url: <URL>, userId: <userId>}`
```

- Before you save data. Please check if the user is authenticated and is valid. 
- Please note user id is not passed from the frontend. You need to decrypt UserID from the session token. 
- You cannot add the website with the same name or the same URL. If that's the case - return 400 which means Bad Request as status code.  
- You cannot access the API without the session. If you're not logged in and you're trying to access the API. Return 401 which means Unauthorised as status code.
- Make sure default status is `Online`
 

#### Step 2: List Websites 

- Create a GET API which returns a list of websites previously saved in the DB. Returns the an array of complete object with ID `[{id: <id>, name: <name>, url: <URL>, userId: <userId>}, {... ..}]` as response.

```
Request Type: GET
Route: /website/list
Response Code: 200 
Response Body: `[{id: <id>, name: <name>, url: <URL>, userId: <userId>}, {... ..}]`
```

- Before you serve the list. Please check if the user is authenticated and is valid. 
- Please note user id is not passed from the frontend. You need to decrypt UserID from the session token. 
- If you have an empty list. Return 200 with an empty array. 
- If the user is not logged in. Return 401.

## Deliverable

Push all your changes to your GitHub Repo. Please submit your GitHub Repo to your mentor as soon as you're done, so he or she can review. 
