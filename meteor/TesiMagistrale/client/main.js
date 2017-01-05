import {
	Template
} from 'meteor/templating';
import {
	ReactiveVar
} from 'meteor/reactive-var';

import './main.html';

// Helpers for logout template
Template.main.helpers({
	loggedUserEmail() {
		var user = Meteor.user();
		if (!user || !user.emails) {
			return null;
		}
		return user.emails[0].address;
	},
	afterLoad() {
		user = Meteor.user();
		if (!user) {
			console.log("No logged user found.");
			return;
		}
		userId = user._id;
		// Search player with user id
		loggedPlayer = Players.findOne().byUserId(userId);

		// Read email from logged user
		email = null;
		if (user && user.emails) {
			email = user.emails[0];
		}

		// If no players with given userId are found, a new one is created
		if (!loggedPlayer) {
			result = Players.createPlayer(email, email, userId);
			console.log(result);
		} else {
			console.log("Existing player with userId: " + userId);
		}
	}
});

Template.logout.events({
	'click .logout' (event, instance) {
		event.preventDefault();
		Meteor.logout();
		Router.go('login');
	}
});