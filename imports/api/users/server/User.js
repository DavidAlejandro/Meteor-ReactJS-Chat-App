import { check } from 'meteor/check';
import '../../systemVariables/sysVarsCollection.js';
import {objToMap} from '../../../javascript/customFunctions.js' ;

export default class User
{
  constructor()
  {}

  isProfileValid(profile)
  {
    //log reason before every 'return false'.
    check(profile, Object);
    const userMap = objToMap(profile);
    const userFields = SysVars.findOne({name: 'user_custom_fields'});
    const userDefaultPrivileges = SysVars.findOne({name: 'default_privileges'});

    if (userFields && userDefaultPrivileges)
    {
      let nonOptionalFields = 0;
      let newUserNonOptionalFields = 0;
      const userFieldsMap = objToMap(userFields.fields);
      for (let [key, value] of userFieldsMap.entries())
      {
        if(userFieldsMap.get(key).active === true && userFieldsMap.get(key).optional === false)
        {
          nonOptionalFields++;
        }
      }

      for (let [key, value] of userMap.entries())
      {
        if(userFieldsMap.has(key) && userFieldsMap.get(key).active)
        {
          if(typeof value !== userFieldsMap.get(key).type)
          {
            //type missmatch.
            return false;
          }
          if(userFieldsMap.get(key).optional === false && userMap.get(key) !== null && userMap.get(key) !== {} && userMap.get(key) !== [] && userMap.get(key) !== "" && userMap.get(key) !== undefined)
          {
            newUserNonOptionalFields++;
          }
        }
        else
        {
          //field doesn't exists.
          return false;
        }
      }

      if(newUserNonOptionalFields !== nonOptionalFields)
      {
          //incorrect number of non-optional fields.
          return false;
      }

    }
    else
    {
      //To log.
      // user_custom_fields or default_privileges not defined in system variables collection.
      return false;
    }
  }
}
