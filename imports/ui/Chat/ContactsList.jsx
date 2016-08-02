import React, { Component, PropTypes } from 'react';
import  ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import Contact from './Contact.jsx';
import { Meteor } from 'meteor/meteor';

export default class ContactsList extends React.Component
{
  constructor()
  {
    super();
    this.state =
    {
      contextMenu: 'hidden',
      chatBoxes: []
    }
  }

  _renderContacts()
  {
    if (this.props.usersReady)
    {
        return this.props.users.map((user)=>(<Contact key={user._id} userId={user._id} fullName={user.profile.name} contactStatus={user.profile.status}/>
    ));
    }
    else
    {
      //Replace with Loading component.
      return <div>Loading...</div>
    }
  }

  render()
  {
    return (
      <div>
        {this._renderContacts()}
      </div>
    );
  }
}
