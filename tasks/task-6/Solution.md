# Task 6 Tutorial
*In this tutorial we will implement new features to the backend API we made in task 4 and create a website monitoring software.*

##### 1. Create a Website model in our database
*At the moment we only have a* `User` *model in our database. That needs to change since you need to create website entries in your database. Let's create our website model.*
* The website model needs to contain three properties.
    * Name.
    * Url.
    * Status.
    * User id *(Id of the user who creates the entry)*.
* First of all you need to do some changes in our `models` folder.
* Inside the `models` folder create a file called `index.js` and copy the following code.
    ```javascript
    const fs = require('fs');
    const path = require('path');
    const Sequelize = require('sequelize');
    const basename = path.basename(__filename);
    const sequelize = require('../db');
    
    let db = {};
    
    // Read the models directory
    fs
      .readdirSync(__dirname)
      // filter to return only models
      .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
      })
      .forEach(file => {
        // We import each model in our database
        var model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
      });
    // Associate odels
    Object.keys(db).forEach(modelName => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });
    
    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
    
    module.exports = db;
    ```
    *So what is going here? Basically we created a file that will store all our models, given they are located inside the* `models` *folder. We need to do it this way because of the associations bewteen models we are going to create, we cannot just simply create different files, we need this* `index.js`.
* Next modify your `User.js` file with the following code.
    ```javascript
    const bcrypt = require('bcryptjs');
    
    module.exports = (sequelize, DataTypes) => {
      const User = sequelize.define('User', {
        email: DataTypes.STRING,
        password: DataTypes.STRING
      });
      // Here we associate the User model with the Website model
      User.associate = function (models) {
        models.User.hasMany(models.Website);
      };
      
      // Encrypt password
      User.beforeCreate((user, options) => {
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(user.password, salt);
      return user.password = hash;
    })
    
      return User;
    };
    ```
    *The idea is basically the same, we are just exporting a function now. Other than the association we created (we will talk about it later) this shouldn't be too confusing.*
* At last we can create the `Website.js` file.
    ```javascript
    module.exports = (sequelize, DataTypes) => {
      const Website = sequelize.define('Website', {
        name: DataTypes.STRING,
        url: DataTypes.STRING,
        status: {
          type: DataTypes.STRING,
          defaultValue: 'online'
        }
      });
      
      // Here we associate the Website model with the User model
      Website.associate = function (models) {
        models.Website.belongsTo(models.User);
      };
    
      return Website;
    };
    ```
    *Hopefully you noticed the associations created. The* `Website` *model "belongs to" a* `User` *model. This means everytime we create a* `Website` *it will have a connection to a* `User` *a* `UserId` *property. We did the same in* `User.js` *just the other way around.* `User` *"has many"* `Website`.
* That was a lot of changes, but now our models should be good to go and be connected to our routes.

##### 2. Create a /websites route
*At the moment we can only register and login users. You need to implement a new route that will allow your users to create `Websites` in the database.*

* Inside `/routes` create a file called `websites.js` and copy the following code.
    ```javascript
    const express = require('express');
    const router = express.Router();
    const models = require('../models/');
    
    // API endpoint
    router.post('/add', (req, res) => {
      // New website
      let newWebsite = {
        name: req.body.name,
        url: req.body.url
      }
      // Check if the website is a duplicate
      models.Website.find({
        where: {
          UserId: currentUser.id,
          url: newWebsite.url
        }
      })
      .then(website => {
        // If it is a duplicate return error
        if(website) res.status(400).json({ msg: "Website already added" })
        else {
          // If not create website
          models.Website.create(newWebsite)
          .then(website => {
            website.setUser(currentUser.id)
            res.json(website)
          })
        }
      })
      .catch(err => res.status(401).send(err))
    })
    ```
    *So this route should look familiar, it's similar to the routes you created in* `routes/users.js`. *Go ahead and test it Postman.*
    
*You probably realized by now that even we are saving websites in our database, these have no association with our users. Even though they are associated in the models, we need to do a little bit more to actually connect them. First we need to know which user is creating the website, right now anyone can use our API, but that is about to change. Your next step is to implement authentication.*

##### 3. Authentication
*You will use the tokens generated on login and signup to authenticate our routes.*
* First let's install the packages we need.
    ```bash
    npm install passport passport-jwt
    ```
