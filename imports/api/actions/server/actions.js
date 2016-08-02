// import { Mongo } from 'meteor/mongo';
// import { check } from 'meteor/check';
import {Actions} from '../actionsCollection.js';

  Meteor.publish('actions', function actionsPublication() {
    return Actions.find();
  });
