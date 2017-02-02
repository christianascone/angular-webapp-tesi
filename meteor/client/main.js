import {
	Template
} from 'meteor/templating';
import {
	ReactiveVar
} from 'meteor/reactive-var';
import {
	Session
} from 'meteor/session';
import {
	TAPi18n
} from 'meteor/tap:i18n';

dialogPolyfill = require('dialog-polyfill');

import './main.html';

Template.main.onCreated(function mainOnCreated() {
	// Set default debug value as false (waiting to read it from server)
	this.isDebug = new ReactiveVar(false);
	// Read isDebug reactive var in variable, so it is also visible
	// inside async block
	var isDebugReactiveVar = Template.instance().isDebug;
	// Check debug value on server
	Meteor.call("isDebug", function(err, response) {
		// Update reactive var
		isDebugReactiveVar.set(response);
	});
});

// Helpers for logout template
Template.main.helpers({
	/**
	 * Function to execute after main template done loading
	 * @return {void}
	 */
	afterLoad() {
		var user = Meteor.user();
		if (!user) {
			console.log("No logged user found.");
			Router.go('login');
			return;
		}
	},
	/**
	 * Gets first email address of logged user
	 * @return {String} Email address of logged user
	 */
	loggedUserEmail() {
		var user = Meteor.user();
		if (!user || !user.emails) {
			return null;
		}
		return user.emails[0].address;
	},
	currentPlayer() {
		var user = Meteor.user();
		if (!user) {
			console.log("No logged user found.");
			Router.go('login');
			return;
		}
		var userId = user._id;
		// Search player with user id
		var loggedPlayer = undefined;
		if (Players.findOne()) {
			loggedPlayer = Players.findOne().byUserId(userId);
		}

		return loggedPlayer;
	},
	/**
	 * Check if it's in debug environment
	 * @return {Boolean} Private Debug setting
	 */
	isDebug(){
		return Template.instance().isDebug.get();
	}
});

Template.logout.events({
	'click .logout' (event, instance) {
		event.preventDefault();
		Meteor.logout(function(err) {
			Router.go('login');
		});
	}
});