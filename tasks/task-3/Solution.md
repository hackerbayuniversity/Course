# Task 3 Tutorial

*You have been using Postman to check if your APIs were working. Well that's ok for one or two times but as your application grows you will need a better solution*
* Let's start with our APIs from **task 1**:
    * `GET /` API which returns static JSON.
    * `POST /data` which saves a string on the server.
    * `GET /data` which retuns the saved string on the server.

##### 1. Mocha and Chai.
*Mocha is a test framework that provides an enviroment where you can test your code, Chai is one of the many assertion libraries. These two will help you create a test file for your app.*

* First let's install both.
    ```bash
    npm install --save-dev mocha hai
    ```
* Something important you need to do is export your app server inside `index.js`, add this at the bottom of your file.
    ```javascript
    module.exports = app;
    ```
    *We do this in order to use the server inside our tests.*
* Inside our root folder for task 1 let's create a new folder called `test`.
* Inside `test` create a file named `test.js` and copy the following code.
    ```javascript
    let chai = require('chai');
    let expect = chai.expect;
    
    // Description a group of tests
    describe('My tests', () => {
        // Description of a specific test
        describe('dumb test', () => {
            // The behaviour expected
            it('should return 4', done => {
                // what we are actually testing
                expect(2 + 2).to.equal(4);
                // when done() is called the test is finished
                done();
            })
        })
    })
    ```
* For this to actually work we need to make a change.
* Inside `package.json` change the `test` script to:
    ```json
    "test": "mocha"
    ```
* Now on your command line type `npm run test`.
* You should see something like this:
    ```bash
    Listening on port 3000
      My tests
        dumb test
          ✓ should return 4
    
    
      1 passing (14ms)
    ```
    *Take some time to really understand what's going on, play around with the code and make changes.*
    
##### 2. Our first real test.
*So now it's time to write a real test for your app.*
* We need to install `chai-http` to integrate our app server.
    `npm install --save-dev chai-http`
* Also we need to bring the server to `test/test.js`, along with some chai assertions.
    ```javascript
    let chai = require('chai');
    let chaiHttp = require('chai-http');
    let should = chai.should();
    let expect = chai.expect;
    let server = require('../index.js');
    
    chai.use(chaiHttp);
    ```
* Now it's time to write our test, inside `test/test.js` add the following code.
    ```javascript
    // test description
        describe('first test', () => {
            // expected behaviour
            it('should return { status: "success" }', done => {
                // connecting to the server
                chai.request(server)
                // router
                .get('/')
                // response from the server
                .end((err, res) => {
                    // assertions
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.deep.equal({ status: "success" })
                    // done should be called to finish the test
                    done();
                })
            })
        })
    ```
* The response should be something like this:
    ```bash
    Listening on port 3000
      My tests
        dumb test
          ✓ should return 4
        first test
          ✓ should return { status: "success" } (42ms)
    
    
      2 passing (79ms)
    ```
*Now let's create tests for our other two APIs.*
##### 3. Testing the rest of your APIs.
* These tests shouldn't be that different. Let's see how they look.
    ```javascript
    describe('second test', () => {
            // expected behaviour
            it('should return { data: "Any String"}', done => {
                // connecting to the server
                chai.request(server)
                // method and route
                .post('/data')
                // our request body
                .send({ data: "Any String"})
                // response from the server
                .end((err, res) => {
                    // assertions
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.deep.equal({ data: "Any String"})
                    // done should be called to finish the test
                    done();
                })
            })
        })
    
    describe('third test', () => {
        // expected behaviour
        it('should return { data: "Any String"}', done => {
            // connecting to the server
            chai.request(server)
            // method and route
            .get('/data')
            // response from the server
            .end((err, res) => {
                // assertions
                expect(res.status).to.equal(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.deep.equal({ data: "Any String"})
                // done should be called to finish the test
                done();
            })
        })
    })
    ```
* Run `npm run test` and see the results, everything should be green.

*We did it! We just set up a very simple set of tests for our app. Try to play with it and test edge cases. For example what shouldn't happen in your API.*

##### 4. Testing the /user API.
*Now that we understand a little bit more about unit testing, let's make some tests for the app we made for **task 2**.*
* Inside the **task 2** folder install all the dependencies that we need.
    ```bash
    npm install --save-dev mocha chai chai-http
    ```
* Export your app server from `index.js` in your root folder.
    ```javascript
    module.exports = app;
    ```
* Inside your task 2 folder create a folder called `test`.
* Inside `test` create a file called `test.js`.
* Change the test script inside your `package.json`.
    ```
    "scripts": {
    "test": "mocha --timeout 10000"
    },
    ```
    *`--timeout 10000` will give your tests more time to run, the default is 2000.*
* Now let's write a test inside `test/test.js`.
    ```javascript
    let chai = require('chai');
    let chaiHttp = require('chai-http');
    let expect = chai.expect;
    let server = require('../index.js');
    
    chai.use(chaiHttp);
    
    describe('Tests for task 2', () => {
    
        describe('POST user/signup', () => {
            it('should sign a user', done => {
    
                chai.request(server)
                .post('/user/signup')
                .send({
                    email: 'test@test.com',
                    password: '123456'
                })
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('session');
                    done();
                })
            })
        })
    })
    ```
    *This tests looks cool and all, but it will only pass the first time or maybe  not even once. Why? Let's talk about it in the next section*

