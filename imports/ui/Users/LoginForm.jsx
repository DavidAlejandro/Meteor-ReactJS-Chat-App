import React, { Component, PropTypes } from 'react';
import  ReactDOM from 'react-dom';
import  User from '../../api/users/client/User.js';
import Action from '../../api/actions/client/Action.js';

export default class LoginForm extends Component
  {
    loginAttempt()
    {
      const action = new Action(Meteor.userId());
      const currentAction = "login";
      const currentActionModule = "users";
      const attempt = action.attempt(currentActionModule, currentAction);
      return attempt;
    }

    loginUser(event)
    {
      event.preventDefault();
      const user = new User();
      const attempt = this.loginAttempt;
      let email = ReactDOM.findDOMNode(this.refs.userEmail).value;
      let password = ReactDOM.findDOMNode(this.refs.userPassword).value;
      const callback = (err, res) =>
      {
        if(err)
        {
          alert(err);
        }
        else
        {
          Session.set('userState', Meteor.user())
          FlowRouter.go('/');
        }
      };
      if(attempt().isAllowed === true)
      {
        user.login(email, password, callback);
      }
      else
      {
        alert(attempt().reason);
      }
    }

    render()
    {
      let loginForm = (<div className="register-container">
        <form className="user-login" onSubmit={this.loginUser.bind(this)} >
          <input type="text" ref="userEmail" placeholder="email@me.com"/>
          <input type="password" ref="userPassword" placeholder="****"/>
          <button type="submit">Login</button>
        </form>
        <a href="/register">Register</a>
      </div>);
      return loginForm;
    }
  }
