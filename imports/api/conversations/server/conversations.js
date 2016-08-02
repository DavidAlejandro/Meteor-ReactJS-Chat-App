import {Conversations} from '../conversationsCollection.js';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

/*Conversation*/
/*
  {
    _id: '',
    users: [id1, id2...],
    messages: [{text: '', userId: '', timestamp: Date()}, ...],
    createdAt: Date(),
    createdBy: _id
  }
*/


/*Conversation in user object*/
/*profile.conversations[
    _id: '', ...
]
*/
Meteor.publish('currentConversation', function(otherUserId)
{
  const currentUserId = this.userId;
  // console.log(`logged as: ${currentUserId}, conversation with: ${otherUserId}`);
  const currentConversation = Conversations.find({users: {$all: [currentUserId, otherUserId]}});
  return currentConversation;
});

Meteor.methods({
  'conversations.create'(users = [], newMessage = "")
  {
    check(users, Array);
    check(newMessage, String);
    const currentUserId = Meteor.userId();
    if (currentUserId)
    {
      const currentTime = Date();
      let isNewConversation = true;
      let usersArray = users;
      let newMessageObject = {userId: currentUserId, text: newMessage, timestamp: currentTime};
      usersArray.push(Meteor.userId());
      let conversation = Conversations.findOne({users: {$all: usersArray}});
      if (conversation)
      {
        Conversations.update({_id: conversation._id}, {$push:{messages: newMessageObject}});
      }
      else
      {
        if(users.length > 0 && newMessage != "")
        {
          let messages = [];
          messages.push(newMessageObject);

          const newConversation =
          {
            users: usersArray,
            messages: messages,
            createdAt: currentTime,
            createdBy: currentUserId
          };

          Conversations.insert(newConversation);
        }
        else
        {
          //error: A user id must be specified in order to send a message.
        }
      }
    }
    else
    {
      //error: user is not logged in.
    }

  }

});
