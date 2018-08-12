
# Task 8 - Working with Dashboard

## Objectives

- Build a dashboard which shows essential features. 

## Learning Resources

Here are the list of learning resources for this task. 

Topic | Resource
------------ | -------------
Learn ReactJS | [Link to this resource](https://www.youtube.com/playlist?list=PLoYCgNOIyGABj2GQSlDRjgvXtqfDxKm5b)
Learn Redux | [Link to this resource](https://www.youtube.com/playlist?list=PLoYCgNOIyGADILc3iUJzygCqC8Tt3bRXt)
ES6 | [Link to this resource](https://www.youtube.com/playlist?list=PLoYCgNOIyGACDQLaThEEKBAlgs4OIUGif)
Redux Forms | [Link to this resource](https://www.youtube.com/watch?v=ey7H8h4ERHg)
React, Redux Tutorial | [Link to this resource](https://medium.com/@notrab/getting-started-with-create-react-app-redux-react-router-redux-thunk-d6a19259f71f)


## Tasks

#### Step 1: Create an Add website form. 

![Add Website](https://raw.githubusercontent.com/hackerbayuniversity/Course/master/tasks/task-8/Screen%20Shot%202018-08-12%20at%2011.57.25%20AM.png)

- Create an Add Webiste form that takes in the name and url and submit it to the api. 
- Make sure you have actions and reducers for: 
  - addWebsiteRequest - Use this action when you initiate the request. You would ideally show the loading indicator in the UI 
  - addWebsiteSuccess - Use this action when the request is successfully completed. Add this website to the list (look for Step 2)
  - addWebsiteFailed - Use this action when the request failed. Show the error in the UI.
  - addWebsiteReset - Make the add website state to initial state. 

#### Step 2: Create a Website List 

![List Websites](https://raw.githubusercontent.com/hackerbayuniversity/Course/master/tasks/task-8/Screen%20Shot%202018-08-12%20at%2012.01.27%20PM.png)

- List websites saved into the DB. Make sure you create and use four actions and reducers (i.e - Request, Success, Failed and Reset) like you've made in step 1.

#### Step 3: Create a logout feature. 

- Implement the log out feature. When this is clicked. Clear sessions and local storage, and navigate to sign in. 

![Log out](https://raw.githubusercontent.com/hackerbayuniversity/Course/master/tasks/task-8/Screen%20Shot%202018-08-12%20at%2012.01.31%20PM.png)
  
## Deliverable

Your first dashboard page should look like this: 

![Your Dashboard Page](https://raw.githubusercontent.com/hackerbayuniversity/Course/master/tasks/task-8/Screen%20Shot%202018-08-12%20at%2012.01.37%20PM.png)

- Push all the changes to your GitHub. 
- Make a screencast that shows all of this functionality to your mentor. You can use any free screencast tool. 


