## Task 2 Tutorial
*Make you sure you have installed postgres correctly before continuing with this tutorial*
##### 1. Install Sequelize
*Sequelize is an ORM that will ease our work with Postgres*
* Open your command line and run
    ```bash
    npm install --save sequelize pg pg-hstore
    ```
##### 2. Set up your connection
*Now that you have installed sequelize it's time to setup your database. Make you sure you know your username, password and that you already created a database.*
* Inside your root folder create a folder called `db`.
* Inside `db` create a file called `index.js` and copy the following code.
    ```javascript
    // require Sequelize
    const Sequelize = require('sequelize');
    // Create your connection
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
    
    // Export it so you can use the connection in your app
    module.exports = sequelize;
    ```
* Replace the **database**, **username** and **password** values for your own.
* Now test your connection inside `index.js`.
    ```javascript
    // Other code
    // Require sequelize 
    const sequelize = require('./db');
    
    // Other code
    app.use(bodyParser.json());
    
    // Initialize your connection
    sequelize
      .authenticate()
      .then(() => {
      // You will see this message if connection is succesful
        console.log('Connection has been established successfully.');
      })
      .catch(err => {
      // You will see this if the connection was not succesful
        console.error('Unable to connect to the database:', err);
      });
      
      // Other code
    ```
* You should now see `Connection has been established successfully.` on the command line.

##### 3. Create your first model.
*A **model** represents a table in the database. Instances of this class represent a database row. For this app you need to create a user **model***
* Our User model should have the following properties
    * id
    * email
    * password

*Now that you know what you want, let's create the User model.*
* Inside your root folder create a folder called `models`.
* Inside models create a file called `User.js`
* In `models/User.js` define your the User model.
    ```javascript
    // Require sequelize and your connection to the database
    const Sequelize = require('sequelize');
    const sequelize = require('../db');
    
    // Define the User model
    const User = sequelize.define('user', {
      // Define attributes
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    });
    
    // export it 
    module.exports = User;
    ```
    *The user id is generated automatically.*
    
##### 4. Create a POST API for users.
*Now that we defined our User model we can create requests and interact with the database.*
* Inside `index.js` after our previous  APIs write the following code.
    ```javascript
    // Other code
    
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
    
    // Other code
    ```
* Let's test it with Postman, remember that the **url** should be `http://localhost:3000/user/signup` and the **body** should be something like this:
    ```json
    {
      "email": "test@mail.com",
      "password": "123456"
    }
    ```
    ![postman example](./images/postman-api.png)
* After clicking "SEND" a similar response should appear in the response body.
    ```json
    {
        "id": 1,
        "email": "test@mail.com",
        "password": "123456",
        "updatedAt": "2018-09-11T10:15:36.599Z",
        "createdAt": "2018-09-11T10:15:36.599Z"
    }
    ```
