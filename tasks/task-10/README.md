# Task 9 - Workers

## Objectives

- Learn about background workers. 
- Learn how to implement workers in your NodeJS application.  

## Learning Resources

Here are the list of learning resources for this task. 

Topic | Resource
------------ | -------------
How to run NodeJS Cron Jobs | [Link to this resource](https://www.youtube.com/watch?v=ppFqkXJmwS0)
Node Cron Documentation | [Link to this resource](https://github.com/kelektiv/node-cron)


## Tasks

#### Step 1: Set up Cron Job 

- Create a new folder ony our backend called `workers`, and create a new file in that folder called `uptime.js`.
-  NPM install the `node-cron` module. 
- Create a new job and schedule it to run every minute. 

 
#### Step 2: Check Uptime. 

- In that job, get a list of all the websites that you have on the database for all customers. 
- Check uptime using the `request` module. (There are better ways to do it, but lets make this simpler for now.)
- If the website is down. Update the status to `offline` in the table. If the website is up, update the status to `online`. This should reflect on the dashboard when you reload the dashboard. 

#### Step 3: Test

-  Unit test the worker by adding few test websites (test cases). When you run the test, it should wait for a moinute and then check the results. Validate if the results are correct. 

## Deliverable

- Push changes to Git, make sure the build passes. 


