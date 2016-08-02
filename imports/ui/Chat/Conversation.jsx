import React, { Component, PropTypes } from 'react';
import  ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import Message from './Message.jsx'

export default class Conversation extends React.Component
{
  constructor()
  {
    super();
  }

  _renderMessages()
  {
    if (this.props.conversationReady)
    {
      if (this.props.conversation.length > 0)
      {
        const conversation = this.props.conversation[0];
        const currentUser = Meteor.userId();
          return conversation.messages.map((message, index)=>(<Message key={index} timestamp={message.timestamp} text={message.text} from={currentUser} to={message.userId}/>
        ));
      }
      else
      {
        return <div>No Messages</div>
      }

    }
    else
    {
      //Replace with Loading component.
      return <div>Loading...</div>
    }
  }

  _handleSubmit(e)
  {
    e.preventDefault();
    const message = this.refs.messageText.value ;
    const otherUserId = Session.get('conversationUser');
    Meteor.call('conversations.create', [otherUserId], message, (err, res) =>
    {
      if (err) {
        alert(err);
      }
      else
      {
        ReactDOM.findDOMNode(this.refs.messageText).value = "";
      }
    });
  }

  _getConversationUserName()
  {
    const userId = Session.get('conversationUser');
    if (userId) {
      const user = Meteor.users.findOne(userId);
      if (user) {
        return user.profile.name
      }
    }
  }

  render()
  {
    if (Session.get('conversationUser'))
    {
        if (this.props.conversationReady) {
          return (
            <div className="conversationContainer">
              <p>Chat with {this._getConversationUserName()}</p>
              <hr></hr>
              {this._renderMessages()}
              <form onSubmit={this._handleSubmit.bind(this)}>
                <input type="text" ref="messageText"></input>
                <input type="submit"></input>
              </form>
            </div>
          );
        }
        else
        {
          //Replace with loading component.
          return(<div>Loading...</div>);
        }
    }
    else
    {
      return(<div></div>)
    }

  }
}
