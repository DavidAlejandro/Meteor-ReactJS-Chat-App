import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// const currentUser = this.userId;
export const Tasks = new Mongo.Collection('tasks');
