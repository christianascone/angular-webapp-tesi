import {
	Template
} from 'meteor/templating';
import {
	ReactiveVar
} from 'meteor/reactive-var';

import './main.html';

Template.main.rendered = function() {
	user = Meteor.user();
	if (!user) {
		return;
	}
	userId = user._id;
	// Search player with user id
	loggedPlayer = PlayersList.findOne().byUserId(userId);

	// Read email from logged user
	email = null;
	if (user && user.emails) {
		email = user.emails[0];
	}

	// If no players with given userId are found, a new one is created
	if (loggedPlayer.length == 0) {
		result = PlayersList.insert({
			"email": email,
			"name": email,
			"userId": userId
		});
		console.log(result);
	} else {
		console.log("Existing player with userId: " + userId);
	}

}

// Helpers for logout template
Template.main.helpers({
	loggedUserEmail() {
		var user = Meteor.user();
		if (!user || !user.emails) {
			return null;
		}
		return user.emails[0].address;
	}
});

Template.logout.events({
	'click .logout' (event, instance) {
		event.preventDefault();
		Meteor.logout();
		Router.go('login');
	}
});