## Task 2 Tutorial
*Make you sure you have installed postgres correctly before continuing with this tutorial*
##### 1. Install Sequelize.
*This is an ORM that will ease our work with Postgres*
`npm install --save sequelize pg pg-hstore`
or
`npm i sequelize pg pg-hstore`
##### 2. Set up your connection.
* Create a folder and name it `db`.
* Inside `db` create a file called `index.js`.
* Configure Sequelize inside this `index.js` file:
    ```javascript
    const Sequelize = require('sequelize');
    const sequelize = new Sequelize('database', 'username', 'password', {
      host: 'localhost',
      dialect: 'postgres',
      operatorsAliases: false,
    
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    });
    
    module.exports = sequelize;
    ```
* Replace the **database**, **username** and **password** values for your own.
##### 2. Test your connection.
*We can use the `authenticate()` function to test the connection.*
* Write the following lines of code before your API routes in* `./code/index.js`
    ```javascript
    sequelize
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
      });
    ```
* Remember to import sequelize from your db folder, add the following to the top of the `./code/index.js` file.
    ```javascript
    const sequelize = require('./db');
    ```
* You should see `Connection has been established successfully.` on the command line.

##### 3. Now let's create a User model.
* Our User model should have the following properties
    * id
    * email
    * password
* Inside `./code` create a folder called `models`.
* Inside models create a file called `User.js`
* In `./code/models/User.js` define your the User model.
```javascript
const Sequelize = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('user', {
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
});

module.exports = User;
```
* The user id is generated automatically.
##### 4. Create the first POST API for users.
* It should expect a body with a email and password and save them to the database.
    ```javascript
    app.post('/user/signup', (req, res) => {
    // Here we create our new user from the request body
      let newUser = {
        email: req.body.email,
        password: req.body.password
      }
    // This function takes and object and creates a new user based on the User model.
      User.create(newUser)
      // Here we return the user to client.
      .then(user => res.json(user));
    })
    ```
* Let's test it with Postman, remember that the **url** should be `http://localhost:3000/user/signup` and the **body** should be something like this:
    ```json
    {
      "email": "test",
      "password": "123456"
    }
    ```
* After clicking "SEND" this should appear in the response body.
    ```json
    {
        "id": 1,
        "email": "test",
        "password": "123456",
        "updatedAt": "2018-09-11T10:15:36.599Z",
        "createdAt": "2018-09-11T10:15:36.599Z"
    }
    ```
* Some values will not be same but that is ok. Good job!

Our API is officially connected to the database! But we still have some work to do.
* Our `/user` APIs are inside `index.js`.
* The API should return a token.
* We are storing our passwords in plain text.
* We can create duplicated users.

Let's tackle them one at the time.
##### 5. Separate our APIs.
*Let's clean up our code and move our current and future `/user` APIs to a separate file*
* Inside the root folder create a folder called `routes`
* Inside `routes` create a file called `users.js` and write the following code:
    ```javascript
    // We create our router
    const express = require('express');
    const router = express.Router();
    // We import the User model
    const User = require('../models/User');
    
    // Our API is now here
    router.post('/signup', (req, res) => {
      // Here we create our new user from the request body
      let newUser = {
        email: req.body.email,
        password: req.body.password
      }
      
      User.create(newUser)
      // Here we return the user to client.
      .then(user => res.json(user))
      // Our error catcher
      .catch(err => res.status(401).json({ msg: 'Ups'}));
    });
    // We export it so index.js can use it
    module.exports = router;
    ```
*Now we need to do some changes in index.js.*
* Let's delete our `/user/signup` since we already have it somewhere else.
* Now we need to add the following after we test our Sequelize connection.
    ```javascript
    // This tells our app to use this file for the /user route.
    app.use('/user', user);
    ```
* After we require sequelize, let's also bring the users route.
    ```javascript
    const user = require('./routes/users');
    ```
* Let's test the `user/signup` API again, it should be working normally.
 
*We just moved our `user` APIs to a different folder! This will help our code look cleaner*

##### 6. Tokens and Authentication.
*Our `/user/signup` API should return a token, this token will help us with our authentication*

* To generate tokens we need to install `jsonwebtoken`.
`npm install jsonwebtoken`
* Let's bring jsonwebtoken to `/routes/users.js`.
    ```javascript
    const jwt = require('jsonwebtoken');
    ```