* Now create a folder called `passport`.
* Inside `passport` create a file called `index.js`. Here you will configure the passport strategy.
    ```javascript
    const JwtStrategy = require('passport-jwt').Strategy;
    const ExtractJwt = require('passport-jwt').ExtractJwt;
    const models = require('../models')
    
    // Options for the authentication
    let opts = {};
    
    // Set the method and the secret
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
    opts.secretOrKey = 'secret';
    
    // Export the strategy
    module.exports = passport => {
        passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
            // Find user from payload
            models.User.findOne({
                where: {
                    email: jwt_payload.email
                    }
                })
                .then(user => {
                    // If user is found return user
                    if (user) return done(null, user);
                    // If not return error
                    return done(null, false)
                })
                .catch(err => console.log(err));
        }));
    }
    ```
    *Inside our token we have information about the user, for your protected routes you will to send the token inside the* `Authorization` *header. This code extracts the token from the headers and finds the correct user based in the email inside the token.*
* Let's initialize passport in `index.js`, the one in our root folder.
    ```javascript
    // Other code
    const passport = require('passport');
    
    // Other code
    
    app.use(bodyParser.json());
    app.use(logger('tiny'));
    
    //Initialize passport
    app.use(passport.initialize());
    
    // Tell passport to use the jwt strategy
    require('./passport/')(passport);
    
    // Other code
    
    app.listen(3001, () => console.log('Listening on Port 3001'));
    ```
    *This tells your server to use your* `jwt authentication`.
    
* Next step is to use authentication to protect the `/websites` routes. Inside `routes/websites` copy the following changes.
    ```javascript
    // Other code
    // require passport and jwt
    const passport = require('passport');
    const jwt = require('jsonwebtoken');
    
    // Add authentication
    // This routes returns an arrays with the user websites
    router.get('/list',
      passport.authenticate('jwt', { session: false }),
      (req, res) => {
      // Extract the token from the headers
      let pureToken = req.get('Authorization').slice(7)
      
      // store the user info with jwt verify
      let currentUser = jwt.verify(pureToken, 'secret');
      
      // Find all websites created by the user
      models.Website.findAll({
        where: {
          UserId: currentUser.id
        }
      })
      // Send an array with all the websites
      .then(websites => res.json(websites))
      .catch(err => res.status(400).json({ msg: "Error" }))
    })
    
    // Add authentication
    // This route adds a website that will have the userId
    router.post('/add',
      passport.authenticate('jwt', { session: false }),
      (req, res) => {
      
        // we extract the token from the headers
      let pureToken = req.get('Authorization').slice(7);
      
      // store the user info with jwt verify
      let currentUser = jwt.verify(pureToken, 'secret');

      // Check if body is null
      if(req.body.constructor === Object && Object.keys(req.body).length === 0) return res.status(400).json({ msg: 'Invalid data' })

      // incoming website
      let newWebsite = {
        name: req.body.name,
        url: req.body.url
      }
        
        // Verify if user from token exists
      models.User.findOne({ 
                    where: {
                        id: currentUser.id
                    }
                })
      .then(user => {
        if(!user) res.status(401).json({ msg:"User not found, please log in" })
        // Check that website is not a duplicate from the same user
        models.Website.find({
          where: {
            id: currentUser.id,
            url: newWebsite.url
          }
        })
        .then(website => {
          if(website) res.status(400).json({ msg: "Website already added" })
          else {
              // Create website
            models.Website.create(newWebsite)
            .then(website => {
            // set userId inside the Website just created
            website.setUser(currentUser.id)
            res.json(website)
            })
            .catch(err => res.status(400).json(err))
          }
        })
      })
      .catch(err => res.status(401).send(err))
    })
    
    module.exports = router;
    ```
    *Take some time to understand what's going here. Do some tests on Postman, remember to set your* `Authorization` *header to* `Bearer *insert token here*`.
* Before you try anything change all your `User` calls inside `routes/users.js`, they come from `models` now.
    * `const models = require('../models')`
    * `User` to `models.User`.

##### 4. Wrapping up
*We have come to the end of the tutorial, feel free to implement more features and find improvements. Keep well and keep coding!*