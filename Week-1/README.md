# Week 1 - Getting Started

## Learning Resources

This document contains a list of topics that you need to learn and implement on Week 1. 

These resources are exactly the one in the [Precourse Learning Resources](/precourse/README.md). Our aim for this week is to be thorough with these concepts first and apply them on the task mentioned below.

Please note that the week here starts on Monday and ends on Sunday. 

Topic | Resource
------------ | -------------
HTML and CSS | [Link to this resource](https://www.youtube.com/watch?v=yTHTo28hwTQ&list=PLgGbWId6zgaWZkPFI4Sc9QXDmmOWa1v5F)
JavaScript for beginners | [Link to this resource](https://www.youtube.com/watch?v=yQaAGmHNn9s&list=PL46F0A159EC02DF82)
Serverside Programming with NodeJS | [Link to this resource](https://www.youtube.com/watch?v=65a5QQ3ZR2g&list=PL55RiY5tL51oGJorjEgl6NVeDbx_fO5jR)
Algorithms | [Link to this resource](https://www.coursera.org/learn/algorithms-part1)
PostgreSQL | [Link to this resource](https://www.youtube.com/watch?v=CkjQSkWl0F0&list=PLFRIKEguV54bgwAcgFiOs5GMo3q2DhVDj)


## Tasks

#### Step 1: Environment Setup

- Use an Ubuntu machine. That's the best flavor of linux out there. We embrace open source and run open source in production, so its best to have your dev environment identical to production. If you're using Windows - switch to Ubuntu. MacOS is occasionally okay since its POSIX. We DON'T recommend using one because its overpriced and gives you exactly the same functionality an Ubuntu machine would give you with third the cost. 
- Install NodeJS, NPM, Docker, PostgreSQL. 
- We use Visual Studio Code as our primary IDE. It's excellent and simple - yet feature rich. This is the same IDE majority of JavaScript developers use. If you don't have that on your machine. Please install it. 
- We use Visual Studio Code as our primary IDE. If you're using anything else, we HIGHLY recommend you to switch to Visual Studio Code. 
- IMPORTANT: Learning about debuging in VS Code is important. It'll save you days of your life (trust us!). [Please check this short 8 min video out](https://www.youtube.com/watch?v=2oFKNL7vYV8)
- IMPORTANT: [Please check this short video on Debugging in Chrome](https://www.youtube.com/watch?v=H0XScE08hy8). It's worth watching. 
- Use Chrome as primary browser. It makes devs lives simpler. 
- [Add React Dev Tools to Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
- [Add ColorZilla to Chrome](https://chrome.google.com/webstore/detail/colorzilla/bhlhnicpbhignbdhedgjhgdocnmhomnp?hl=en)
- If you need icons, svg, png's for your project - [FlatIcon](https://www.flaticon.com/) is the best reesource out there. 
- If you're looking for color matching , color combinations. Please check [Color Wheel by Adobe](https://color.adobe.com/)
- If you're looking for design inspiration. Please check [Dribbble](https://dribbble.com/)


#### Step 2: Create a new NodeJS Project with Express. 

- Create a `git` repo on your GitHub account. 
- Create a simple NodeJS project. 
- Install `express` with NPM.
- Run the project, and make sure everything looks okay. 
- If you have questions on any of these steps. Please google them out. 


#### Step 3: Your First API. 

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
 
 
 #### Step 4: Push your changes to Git
 
 Push all your changes to your GitHub Repo. 

## Deliverable

Please submit your GitHub Repo to your mentor as soon as you're done, so he or she can review. 


