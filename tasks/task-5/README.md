# Task 5 - Testing Frontend.

## Objectives

- Learn to test Frontend React and Redux applications. 
- Learn to use StorybookJS and Jest

## Learning Resources

Here are the list of learning resources for this task. 

Topic | Resource
------------ | -------------
Getting Started with React Storybook | [Link to this resource](https://www.youtube.com/watch?v=E2c183LS4lA)
React Storybook: Design, Dev, Doc, Debug Components | [Link to this resource](https://www.youtube.com/watch?v=PF0Vi-iIyoo)
Create Powerful Interactive Style Guides with Storybook | [Link to this resource](https://www.youtube.com/watch?v=cOI_k_5iOos)
Jest Course | [Link to this resource](https://www.youtube.com/watch?v=4kNfeI37xu4&list=PLLnpHn493BHEB-YOl0APuQsrzlb3zbq3y)
Jest Crash Course | [Link to this resource](https://www.youtube.com/watch?v=7r4xVDI2vho)


## Tasks

#### Step 1: Set up tests. 

- Set up React tests with Storybook and Jest
- Make sure tests run when you run `npm test`

#### Step 2: Tests for signup from.  

- When you write test for signup form, make sure: 
    - Check email validation. Check for an error and if there is an error -  pass the test.
    - When you sign up with an email that has been signed up with already. Check for an error and if there is an error - pass the test. 
    - Test the form by keeping fields blank. 
    - Fill the form properly and test redirects to an authenticated page.
 
#### Step 3: Test login form. 

- Just as you've tested signup form. Test login form too. Please make sure you cover all the edge test cases like incorrect login and password, keeping the fields blank, etc. 

#### Step 3: CI and CD

- Integrate npm test in your Travis file and make sure the build passes.   

## Deliverable

- Push changes to your frontend Git Repo with tests. 
- Make sure the build passes on Travis. 