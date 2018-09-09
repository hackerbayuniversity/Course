# Task 12 - Containerizing your projects with Docker.

## Objectives

- Learn why containers are important.
- Learn Docker.

## Learning Resources

Here are the list of learning resources for this task. 

Topic | Resource
------------ | -------------
Why Containers?  | [Link to this resource](https://blog.cloudboost.io/how-cloudboost-uses-docker-kubernetes-and-azure-to-scale-60-000-apps-d54d7eaf02c9)
Learn Docker  | [Link to this resource](https://blog.cloudboost.io/get-started-with-docker-by-watching-these-5-videos-80d25d71c1a5)
What is Docker?  | [Link to this resource](https://www.youtube.com/watch?v=lcQfQRDAMpQ)


## Tasks

#### Step 1: Dockerize your containers

- Create a Docker file in your frontend and backend repos. 
- There are templates of Docker file for NodeJS and React projects. Google these templates out and copy them. Make sure you understand that it means. 
- Build your containers. 
- Run your conatiners locally to see if everything works and test your application (both frontend and backend) properly. 

#### Step 2: Push to Docker Hub

- Create an account on Docker Hub. This is free to use for public and open source projects. 
- Create two repos on Docker Hub. One for the frontend and one for tha backend. 
- Push your images to Docker Hub. 


#### Step 3: Implement CI/CD with Containers

- Add all of the script that you've worked in Step 1 and Step 2 to your Travis file. 
- We plan to use master-release workflow. You'll have two branches in your Git Repo. One would be master and the other would be release. You'll ideally push changes to master. When you want to release your software in production. You'll merge master branch to release. 
- Please make sure you build a Docker container with tag master-<your-build-number-in-travis> when you push changes to your master branch in your Git Repo and you build with tag release-<your-build-number-in-travis> and `latest` when you push changes to your release branch.
- Ideally you'll push changes to staging server when changes are pushed in master and you'll deploy those changes i production when changes are pushed to release.  

## Deliverable

- Push changes to Git, with Dockerfile in each repo. Add links to your container images on Docker Hub in the README section of your repos. 


