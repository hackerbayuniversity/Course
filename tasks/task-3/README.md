# Task 3 - Unit Tests.

## Objectives

- Learn why unit tests are important. 
- Write unit tests for your backend. 
- Integrating Travis CI and CD
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

#### Step 1: Testing your API from Task 1.

- You've created three API's on Task 1. 
    - `GET /` API which returns static JSON. 
    - `POST /data` which saves a string on the server.
    - `GET /data` which retuns the saved string on the server.
- You've now got to write tests for all of these API's that you've created. 
- For the `GET /` API. Write test that would
    - Make sure the response is 200. 
    - Make sure the JSON returned as response is valid and has all the properties. 
- For `POST /data`
     - Make sure it returns 200 after the post with request string. 
     - When you write tests. You should check every possible case. What happens when you dont pass in any request string? It should return 400 instead of 200 (which means a bad request). Please write tests for this case. 
     - What happens when you pass a JSON or a number instead of string? It should return 400 instead of 200. Please write tests for this case. 
- For `GET /data`
     - Make sure it returns 200 with the data saved. 
     - What would it return when there's no data saved? It should return 400 instead of 200.
     

#### Step 2: Test Authentication API's. 

- In the similar fashion. Test authentication API's that you have created from `Task-2`. Please make sure you think of every possible scenerio and every posisble use-case. 


#### Step 3: Integrate Travis 

- Make sure all the test run locally when you type in `npm test` into the terminal. 
- Travis is a CI and CD tool. It lets you know weather all tests passed with every single commit. This is important to know if you have not broken any other part of your code while you were working it. Integrate Travis with NodeJS and make sure the `build` runs with every single commit. 
- Make sure the build passes.
- Have a `build passed` label in your readme to showcase it on GitHub. You'll get that from Travis. 

#### Step 4: Use CodeCov 

- CodeCov is a free CodeCoverage tool for open soure projects. 
- Make sure you integrate it in the project and with Travis. 
- Add a Code Coverage label to your README.md and make sure it's >80%. 
- If Code Covergae is less than 80% then add more tests to test lines which are not covered. 
 

## Deliverable

- GitHub repo of your project with Travis file in it. 
- Travis Project building your GitHub project with a build passed signature. 
- CodeCov label on your README.md showing CodeCov > 80%. 


