# Task 7 - Relationships - Part 1 (Tests)

## Objectives

- Write unit tests for your backend and test relationships. 
- Use a Code Coverage Tool

## Learning Resources

Here are the list of learning resources for this task. 

Topic | Resource
------------ | -------------
Why unit tests? | [Link to this resource](https://www.youtube.com/watch?v=Eu35xM76kKY)
Your first tests | [Link to this resource](https://www.youtube.com/watch?v=XsFQEUP1MxI)
Intro to JavaScript Unit Tests with Mocha and Chai | [Link to this resource](https://www.youtube.com/watch?v=MLTRHc5dk6s)
Unit Testign with Mocha and Chai | [Link to this resource](https://www.youtube.com/playlist?list=PLXSs3HKyWAE5k-l3edQLn8uai4-WHHudB)
Using Travis with GitHub for CI & CD | [Link to this resource](https://www.youtube.com/watch?v=Uft5KBimzyk)


## Tasks

#### Step 1: Testing your API from Task 6.

- You've created two API's on Task 6. 
- You've now got to write tests for all of these API's that you've created. 
- For `POST /website/add`
     - Make sure it returns 200 after the post with request string. 
     - Make sure it returns 400 when data is null
     - Make sure it returns 400 whenn URL is invalid. 
     - Make sure it returns 400 when you have the same name or url. 
     - Make sure it return 401 when user is not authenticated. 
- For `GET /data`
     - Make sure it returns 200 with empty array when no data is inserted.  
     - Make sure it returns 200 with list of items when they are inserted. 
     - Make sure it return 401 when user is not authenticated.  
     
#### Step 2: Use CodeCov 

- Make sure CodeCov is > 80%
 

## Deliverable

- GitHub repo of your project with Travis file in it which shows Code Cov > 80%. 


