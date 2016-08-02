import { Meteor } from 'meteor/meteor';

import '../../api/users/server/users.js';
import '../../api/actions/server/actions.js';
import '../../api/systemVariables/sysVarsCollection.js';
import '../../api/conversations/server/conversations.js';

Meteor.startup(() =>
{
    const customUserFileds = SysVars.findOne({name: 'user_custom_fields'});
    const defaultPrivileges = SysVars.findOne({name: 'default_privileges'});

    if (!customUserFileds) {
      const userCustomFields =
      {
        name: 'user_custom_fields',
        fields: {
          name:
          {
            active: true,
            userEditable: true,
            type: "string",
            "optional": false
          },
          lastName:
          {
            active: true,
            userEditable: true,
            type: "String",
            "optional": true
          }
        }
      };
      SysVars.insert(userCustomFields);
    }

    if (!defaultPrivileges)
    {
      const userDefaultPrivileges = {
            name: 'default_privileges',
            privileges:
            {
              users : {
                  "login" : true,
                  "insertUsers" : true
              },
            }
        };
        SysVars.insert(userDefaultPrivileges);
    }
});
