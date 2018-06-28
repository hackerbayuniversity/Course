# Task 2 - Connecting to your database.

## Objectives

- Learn how to connect to database from your backend. 
- Learn how to save and query data from your databse. 
- Learn Authentication with Passport + JWT. 

## Learning Resources

Here are the list of learning resources for this task. 

Topic | Resource
------------ | -------------
How NOT to store passwords | [Link to this resource](https://www.youtube.com/watch?v=8ZtInClXe1Q)
Authentication with PassportJS | [Link to this resource](https://www.youtube.com/watch?v=Z1ktxiqyiLA)
JSON Web Tokens | [Link to this resource](https://www.youtube.com/watch?v=7nafaH9SddU)
PassportJS with JWT | [Link to this resource](https://www.youtube.com/watch?v=f4F0brwbYKg)
Sequelize | [Link to this resource](https://www.youtube.com/playlist?list=PL5ze0DjYv5DYBDfl0vF_VRxEu8JdTIHlR)


## Important

Please use the same Git Repo for all the tasks. Continue working on the repo that you've worked on for Task 1. 

## Tasks

#### Step 1: Things you'll use. 

- You'll be working with PostgreSQL as the database. If you don't have that installed locally already. You should. 
- You'll be working on a standard and a very simple `Local Startegy` with PassportJS. This give you a simple login and signup mechanism as any other service out on the internet.
- Here's the schema of the user table in the database. 
```
id: Randomly Generated ID by the DB. 
email: Email of the user. 
password: Encrypted Password of the user. 
```

#### Step 2: Create a user sign up API. 

- Create a POST API which takes in email and password, saves those credentials in the User Table in the database. Returns `{session: <token>}` as response.

```
Request Type: POST
Route: /user/signup
Request Body: {email: sample@sample.com, password: "SamplePassword"}
Response Code: 200 
Response Body: {session: <token>}
```

- Before you save a new user. Check for existing email and if that's found, return Status Code 400
 
```
Request Type: POST
Route: /user/signup
Request Body: {email: sample@sample.com, password: "SamplePassword"}
Response Code: 400 
Response Body: {error: "User already exists."}
```


#### Step 3: Login API 

- Create a POST API which takes in email and password, validates those credentials with the User Table in the database. Returns `{session: <token>}` as response. 
 
```
Request Type: POST
Route: /user/login
Request Body: {email: sample@sample.com, password: "SamplePassword"}
Response Code: 200 
Response Body: {session: <token>}
```

- If you have an invalid password

```
Request Type: POST
Route: /user/login
Request Body: {email: sample@sample.com, password: "WrongPassword"}
Response Code: 400 
Response Body: {error: "Invlaid Password"}
```

- If the user does not exists. 

```
Request Type: POST
Route: /user/login
Request Body: {email: invalidemail@sample.com, password: "SamplePassword"}
Response Code: 400 
Response Body: {error: "User does not exist."}
```
 

## Deliverable

Push all your changes to your GitHub Repo. Please submit your GitHub Repo to your mentor as soon as you're done, so he or she can review. 


