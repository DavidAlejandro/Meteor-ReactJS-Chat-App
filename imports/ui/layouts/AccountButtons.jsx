import React, { Component, PropTypes } from 'react';
import  ReactDOM from 'react-dom';
import  User from '../../api/users/client/User.js';
import Action from '../../api/actions/client/Action.js';

export default class AccountButtons extends Component
{
    constructor()
    {
      super();
    }

    _userLocation(location)
    {
      return location;
    }

    _handleLogoutClick()
    {
      Meteor.logout(function(err)
      {
        if (err) {
          console.log(err);
        }
        else
        {
          Session.set('userState', undefined)
          console.log('logged out');
        }
      });
    }

    render()
    {
      const currentUser = Meteor.user();
      if (currentUser)
      {
        //if user is logged in
        return(<div>
          {currentUser.profile.name}, <a href='#' onClick={this._handleLogoutClick}>Logout</a>
        </div>);
      }
      else
      {
        //if user is not logged in
        return(<div>
          <a>Login</a>
        </div>);
      }
    }
  }
