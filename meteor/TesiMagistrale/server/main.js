import {
	Meteor
} from 'meteor/meteor';

PlayersList = new Mongo.Collection('players');
console.log("Init players");

Meteor.startup(() => {
	// code to run on server at startup
});