* Now we can create tokens, let's tweak out API.
    ```javascript
    User.create(newUser)
      // Here we return the user to client.
      .then(user => {
        // The token takes a payload that can contain any information you want.
        let payload = {
          email: user.email
        }
        // For now our secret is fine, but for future projects should protect
        // your secret and not expose it like this.
        jwt.sign(payload, 'secret', { expiresIn: '1h'}, (err, token) => {
          // Here we send the token to the client.
          res.json({session: token})
        })
      })
      // Our error catcher
      .catch(err => res.status(401).json({ msg: 'Ups'}));
    ```
* Now let's test our API, we should be returning tokens like this:
    ```json
    {
        "session": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QiLCJpYXQiOjE1MzY2NjU4NTUsImV4cCI6MTUzNjY2OTQ1NX0.K8aLxEUjxxng-fLtdaeCEh4phERW_OekMwsQk6TY7Mo"
    }
    ```
*Great, we have tokens! We will use them for authentication later.*

##### 7. Encrypting our passwords.
*Storing our passwords in plain text is not very safe, let's do something about it*

* Install `bcryptjs`, on the command line:
`npm install bcryptjs`
* Bring `bcryptjs` to `models/User.js`.
    ```javascript
    const bcrypt = require('bcryptjs');
    ```
* Now we will add a "hook" right before we export our model.
    ```javascript
    // This hook happens before the user is created, here we will hash our password using bcrypt
    User.beforeCreate((user, options) => {
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(user.password, salt);
      return user.password = hash;
    })
    ```
* Check your database and you will see that we no longer store the passwords in plain text.

*Good job so far, now on to the next challenge.*

##### 8. No duplicate users.
*We don't want two users with the same email, let's fix that*
* There are different ways to do this but we will do the validation inside our API.
* Before registering an email we will check if the email it's already in our database.
    ```javascript
    // We look for an user with the same email we are receiving from the request body
      User.findOne({ where: { email: newUser.email }})
      .then(user => {
        // If we find a user with the same email we return an error
        if(user) return res.status(401).json({ error: "User already exists." })
        // If not we continue and create the new user
        else {
          User.create(newUser)
          // Here we return the user to client.
          .then(user => {
            // The token takes a payload that can contain any information you want.
            let payload = {
              email: user.email
            }
            // For now our secret is fine, but for future projects should protect
            // your secret and not expose it like this.
            jwt.sign(payload, 'secret', { expiresIn: '1h'}, (err, token) => {
              // Here we send the token to the client.
              res.json(user)
            })
          })
            }
      })
    ```
*Wow! that was a lot of code, take some time and read throught the comments to understand what's going on.*

*Now onto our next API.*

#### 9. Login API.
*Now that we got the signup part done, let's work on the login*
* The code for this should quite similar to the `/user/signup` API, but now we are not creating any user.
* First let's bring `bcryptjs` to `routes/users.js` since we will be using it to check our passwords.
    ```javascript
    const bcrypt = require('bcryptjs');
    ```
* Then inside `routes/users.js` add the following API:
    ```javascript
    router.post('/login', (req, res) => {
      // User credentials
      let newUser = {
        email: req.body.email,
        password: req.body.password
      }
    
      // Check if the user's email exists in the database
      User.findOne({ where: { email: newUser.email }})
      .then(user => {
        //If it does check the password
        if(user) {
          // compare takes the plain text password and the hash stored in our database
          bcrypt.compare(newUser.password, user.password)
          .then(isMatch => {
            // If the password is correct then return the token
            if(isMatch) {
              let payload = { email: user.email }
              jwt.sign(payload, 'secret', { expiresIn: '1h'}, (err, token) => {
                res.json({session: token})
              })
            }
            // If the password is wrong return the corresponding message
            else {
              res.status(401).json({error: 'Invalid Password'})
            }
          })
        }
        // If the email doesn't exists then return the corresponding message
        else {
          res.status(404).json({error: 'User does not exist.'})
        }
      })
      .catch(err => res.status(401).json(err));
    })
    ```
*A lot of code again, make sure you read through the comments to understand what's going*
* Now time to test our API, remember that the **url** should be `http://localhost:3000/user/login`, try testing different emails and passwords to see if it works accordingly.

##### 10. Wrapping up.
*This tutorial is over but there is a lot more you could implement in this app, here are some ideas:*
* **Email validation:** right now we are not checking if we are getting a valid email.
* **Protected routes:** with the tokens we can create protected routes.
* **Update API:** we can create an API to update our users information.

*And many more, this tutorial is nowhere near perfect but I hope it can get you started and help you grasp some of this concepts. I encourage you to start everything from scratch without the tutorial. Be wild and experiment!*
