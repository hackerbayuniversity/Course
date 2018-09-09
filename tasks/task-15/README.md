# Task 15 - Conclusion and What's next. 

## Objectives

- Learn why container orchestration is important. 
- Learn Kubernetes. 

## Learning Resources

Here are the list of learning resources for this task. 

Topic | Resource
------------ | -------------
What is Kubernetes | [Link to this resource](https://www.youtube.com/watch?v=F-p_7XaEC84)
Learn Kubernetes | [Link to this resource](https://www.youtube.com/watch?v=R-3dfURb2hA&list=PLbG4OyfwIxjFE5Ban_n2JdGad4EDWmisR)
Kubernetes Tutorial | [Link to this resource](https://www.youtube.com/watch?v=tqr581_bBM0&list=PLot-YkcC7wZ9xwMzkzR_EkOrPahSofe5Q)

## Tasks

#### Step 1: Deploy Replication Controllers for Frontend and the Backend. 

- Create Kubernetes Replication Controller and Pods for Frontend and Backend. [Check this out to learn what replication controllers are](https://kubernetes.io/docs/concepts/workloads/controllers/replicationcontroller/). 

- Make sure the pod count of Frontend and Backend is 1 if you're running this locally. If you're running this in production, pod count should atleast be 3. 

- Make sure backend connects to PostgreSQL properly. 

#### Step 2: Deploy Services. 

- Create two services one for the frontend and one for the backend. Connect these services to Kubernetes RC's. 
- Services will expose a public IP address that you can then attach to your Domain's DNS. (If you have a domain you already own, try this out. If you don't have a domain. You can buy one or completely ignore this point.)

#### Step 3: Deploy Autoscaling Rules

- [Set up Autoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/) for frontend and the backend. 

#### Step 4: Test

- Test if the service is working properly. 

## Deliverable

- Push your kubernetes `yaml` or `json` files to your new GitHub repo. 


