## Task 1 Tutorial

##### 1. First initialize your project
` npm init`
*to skip all the questions*
`npm init -y`

##### 2. Initialize your git repository
`git init`

##### 3. Install express and body parser
*These are the only npm modules we will use for this app*
` npm install express body-parser --save`
or
` npm i express body-parser`
##### 4. Create a file called index.js
*In the command line*
`touch index.js`
##### 5. Bring express and body parser to index.js.
*On the first line write:*
```javascript
const express = require('express');
const bodyParser = require('body-parser');
```
##### 6. Initialize your app.
*Create your app variable and initialize body parser*
```javascript
const app = express();
app.use(bodyParser.json());
```
##### 7. Create your first API.
*A GET API that returns* `{ status: 'success' }`.
```javascript
app.get('/', (req, res) => {
    res.json({ status: 'success' });
});
```
##### 8. Let's test your app.
*`app.listen` takes the port where we want our app to run as the first argument and a callback function as the second one.*
*This function fires our server, it will start __listening__ to requests.*
```javascript
app.listen(3000, () => console.log('Listening on port 3000'));
```
* On the command line type `node index.js`.
* If everything went well you should see a `Listening on port 3000` in the command line.
* Now in your browser navigate to [http://localhost:3000](http://localhost:3000).
* You should see this:
```javascript
{"status":"success"}
```
##### 9. So far so good, now let's create a POST API.
*It should take the body of the request* (in this case `{ data: 'Any String }`) *and return the same object.*
*After your first API write the following:*
```javascript
// variable should be outside of the API's scope.
let data = null;
    
app.post('/data', (req, res) => {
    // We assign the body of the request to the data variable.
    data = req.body;
    // We send the data variable in the response.
    res.json(data);
});
```
    
* To test POST requests we need a app called Postman. Download it here [www.getpostman.com](https://www.getpostman.com)
* Once downloaded open the app and change the following parameters:
    * Method from **GET** to **POST**.
    * Url to http://localhost:3000/data.
    * In the **body** tab select **raw** and **JSON(aplication/json)**.
* Input the following data inside the body.
    ```json
    { "data": "Any String" }
    ```
* Make sure your server is running and hit "SEND".
* If you scroll down you should see this in the body of the response:
    ```json
    {
    "data": "Any String"
    }
    ```
##### 10. You are doing great! Now let's make our last GET API.
*This one will get the data we saved in our POST request. It looks something like this*
```javascript
app.get('/data', (req, res) => {
    //data comes from the variable we declared and mutared earlier
    res.json(data);
})
```
* Before testing this route you should run your previous POST API.
* To test this API simply go to [http://localhost:3000/data](http://localhost:3000/data).
* You should see the following:
    ```json
    {"data": "Any String"}
    ```
##### 11. Congratulations, You are done!
*Don't forget to push the changes to your repo*