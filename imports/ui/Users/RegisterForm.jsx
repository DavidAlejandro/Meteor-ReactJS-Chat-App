import React, { Component, PropTypes } from 'react';
import  ReactDOM from 'react-dom';
import  User from '../../api/users/client/User.js';
import Action from '../../api/actions/client/Action.js';

export default class RegisterForm extends Component
{
    registerUserAttempt()
    {
      const action = new Action(Meteor.userId());
      const currentAction = "insertUsers";
      const currentActionModule = "users";
      const attempt = action.attempt(currentActionModule, currentAction);
      return attempt;
    }

    _handleSubmit(event)
    {
      event.preventDefault();
      let form = event.target;
      if(this.registerUserAttempt().isAllowed === true)
      {
        const email = ReactDOM.findDOMNode(this.refs.userEmail).value;
        const password = ReactDOM.findDOMNode(this.refs.userPassword).value;
        const name = ReactDOM.findDOMNode(this.refs.userName).value;
        const profile = {name};
        const user = new User();
        const callback = (err, res) =>
        {
          if (err) {
            alert(err);
          }
          else
          {
            alert(res);
            FlowRouter.go('/login');
          }
        }
        const newUser = { email, password, profile};
        user.insert(newUser, callback);
      }
      else
      {
        alert(this.registerUserAttempt().reason);
      }
    }

    _userLocation(location)
    {
      return location;
    }

    render()
    {
      if (! this.props.ready) {
        return <div>Loading...</div>;
      }
      if (! this.props.actions) {
        return <div>404: Not found</div>;
      }
      let currentUser = Meteor.user();
      let usersActions = this.props.actions.findOne({moduleName: 'users'});
      let registerForm = (
        <div className="register-container">
          <form className="new-user" onSubmit={this._handleSubmit.bind(this)} >
            <input type="text" ref="userName" placeholder="Full Name"/>
            <input type="text" ref="userEmail" placeholder="email@me.com"/>
            <input type="password" ref="userPassword" placeholder="****"/>
            <button type="submit">Submit</button>
          </form>
        </div>
      );
      return registerForm;
    }
  }
