import React, { Component } from 'react';
// Importing react-router
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from 'react-redux';
import axios from 'axios';

import { defaultFunction } from './actions';
import './App.css';

// Import here!
import Signup from './components/Signup';
import Login from './components/Login';

class App extends Component {

  componentDidMount() {
    // call default function to display redux operation
    this.props.defaultFunction();
  }
  
  // Our submit function
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

// function to convert the global state obtained from redux to local props
function mapStateToProps(state) {
  return {
    default: state.default
  };
}

export default connect(mapStateToProps, { defaultFunction })(App);
