import React, { Component, PropTypes } from 'react';
import  ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

/*Chat Module*/
import ContactsList from './ContactsList.jsx';
import Conversation from './Conversation.jsx';
import {Conversations} from '/imports/api/conversations/conversationsCollection.js';

class ChatContainer extends React.Component
{
  constructor()
  {
    Session.set('conversationUser', undefined)
    super();
  }

  render()
  {
    return (
      <div>
        <h3>Users</h3>
        <p>Click on a user's name to start a conversation</p>
        <ContactsList usersReady={this.props.usersReady} users={this.props.users}/>
        <Conversation conversationReady={this.props.conversationReady} conversation={this.props.conversation}/>
      </div>
    );
  }
}

ChatContainer.propTypes = {
  users: PropTypes.array.isRequired,
  conversation: PropTypes.array.isRequired,
  usersReady: PropTypes.bool.isRequired,
  conversationReady: PropTypes.bool.isRequired

};

export default createContainer(() => {

  const usersSubscription = Meteor.subscribe('users');
  const conversationsSubscription = Meteor.subscribe('currentConversation', Session.get('conversationUser'));
  const currentUserId = Meteor.userId();

  return {
      usersReady: usersSubscription.ready(),
      conversationReady: conversationsSubscription.ready(),
      users: Meteor.users.find({_id: {$ne:currentUserId}}).fetch(),
      conversation: Conversations.find({users: {$all: [currentUserId, Session.get('conversationUser')]}}).fetch()
    };

}, ChatContainer);
