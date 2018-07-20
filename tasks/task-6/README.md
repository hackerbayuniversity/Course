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

## Tasks

#### Step 1: Create a new NodeJS Project with Express. 

- Create a `git` repo on your GitHub account. 
- Create a simple NodeJS project. 
- Install `express` with NPM.
- Run the project, and make sure everything looks okay. 
- If you have questions on any of these steps. Please google them out. 


#### Step 2: Your First API. 

Today, you'll be creating your first GET and POST API's. If you don't know what they are. Please checkout [this video.](https://www.youtube.com/watch?v=UObINRj2EGY). 

 - Create a GET API. This is a very simple API and returns `{status: success}` as response. 
 
 ```
 Request Type: GET
 Route: /
 Response: {status: success}
 ```

 - Create a POST API. POST API's are used to save data on the server. Take a request payload `{data: 'Any String'}`. Create a variable that's ourside API scope and saev the data there, once you're done doing that return the same data in the request.  
 
 ```
 Request Type: POST
 Route: /data
 Request: {data: 'Any String'}
 Response: {data: 'Any String'}
 ```


 - Create a GET API. This GET API will be used to get the data that you've saved before with POST. 
 
 ```
 Request Type: GET
 Route: /data
 Response: {data: 'Any String'}
 ```
 
 There are a lot of reousrces on Google on how to build API's with express. Please google these resources if you're stuck. 
 
 
 #### Step 3: Push your changes to Git
 
 Push all your changes to your GitHub Repo. 

## Deliverable

Please submit your GitHub Repo to your mentor as soon as you're done, so he or she can review. 




