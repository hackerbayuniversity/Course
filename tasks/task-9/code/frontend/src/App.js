import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from 'react-redux';
import axios from 'axios';

import './App.css';

import Signup from './components/Signup';
import Login from './components/Login';
import WebsiteForm from './components/WebsiteForm';
import WebsiteList from './components/WebsiteList';
import { loginUser, getWebsites } from './actions/index';

class App extends Component {

  signup = this.signup.bind(this);
  login = this.login.bind(this);
  addWebsite = this.addWebsite.bind(this);

  signup (values) {
    axios.post('/users/signup', values)
    .then(res => {
      sessionStorage.setItem('token', `Bearer ${res.data.session}`)
      this.props.loginUser();
    })
    .catch(err => alert(err.response.data.msg));
  }

  login (values) {
    axios.post('/users/login', values)
    .then(res => {
      sessionStorage.setItem('token', `Bearer ${res.data.session}`);
      this.props.loginUser();
    })
    .catch(err => alert(err.response.data.msg));
  }

  addWebsite (values) {
    let token = sessionStorage.getItem('token');
    axios.post('/websites/add',
              values,
              { headers: {
                "Authorization": token
              }
    })
    .then(website => {
      alert('Website added.')
      axios.get('/websites/list', { headers: { 'Authorization': token } })
      .then(websites => {
        this.props.getWebsites(websites)
      })
    })
    .catch(err => alert(err.response.data.msg));
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={() => {
            return this.props.user.isLoggedIn ?
            <React.Fragment>
              <WebsiteForm onSubmit={this.addWebsite}/>
              <WebsiteList/>
            </React.Fragment>
            :
            <Signup onSubmit={this.signup} />
          }} />
          <Route path="/login" render={() => {
            return (
              this.props.user.isLoggedIn ?
              <React.Fragment>
                <WebsiteForm onSubmit={this.addWebsite}/>
                <WebsiteList/>
              </React.Fragment>
              :
              <Login onSubmit={this.login}/>
              )
          }} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  loginUser,
  getWebsites
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
