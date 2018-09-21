# Task 4 Tutorial

*Time for some front-end action. In this tutorial we will create sign up and login forms with React and Redux. Let's get to work.*

##### 1. Set up React and Redux
* Clone the following repository.
    ```bash
    git clone https://github.com/tarique93102/react-redux-starter-template
    ```
* The `react-redux-starter-template` folder will contain our frontend, this is a template with React and Redux already set up.
* Run `npm install` inside the `redux-starter-template` folder to install all the dependencies.

##### 2. ReduxForm
*We will use ReduxForm to manage our forms*

* First install ReduxForm.
    ```bash
    npm install redux-form
    ```
* Now pass the formReducer to your store inside `src/reducers/index.js`
    ```javascript
    import { combineReducers } from 'redux';
    import { reducer as formReducer } from 'redux-form'

    import defaultReducer from './default-reducer';
    
    const rootReducers = combineReducers({
        // add reducer files references here
        default: defaultReducer,
        form: formReducer
    });
    
    export default rootReducers;
    ```

##### 3. Our first form

*Now that ReduxForm is ready, let's create your first form*

* Inside the `components` folder create a file called `Signup.js` with the following code.
    ```javascript
    import React from 'react'
    import { Field, reduxForm } from 'redux-form'
    
    let Signup = props => {
      const { handleSubmit } = props
      return (
        <form onSubmit={handleSubmit}>
          <div>
              <label htmlFor="email">Email</label>
              <Field name="email" component="input" type="email" />
            </div>
          <div>
              <label htmlFor="password">Password</label>
              <Field name="password" component="input" type="text" />
            </div>
            <button type="submit">Submit</button>
        </form>
      )
    }
    
    Signup = reduxForm({
      // a unique name for the form
      form: 'signup'
    })(Signup)
    
    export default Signup;
    ```
