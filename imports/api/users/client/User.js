import { check } from 'meteor/check';

export default class User {
    constructor(id) {
      this.current = Meteor.user();
      this.id = id;
    }

    login(email, password, callback = function(){})
    {
      Meteor.loginWithPassword(
        email,
        password,
        function(err, res)
        {
          if (err) {
            callback(err, undefined);
          }
          else
          {
            callback(undefined, 'logged in');
          }
        }
      );
    }

    insert(newUser = {}, callback = function(){})
    {
      check(newUser, Object);
      check(callback, Function);
      // check(email, String);
      // check(password, String);
      // check(name, String);
      // check(callback, Function);
      // let newUser =
      // {
      //   email: email,
      //   password: password,
      //   profile: {
      //     name: name
      //   }
      // };
      Meteor.call('users.insert', newUser, function(err, res)
      {
        if (err)
        {
          callback(err, undefined);
        }
        else
        {
          callback(undefined, 'User created.');
        }
      });
    };
    remove(id)
    {
        Meteor.call('users.remove', id, function(res, err)
        {
          if (err) {
            console.log(err);
          }
          else
          {
            console.log(res);
          }
        });
    };
    update(id, ...params)
    {
      let callback = function(res, err)
      {
        if(err)
        {
          console.log(a);
        }
        else
        {
          console.log(res);
        }
      };
      let a = 9;
      Meteor.call('users.update', id, params, callback());
    };
}

export { User };
