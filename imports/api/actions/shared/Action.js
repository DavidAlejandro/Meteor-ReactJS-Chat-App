import {Actions} from '../../actionsCollection'
import { check } from 'meteor/check';
import { Match } from 'meteor/check';

export default class Action
{
  constructor(userId)
  {
    console.log('action');
    check(userId, Match.Maybe(String));
    this.actions = Actions;
    this.user = Meteor.users.findOne(userId);//profile.privileges
  }

  attempt(moduleName, action)
  {
    check(moduleName, String);
    check(action, String);

    let currentActionModule = this.actions.findOne({moduleName: moduleName});
    let result = {isAllowed: false, reason: ""};

    console.log("this.user");
    console.log(this.user);
    console.log("this.user.profile.privileges[moduleName][action]");
    console.log(this.user.profile.privileges[moduleName][action]);

    //If current action module existsts, If this current actions exists, if theres a user logged, if this action is valid, if current user's privilege is equal to true.
    if(currentActionModule && currentActionModule[action] && this.user && currentActionModule[action].active === true && this.user.profile.privileges[moduleName][action] === true)
    {
      console.log('action valid for current user.');
      result.isAllowed = true;
      // return true;
    }
    //is user is not logged, If current action module existsts, if action is valid for guest users.
    else if (!this.user && currentActionModule && currentActionModule[action] && currentActionModule[action].guestUser === true)
    {
      console.log('action valid for guest users.');
      result.isAllowed = true;
      //return true;
    }
    //Action is not valid for this user.
    else
    {
      console.log("this.user");
      console.log(this.user);
      console.log("this.user.profile.privileges[moduleName][action]");
      console.log(this.user.profile.privileges[moduleName][action]);
      if(this.user && this.user.profile.privileges[moduleName][action] !== true)
      {
        result.reason = "Privilege needed.\n";
      }
      if(currentActionModule[action] && currentActionModule[action].active !== true)
      {
        result.reason == "" ? result.reason = "Action is not active.\n":result.reason = result.reason + "Action is not active.\n";
      }
      if(!this.user && currentActionModule && currentActionModule[action] && currentActionModule[action].guestUser !== true)
      {
        result.reason == "" ? result.reason = "Action is not available for guest users.\n":result.reason = result.reason + "Action is not available for guest users.\n";
      }
      // return false;
    }
     return result;
  }
}
