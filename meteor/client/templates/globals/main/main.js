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

Template.main.onRendered(function onRendered() {
	// Logs scrolling
	$('main').scroll(function() {
		var main_offset = $('main').scrollTop();

		Logs.log("Scroll to offset: " + main_offset);
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
	},
	/**
	 * Returns if it is the fully gamified environment or not
	 * @return {Boolean} True, if the environment is full, or False if it's minimal
	 */
	isFullEnvironment() {
		var FULLY_GAMIFIED = true;
		var publicSettings = Meteor.settings.public;
		if(!publicSettings.ENVIRONMENT || publicSettings.ENVIRONMENT.FULL == undefined){
			FULLY_GAMIFIED = true;
		}else{
			FULLY_GAMIFIED = publicSettings.ENVIRONMENT.FULL;
		}
		return FULLY_GAMIFIED;
	},
	/**
	 * Gets the personal data path for survey
	 * @return {String} survey path key
	 */
	personalDataPath() {
		return SURVEY_PERSONAL_DATA_KEY;
	},
	/**
	 * Gets the framing path for survey
	 * @return {String} _bias value for survey
	 */
	framingPath() {
		return SURVEY_FRAMING_EFFECT_KEY;
	},
	/**
	 * Gets the certainty path for survey
	 * @return {String} _bias value for survey
	 */
	certaintyPath() {
		return SURVEY_CERTAINTY_EFFECT_KEY;
	},
	/**
	 * Gets the reflection path for survey
	 * @return {String} _bias value for survey
	 */
	reflectionPath() {
		return SURVEY_REFLECTION_EFFECT_KEY;
	}
});

Template.logout.events({
	'click .logout' (event, instance) {
		event.preventDefault();
		Logs.log("Logout");
		Meteor.logout(function(err) {
			Router.go('login');
		});
	}
});