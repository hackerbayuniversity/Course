# Task 1 - Your first API

## Objectives

- Learn how server programming works and create your first get and post API. 

## What are you building? 

[Please read this](/app/README.md)

## Learning Resources

These resources are exactly the one in the [Precourse Learning Resources](/tasks/precourse/README.md). Our aim for this week is to be thorough with these concepts first and apply them on the task mentioned below.

Topic | Resource
------------ | -------------
HTML and CSS | [Link to this resource](https://www.youtube.com/watch?v=yTHTo28hwTQ&list=PLgGbWId6zgaWZkPFI4Sc9QXDmmOWa1v5F)
JavaScript for beginners | [Link to this resource](https://www.youtube.com/watch?v=yQaAGmHNn9s&list=PL46F0A159EC02DF82)
Serverside Programming with NodeJS | [Link to this resource](https://www.youtube.com/watch?v=65a5QQ3ZR2g&list=PL55RiY5tL51oGJorjEgl6NVeDbx_fO5jR)
Algorithms | [Link to this resource](https://www.coursera.org/learn/algorithms-part1)
PostgreSQL | [Link to this resource](https://www.youtube.com/watch?v=CkjQSkWl0F0&list=PLFRIKEguV54bgwAcgFiOs5GMo3q2DhVDj)


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


 - Create a POST API. POST API's are used to save data on the server. Take a request payload `{data: 'Any String'}`. Create a variable that's outside API scope and save the data there, once you're done doing that return the same data in the request.  

 
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
 
 There are a lot of resources on Google on how to build API's with express. Please google these resources if you're stuck. 
 
 
 #### Step 3: Push your changes to Git
 
 Push all your changes to your GitHub Repo. 

## Deliverable

Please submit your GitHub Repo to your mentor as soon as you're done, so he or she can review. 