##### 5. Manipulating the database.
*The test only passes once because the second time the test runs the email is already in the database, therefore is a duplicate. You need to find a way to clean the database before the tests runs so the data is always new.*

* **Hooks** are pieces of code that run either before or after tests. In this case you will use **before** hook.
* You will also need to bring the User model inside `test/test.js` in order to manipulate the database.
    ```javascript
    let User = require('../models/User.js');
    ```
* The `destroy()` function empties your database, let's use it inside your `before` hook.
    ```javascript
    describe('Tests for task 2', () => {
        // This function runs before we start running our tests
        before(() => {
            // This function empties de database
            User.destroy({
                where: {},
                truncate: true
            })
        })
        // The extra code
        ...
    })  
    ```
    *Great! so now your test will pass everytime. But... I hope you were not attached to your old users, they are gone now. Actually that's a problem, you can't just wipe out the database everytime you run tests.*

##### 6. A database for testing
*We realized we cannot run our tests in your production database, instead we will create a test database. It will be a cloud based database because we need to integrate something called Travis later.*

* Got to [elephantsql.com](https://www.elephantsql.com) and create an account. The free tier should be good for now.
* Once you have your account create a database and copy its URL and save it somewhere.
* Now we need to make some changes in our database configuration, inside `db/index.js`.
    ```javascript
    const Sequelize = require('sequelize');
    
    // We create a url variable
    let dbUrl = null;
    
    // If NODE_ENV equals 'test' we will use the cloud test database
    if(process.env.NODE_ENV === 'test') testDb = 'your elephantsql url';
    else {
        // If not use the production database
        dbUrl = 'postgres://username:password@localhost:5432/dbname';
    }
    // Initialize with the database url variable
    const sequelize = new Sequelize(dbUrl, {
      host: 'localhost',
      dialect: 'postgres',
      // I shut off logging, optional for you
      logging: false,
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
* Since you will be pushing to Github, you should protect your url variables. The `dotenv` package might help you a lot. Check it out here [npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv).
* Add this on the first line of the `test/test.js` file to set `NODE_ENV` to `'test'`.
    ```javascript
    process.env.NODE_ENV = 'test';
    ```
* Let's add `start` script inside our `package.json` to make things easier.
    ```json
    "scripts": {
        "test": "mocha --timeout 10000",
        "start": "node index.js"
      },
    ```
* Run `npm start` and add some users with Postman.
* Now run `npm run test`.
* After the tests finished run `npm start` again and try to add users with the same credentials you used before.
* You will see a response like this:
    ```json
    {
        "msg": "Email already exists"
    }
    ```
*Voilà! we have succesfully separated our test and production database.*

##### 7. Testing Login
*To test the* `user/login`*route we need to have a user already in the database so the login is successful.* `before` *hooks come to save us again.*
* Our `before` function will now look like this:
    ```javascript
    before(done => {
            User.destroy({
                where: {},
                truncate: true
            })
            .then(() => {
                // After we empty our database we create one user for our login test
                User.create({
                    email: 'test@email.com',
                    password: '123456'
                })
                .then(() => done());
            });
        });
    ```
    *So basically we create a new user before we run our tests.*
* Now let's write our `user/login` test.
    ```javascript
    describe('POST user/login', () => {
            it('should login a user', done => {
                chai.request(server)
                .post('/user/login')
                .send({
                    email: 'test@email.com',
                    password: '123456'
                })
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('session');
                    done();
                })
            })
        })
    ```
* Run `npm run test`, everything should be green.
![test-task-3](./images/test-task-3.png)
* Great job, now I challenge you to create tests for two situations:
    * Wrong password.
    * Invalid email.
* Think about what you should expect from the server if you send invalid data and write the assertions accordingly, take a look at `routes/users.js` to see what are the different responses to each case.
* Don't forget to call `done()` when you are "done" with all the assertions, otherwise your tests will crash.

##### 8. Integrating Travis.
*Travis is a  continuous integration service used to build and test software projects hosted at GitHub. I reccomend visiting [this website](https://docs.travis-ci.com/user/for-beginners/) to understand more what Travis is and does.*
* Go to [travis-ci.com](https://travis-ci.com) and sign up with Github.
* Add a `.travis.yml` file to your root folder to tell Travis CI what to do.
    ```yaml
    language: node_js
    sudo: false
    node_js:
      - "node"
    services:
      - postgresql
    install:
      - "npm install"
    script:
      - "npm test"
    ```
* If you haven't already, push this app to one your repositories so you can select it and use it with Travis.
* Now everytime time you push your repository to Github Travis will run your tests and tell you if they passed.
* If you want to get a cool Travis image in your repository follow this tutorial [docs.travis-ci.com/user/status-images/](https://docs.travis-ci.com/user/status-images/).

##### 9. Codevoc.
*If you want to go all in your code quality then you should check Codecov.*
* Sign up here [codecov.io](https://codecov.io).
* Follow this example code [github.com/codecov/example-node](https://github.com/codecov/example-node).

##### 10. Wrapping up.
*You are done! But actually you are just starting. There are many things we could have done differently or better. That's up to you to discover, try making this same app but without looking at the tutorial, try different tools or make it more personal. That is all from me for now, keep well and keep coding!*