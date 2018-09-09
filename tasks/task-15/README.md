# Task 9 - Working with Third Party API's and libraries.

## Objectives

- Learn to implement third party API and libraries with your application.
- Learn to send SMS with Twilio.

## Learning Resources

Here are the list of learning resources for this task. 

Topic | Resource
------------ | -------------
Documentation | [Link to this resource](https://www.twilio.com/docs/)


## Tasks

#### Step 1: Add a new column to user table.

- Add a Phone Number column to user table. Collect that info on the signup form.  

#### Step 2: Send SMS when Website is down. 

- Create a new account on Twilio. They have you $10 free. That's a lot to test and integrate SMS functionality.
-  In the cron job you've built in Task 10. When the website goes down, send an SMS to the user on the Phone Number you collected during signup. 
- Make sure you dont send an SMS every minute, you only send when the status changes. 
- Send an SMS when the website is back online. 


#### Step 3: Test. 

- Unit test the SMS sending function that you have created. 

## Deliverable

- Push changes to Git, make sure the build passes. 