*Our API is officially connected to the database! But we still have some work to do.*
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
    // Create our router
    const express = require('express');
    const router = express.Router();
    // Import the User model
    const User = require('../models/User');
    
    // Move our API here
    router.post('/signup', (req, res) => {
      // Here we create our new user from the request body
      let newUser = {
        email: req.body.email,
        password: req.body.password
      }
      // Create a new user
      User.create(newUser)
      // Return the user to client.
      .then(user => res.json(user))
      // Our error catcher
      .catch(err => res.status(401).json({ msg: 'Ups'}));
    });
    // Export it
    module.exports = router;
    ```
* Now that you moved the `users` route let's remove the API from `index.js`.
    ```javascript
    // Other code
    const sequelize = require('./db');
    // Require the users route
    const users = require('./routes/users');
    
    // Other code
    sequelize
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
      });
    
    // Tell you app to use routes/users.
    app.use('/users', users);
    
    // Other code
    ```
* Let's test the `user/signup` API with Postman again, it should be working normally.
 
*We just moved our `user` APIs to a different folder! This will help our code look cleaner*

##### 6. Tokens and Authentication.
*The* `/user/signup` *API should return a token, this token will help us with our authentication in the future.*

* To generate tokens you need to install `jsonwebtoken`.
* In the command line, inside your root folder, run.
    ```bash
    npm install jsonwebtoken
    ```
* After the installation is done bring `jsonwebtoken` to `/routes/users.js`.
    ```javascript
    const jwt = require('jsonwebtoken');
    ```
* Now we can create tokens, let's tweak out API inside `/routes/users.js`.
    ```javascript
    // Other code
    router.post('/signup', (req, res) => {
      // Here we create our new user from the request body
      let newUser = {
        email: req.body.email,
        password: req.body.password
      }
      // Create a new user
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
    }
    // Other code
    ```
* Now let's test the API in Postman, you should see tokens like this in the response body:
    ```json
    {
        "session": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QiLCJpYXQiOjE1MzY2NjU4NTUsImV4cCI6MTUzNjY2OTQ1NX0.K8aLxEUjxxng-fLtdaeCEh4phERW_OekMwsQk6TY7Mo"
    }
    ```
*Great, you have tokens! You will use them for authentication later.*

##### 7. Encrypting our passwords.
*Storing our passwords in plain text is not very safe, let's use* `bcryptjs` *to encrypt our passwords*

* Install `bcryptjs`, on the command line run.
    ```bash
    npm --save install bcryptjs
    ```
* Bring `bcryptjs` to `models/User.js`.
    ```javascript
    const bcrypt = require('bcryptjs');
    ```
* We will add a "hook" right before we export our model in `models/User.js`.
    ```javascript
    // This hook happens before the user is created, here we will hash our password using bcrypt
    User.beforeCreate((user, options) => {
        // Generate salt
        let salt = bcrypt.genSaltSync(10);
        // Create encrypted password
        let hash = bcrypt.hashSync(user.password, salt);
        // replace the password with the hashed password
        return user.password = hash;
    })
    ```
    
*Check your database and you will see that passwords are no longer stored in plain text. Good job so far, now on to the next challenge.*

##### 8. No duplicate users
*You don't want two users with the same email, let's fix that*
* There are different ways to do this but we will do the validation inside our API.
* Before registering an email we will check if the email it's already in our database, let's tweak our API inside `routes/users.js`.
    ```javascript
    // Other code
    
    router.post('/signup', (req, res) => {
      // Create a new user from the request body
      let newUser = {
        email: req.body.email,
        password: req.body.password
      }
    
      // Look for an user with the same email as the new user incoming
      User.findOne({ where: { email: newUser.email }})
      .then(user => {
        // If a user with the same email is found return an error
        if(user) return res.status(400).json({ msg: 'Email already exists' })
        // If not continue and create the new user
        else {
            // Create new user
          User.create(newUser)
          .then(user => {
            // The token takes a payload that can contain any information you want.
            let payload = {
              email: user.email
            }
            // 'secret' could be any String and shouldn't be exposed like this in real life projects
            // Create a token
            jwt.sign(payload, 'secret', { expiresIn: '1h'}, (err, token) => {
              // Send the token to the client.
              res.json({session: token})
            })
          })
            }
      })
      // Our error catcher
      .catch(err => res.status(401).json(err));
    });
    
    // Other code
    ```
*Wow! that was a lot of code, take some time and read throught the comments to understand what's going on.*

*Now onto the next API.*

#### 9. Login API.
*Let's create an API that will allow the users to log in.*
* The code for this should quite similar to the `/user/signup` API, but now we are not creating any users, we are checking if they exists in the database.
* First let's bring `bcryptjs` to `routes/users.js` since we will be using it to check the passwords.
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
            // isMatch will be true if the passwords match
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
*A lot of code again, make sure you read through the comments to understand what's going on*
* Now time to test our API in Postman, remember that the **url** should be `http://localhost:3000/user/login`, try testing different emails and passwords to see if it works accordingly.
![login-postman](./images/postman-api-login.png)

##### 10. Wrapping up
*This tutorial is over but there is a lot more you could implement in this app, but don't worry you will get into in the next tutorials. For now take some time to really understand what your code is doing, read docs, try to build it on your, etc.*
