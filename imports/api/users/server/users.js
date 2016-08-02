import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Action from '../../actions/server/Action.js';
import '../../systemVariables/sysVarsCollection.js';
import User from './User.js';

const currentUser = this.userId;

Meteor.publish('users', function tasksPublication()
{
  return Meteor.users.find();
});

//Custom login policies.
Accounts.validateLoginAttempt(function(info)
{
  const currentAction = 'login';
  const currentActionModule = 'users';
  const action = new Action();

  if (action.attempt(currentActionModule, currentAction).isAllowed === false)
  {
    //throw new Meteor.Error(403, "Login forbidden, " + action.attempt(currentActionModule, currentAction).reason);
    throw new Meteor.Error(403, "Login forbidden");
  }
  if (info.allowed === true)
  {
    return true;
  }
  else
  {
    return false;
  }
});

Meteor.methods({

  'users.insert'(newUser) {
    check(newUser.email, String);
    check(newUser.password, String);
    const currentAction = 'insertUsers';
    const currentActionModule = 'users';
    const currentUser = Meteor.userId();
    const user = new User();
    const action = new Action(currentUser);

    //Validate if fields are valid. Verifies if sysVars objects exists.
    if (user.isProfileValid(newUser.profile) === false)
    {
      throw new Meteor.Error(400, "Invalid Request");
    }
    //Validates if this action is allowed to this user or to a guest user.
    if (action.attempt(currentActionModule, currentAction).isAllowed === true)
    {
      const userDefaultPrivileges = SysVars.findOne({name: 'default_privileges'}).privileges;
      newUser.profile.privileges = userDefaultPrivileges;
      Accounts.createUser({
          email: newUser.email,
          password: newUser.password,
          profile: newUser.profile
      });
    }
    else
    {
      //log action.attempt(currentActionModule, currentAction).reason .
      throw new Meteor.Error(400, "Action not allowed");
    }

   },

  'users.remove'(id) {
    check(id, String);
    Meteor.users.remove(id);
  },

  'users.update'(id, newProfile)
  {
    console.log(newProfile);
    // var newProfile = Object.assign({}, );
    //Object assign, profile y newProfile.
    //validar resultado con 'isProfileValid'
  }

});