* Import `Signup.js` to `App.js` so we can actually see it.
    ```javascript
    // Other code
    
    // Import here!
    import Signup from './components/Signup';
    
    class App extends Component {
    
      componentDidMount() {
        // call default function to display redux operation
        this.props.defaultFunction();
      }
    
      render() {
        return (
          <div>
            {/* Display here! */}
            <Signup />
            }
          </div>
        );
      }
    }
    // Other code
    ```
    * Time to see if it worked! In the command line run `npm start`.
    * A new window should open in your browser with the app running.
    ![Your signup form](https://raw.githubusercontent.com/hackerbayuniversity/Course/master/signup-1.png)
    
##### 4. Submitting our form
*You can't really see it, but your form is now connected to the redux store. Now let's see how we can get its values.*
* You would generally want to get the values when the user clicks on submit. Let's add an `onSubmit` function to our form in `App.js`.
    ```javascript
    // ... other code
    
    class App extends Component {
    
      componentDidMount() {
        // call default function to display redux operation
        this.props.defaultFunction();
      }
      
      // Our submit function
      submit (values) {
        console.log(values)
      }
    
      render() {
        return (
          <div>
            {/* Add onSubmit function here*/}
            <Signup onSubmit={this.submit}/>
          </div>
        );
      }
    }
    // other code ...
    ```
* Now when we click submit, the form's values will be displayed on the console.
* I personally find the redux logger to be really annoying, if you think the same just change the following line inside your  `src/index.js`
    ```javascript
    const store = createStore(
        reducers,
        // Goodbye logger
        applyMiddleware(ReduxPromise)
    );
    ```
* If you change your mind or need to inspect your store just revert this step.

##### 4. The Login form
*Let's create your login form now!*
* Inside your `src/components` folder create a `Login.js` file and add the following code.
    ```javascript
    import React from 'react';
    import { Field, reduxForm } from 'redux-form';
    
    let Login = props => {
      const { handleSubmit } = props
      return (
        <form onSubmit={handleSubmit}>
          <div>
              <label htmlFor="email">Email</label>
              <Field name="email" component="input" type="email" />
            </div>
          <div>
              <label htmlFor="password">Password</label>
              <Field name="password" component="input" type="text" />
            </div>
            <button type="submit">Submit</button>
        </form>
      )
    }
    
    Login = reduxForm({
      // a unique name for the form
      form: 'login'
    })(Login)
    
    export default Login
    ```
* Now bring it to `App.js so we can see it`.
    ```javascript
    // Other code ...
    import Signup from './components/Signup';
    import Login from './components/Login';
    
    class App extends Component {
    
      componentDidMount() {
        // call default function to display redux operation
        this.props.defaultFunction();
      }
      
      // Our submit function
      submit (values) {
        console.log(values)
      }
    
      render() {
        return (
          <div>
            <Signup onSubmit={this.submit}/>
            -
          {/* Our Login form!*/}
            <Login onSubmit={this.submit}/>
          </div>
        );
      }
    }
    // other code
    ```
* Now you should see both forms (they are identical) and their values on the console if you click submit.

##### 5. React router
*You have your two forms but now you need to find a way to display them in different pages. React router to the rescue!*

* First install `react-router-dom`, on the command line run.
    ```bash
    npm install react-router-dom
    ```
* Now let's bring `react router` to our `App.js` and set up our router.
    ```javascript
    // Other code...
    // Importing react-router elements
    import { BrowserRouter as Router, Route } from "react-router-dom";
    // Other code...
    
    class App extends Component {
        // Other code...
    
      render() {
        return (
          <Router>
            <div>
              {/* Here are your routes */}
              <Route exact path="/" component={Signup} />
              <Route path="/login" component={Login} />
          </div>
          </Router>
        );
      }
    }
    
    // Other code...
    ```
* Now let's differentiate our `Signup` and `Login` component with a simple h2 tag. In `Signup.js`
    ```javascript
    // Other code
    let Signup = props => {
      const { handleSubmit } = props
      return (
        <form onSubmit={handleSubmit}>
          <div>
            {/* Title here! */}
              <h2>Signup!</h2>
              <label htmlFor="email">Email</label>
              <Field name="email" component="input" type="email" />
            </div>
            {/* Other code.. */}
        </form>
      )
    }
    // Other code
    ```
    and `Login.js`
    ```javascript
    // Other code
    let Login = props => {
      const { handleSubmit } = props
      return (
        <form onSubmit={handleSubmit}>
          <div>
            {/* Title here! */}
              <h2>Login!</h2>
              <label htmlFor="email">Email</label>
              <Field name="email" component="input" type="email" />
            </div>
            {/* Other code.. */}
        </form>
      )
    }
    // Other code
    ```
* Now head to the browser to see what's happening.
* The home page should be `Signup.js` and if you go to `localhost:3000/login` you should see `Login.js`.
* Pretty cool, but now you need some links to add navigation to your app. Let's start with `Signup.js`
    ```javascript
    // The Link component helps us connect pages
    import { Link } from "react-router-dom";
    // Other code
    
    let Signup = props => {
      const { handleSubmit } = props
      return (
        <form onSubmit={handleSubmit}>
          <h2>Sign up!</h2>
          <div>
              <label htmlFor="email">Email</label>
              <Field name="email" component="input" type="email" />
            </div>
          <div>
              <label htmlFor="password">Password</label>
              <Field name="password" component="input" type="text" />
            </div>
            <button type="submit">Submit</button>
            {/* Here we place our Link component */} 
            <p>Already have and account? <br/> Click <Link to="/login">here</Link></p>
        </form>
      )
    }
    // Other code
    ```
    and now `Login.js`
    ```javascript
    // The Link component helps us connect pages
    import { Link } from "react-router-dom";
    // Other code
    let Login = props => {
      const { handleSubmit } = props
      return (
        <form onSubmit={handleSubmit}>
          <div>
              <h2>Login!</h2>
              <label htmlFor="email">Email</label>
              <Field name="email" component="input" type="email" />
            </div>
          <div>
              <label htmlFor="password">Password</label>
              <Field name="password" component="input" type="text" />
            </div>
            <button type="submit">Submit</button>
            {/* Here we place our Link component */} 
            <p>Already have and account? <br/> Click <Link to="/">here</Link></p>
        </form>
      )
    }
    // Other code
    ```
    * Now let's check the browser to see what's happpening.
    ![app with router](https://raw.githubusercontent.com/hackerbayuniversity/Course/master/signup-2.png)

*You are now able to navigate between the signup and login page!*

##### 6. Connecting to the backend
*Now that we have a cool and functional frontend we can connect our app to the API we made in **task 2.***

*First let's organize your app.*
* Create two folders, one called `backend` and another one called `frontend`.
* Inside `backend` copy or clone your app from **task 2** along with the test made in **task 3**.
* Inside `frontend` move all the code from the react app we made just now. Refer to the `code` folder in this repo if you get lost.

*Now let's connect both apps*
* Change the port inside `backend/index.js` to **3001**.
    ```javascript
    app.listen(3001, () => console.log('Listening on port 3001'));
    ```
* Now in `frontend/package.json` add the following line.
    ```javascript
    "proxy": "http://localhost:3001/"
    ```
    This will tell our app server to proxy our API requests to our **task 2** API server.
* Let's see if this works, we will use a library called `axios` to make requests. Inside your `frontend` folder run.
    ```bash
    npm install axios
    ```
* Now bring `axios` to `App.js` and create a POST request inside our submit function.
    ```javascript
    // Other code...
    import axios from 'axios';
    
    class App extends Component {
      // Other code ...
      
      // Our submit function
      submit (values) {
        // We make the post request to /user/signup and send the values from the form
        axios.post('/user/signup', values)
        // we log the response
        .then(res => console.log(res.data))
        // and catch any errors
        .catch(err => console.log(err));
      }
    
      render() {
        return (
          <Router>
            <div>
              {/* We refactored our routes to be to add the onSubmit function */}
              <Route exact path="/" render={() => <Signup onSubmit={this.submit}/>} />
              <Route path="/login" render={() => <Login onSubmit={this.submit} />} />
          </div>
          </Router>
        );
      }
    }
    // Other code...
    ```
* Now start both backend and fronted servers, go to your browser, input a valid email and password and click on submit.
* You will a see familiar response in the console
    ```javascript
    {session: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6I…YwN30.DOYm-BsPL2syNFWb22NJMtI7yDbyZIUdgxIe0ojw5Ck"}
    ```
    Of course your token will be different.
    
*We have succesfully connected our two apps!*

##### 7. Separating requests
*Right now both* `Signup` *and* `Login` *have the same* `onSubmit` *function. This is not ok since they should request to two different end points in our backend* `/user/signup` *and* `user/login`.

* Let's fix this by creating two different onSubmit functions.
    ```javascript
    class App extends Component {
      // Other code ...
      
      // Our submit functions
      signup (values) {
        axios.post('/user/signup', values)
        .then(res => console.log(res.data))
        .catch(err => console.log(err.response.data));
      }
    
      login (values) {
        axios.post('/user/login', values)
        .then(res => console.log(res.data))
        .catch(err => console.log(err.response.data));
      }
    
      render() {
        return (
          <Router>
            <div>
              <Route exact path="/" render={() => <Signup onSubmit={this.signup}/>} />
              <Route path="/login" render={() => <Login onSubmit={this.login} />} />
          </div>
          </Router>
        );
      }
    }
    
    // Other code
    ```
* Now try to interact with the form and see the responses in the console. You cannot login a user if it doesn't exist or if the password is incorrect.

*Good job, our app is starting to look like an actual app!*

##### 8. Wrapping up.
*Our simple app is fully functional but there are still some things you need to do. This is where I let go of your hand and you start learning more. Some features to implement are:*
* Show error messages.
* Validate emails and passwords.
* Create loaders.
* A dashboard page for when login is succesful.

*That's about it from me, hope you had fun and keep coding!*