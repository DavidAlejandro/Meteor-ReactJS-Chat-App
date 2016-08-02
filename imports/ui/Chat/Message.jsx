import React, { Component, PropTypes } from 'react';
import  ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

export default class Message extends React.Component
{
  constructor()
  {
    super();
    this.state =
    {
      unread: true
    }
  }

  _getUserName(userId)
  {
    const currentUser = Meteor.user();
    if (currentUser) {
      if (userId === currentUser._id) {
        return 'You: ';
      }
      else
      {
        const otherUser = Meteor.users.findOne(userId);
        if (otherUser) {
            return `${otherUser.profile.name}:`;
        }
      }
    }
  }

  _getMessageText()
  {
    const messageTime = new Date(this.props.timestamp);
    const getFormattedMinutes = function(unformattedMinutes)
    {
      if (parseInt(unformattedMinutes) < 10) {
        return `0${unformattedMinutes}`;
      }
      return unformattedMinutes;
    };
    return `${this._getUserName(this.props.to)} ${this.props.text} - ${messageTime.getHours()}:${getFormattedMinutes(messageTime.getMinutes())}`;
  }

  render()
  {

    return (
      <div>
        {this._getMessageText()}
      </div>
    );
  }
}
