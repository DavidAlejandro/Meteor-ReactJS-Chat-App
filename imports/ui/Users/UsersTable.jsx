import React from 'react';
import  ReactDOM from 'react-dom';
import  User from '../../api/users/client/User.js';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';


UsersTable = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    var subscription = Meteor.subscribe('users');
    return {
      ready: subscription.ready(),
      users: Meteor.users.find()
    };
  },
  renderUserList()
  {
    // let flag;
    console.log('renderUserList');
    let users = [];
    // Tracker.autorun(function() {
    //
    //   if (FlowRouter.subsReady("myUsers") === true)
    //   {
    //     let users = Meteor.users.find().fetch();
    //     flag = true;
    //   }
    //   else
    //   {
    //     flag = false;
    //   }
    // });
          console.log('loading...');
          users = Meteor.users.find().fetch();

        if (FlowRouter.subsReady("myUsers") === true)
        {
          console.log(this.data.users);
          return users.map((user)=>(<UserRow data={users} key={user._id} username={user.profile.name}/>));
        }
        else
        {
          return <h2>Loading...</h2>
        }

  },
  render()
  {

    if (! this.data.ready) {
          return <div>Loading...</div>;
        }
        // if (! this.data.post) {
        //   return <div>404: Not found</div>;
        // }
        return <div>Post: {this.data.post.title}</div>;
    return(
        <div>
        <h2>Users Table</h2>
        <ul>
          {this.renderUserList()}
        </ul>
        </div>
      );
      // let users = [];
      // let flag = false;
      // Tracker.autorun(function() {
      //   if (FlowRouter.subsReady("myUsers") === true)
      //   {
      //     users = Meteor.users.find().fetch();
      //     flag = true;
      //   }
      // });

      // if (flag === true)
      // {
      //   return(
      //     <div>
      //     <h2>Users Table</h2>
      //     <ul>
      //       {this.renderUserList(users)}
      //     </ul>
      //     <UserRow/>
      //     </div>
      //   );
      // }
      // else
      // {
      //   return(
      //     <div>Loading...</div>
      //   );
      // }

}
});
