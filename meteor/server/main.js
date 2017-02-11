import {
	Meteor
} from 'meteor/meteor';

var FINAL_USER_POSITION = 3;

Meteor.startup(() => {
	// Check MAIL_URL
	var email_env = process.env.MAIL_URL;
	if (!email_env) {
		// Try to read MAIL_URL from private settings in json
		var PRIVATE_SETTINGS = Meteor.settings.private;
		if (PRIVATE_SETTINGS && PRIVATE_SETTINGS.MAIL_URL) {
			process.env.MAIL_URL = PRIVATE_SETTINGS.MAIL_URL;
		} else {
			console.warn("No MAIL_URL environment variable found.");
		}
	}

	Meteor.call("setupMockUsers");
});

// In your server code: define a method that the client can call
Meteor.methods({
	/**
	 * Setup system with mocked users and mocked scores
	 * @return {void} 
	 */
	setupMockUsers: function() {
		var points = 750;
		// Try to read MAX_REWARD from public settings
		if (Meteor.settings.public && Meteor.settings.public.MAX_REWARD) {
			points = Meteor.settings.public.MAX_REWARD;
		}
		var mockUsersSize = 9;
		var existentMockSeries = ScoreSeries.byMockedUsers().fetch();
		// If mocked users are found, stop setup
		if (mockUsersSize <= existentMockSeries.length) {
			console.log("Setup already done.");
			return;
		}
		// Create new mock user
		var result1 = Players.createPlayer({
			address: "max.rinaldi@gmail.com"
		});
		var result2 = Players.createPlayer({
			address: "elisasoverini@gmail.com"
		});
		var result3 = Players.createPlayer({
			address: "selmi.stefano91@hotmail.it"
		});
		var result4 = Players.createPlayer({
			address: "anna.marin@yahoo.it"
		});
		var result5 = Players.createPlayer({
			address: "scarletti@gmail.com"
		});
		var result6 = Players.createPlayer({
			address: "lorenzo.ligregni@studio.unibo.it"
		});
		var result7 = Players.createPlayer({
			address: "giuseppe.orizzonte@studio.unibo.it"
		});
		var result8 = Players.createPlayer({
			address: "bernardi.n@hotmail.it"
		});
		var result9 = Players.createPlayer({
			address: "ilaria_serra@gmail.com"
		});

		// Create a new series and score for every player
		var playersArray = [result1, result2, result3, result4, result5, result6, result7, result8, result9];

		console.log("Setting up...");
		for (var i = 0; i < playersArray.length; i++) {
			var playerId = playersArray[i];
			// Divisor is 0+1 in order to prevent a 0 division
			var divisor = i + 1;
			var userPosition = FINAL_USER_POSITION;
			var multiplier = userPosition - 1 + 0.2;

			// Points for player are the maximum real user points (gets from input)
			// * 1.2 (so, one player will be first) and divided by divisor
			var playerPoints = points * multiplier / divisor;
			// Add score series and score for player
			console.log("Add mock data for user: " + playerId);
			var createdScoreSeriesId = ScoreSeries.createScoreSeriesMock(playerId);
			Scores.createScoreMock(Math.floor(playerPoints), createdScoreSeriesId);
			var scoreSeries = ScoreSeries.findOne(createdScoreSeriesId);
			scoreSeries.close();
		}
		console.log("Setup successfully completed");
	},
	/**
	 * Send an email using MAIL_URL environment variable for SMTP
	 * connection.
	 * 
	 * @param  {String} to      Recipient address
	 * @param  {String} from    Sender address
	 * @param  {String} subject Email subject
	 * @param  {String} text    Mail body
	 * @return {void}
	 */
	sendEmail: function(to, from, subject, text, attachments) {
		check([from, subject, text], [String]);
		check(to, [String]);
		// Let other method calls from the same client start running,
		// without waiting for the email sending to complete.
		this.unblock();
		Email.send({
			to: to,
			from: from,
			subject: subject,
			text: text,
			attachments: attachments
		});

		var attachmentsCount = 0;
		if (attachments) {
			attachmentsCount = attachments.length;
		}
		console.log("Sending email to: [" + to + "], from: [" + from + "], subject: [" + subject + "], text: [" + text + "], with [" + attachmentsCount + "] attachments");
	},
	/**
	 * Check if it's running in debug
	 * @return {Boolean} Is in debug
	 */
	isDebug: function() {
		var PRIVATE_SETTINGS = Meteor.settings.private;
		if (!PRIVATE_SETTINGS || !PRIVATE_SETTINGS.DEBUG) {
			return false;
		}
		return true;
	},
	/**
	 * Check if logs are enabled
	 * @return {Boolean} Is logger enabled
	 */
	isLoggerEnabled: function() {
		var PRIVATE_SETTINGS = Meteor.settings.private;
		if (!PRIVATE_SETTINGS || PRIVATE_SETTINGS.LOGS_ENABLED == undefined) {
			return true;
		}
		return PRIVATE_SETTINGS.LOGS_ENABLED;
	},
	/**
	 * Save given personal data (json) in user 
	 * @param  {User} user       User to update
	 * @param  {String} SURVEY_KEY Survey key
	 * @param  {JSON} results    Profile data
	 * @return {void}            
	 */
	savePersonalUserDetail: function(user, SURVEY_KEY, results) {
		console.log("user id : "+user._id);
		console.log("results : "+results);
		Meteor.users.update(user._id, {
		$set: {
			'profile.data': results
		}
	})
	},
	/**
	 * Save survey data on db
	 * @param  {User} user       User who filled the survey
	 * @param  {String} SURVEY_KEY Survey key
	 * @param  {JSON} results    Survey data
	 * @return {void}            
	 */
	saveSurveyDataOnDb: function(user, SURVEY_KEY, results, userAgent) {
		SurveyResults.createSurveyResult(user._id, SURVEY_KEY, results);
		Logs.logUserAgent("Survey " + SURVEY_KEY + " completed.", userAgent);

		// Send results in email
		var emailAttachmentContentsJson = {
			user: user,
			survey: {
				bias: SURVEY_KEY,
				data: results
			}
		};
		var attachment = {
			fileName: "survey" + SURVEY_KEY + "_" + user._id + ".json",
			contents: JSON.stringify(emailAttachmentContentsJson, null, 2)
		};
		var attachmentsArray = [attachment];

		var publicSettings = Meteor.settings.public;
		var recipientAddress = publicSettings.RECIPIENT_MAIL_ADDRESS;
		var senderAddress = publicSettings.SENDER_MAIL_ADDRESS;
		if(!recipientAddress || !senderAddress){
			console.warn("Recipient or Sender address not found.");
			return;
		}
		Meteor.call("sendEmail", recipientAddress, senderAddress, "Survey " + SURVEY_KEY + " results user: " + user._id, "Attached survey " + SURVEY_KEY + " results of user " + user._id, attachmentsArray);
	}
});