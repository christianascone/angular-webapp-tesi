var LEADERBOARD_FINAL_DIALOG_ID = "leaderboard_final_dialog";

Template.leaderboard.onCreated(function onCreated() {
	this.show_survey_button = new ReactiveVar(false);
});

Template.leaderboard.onRendered(function onRendered() {
	Logs.log("Open leaderboard");
});

// Helpers for leaderboard template
Template.leaderboard.helpers({
	/**
	 * List of players
	 * @return {[Player]} List with all players
	 */
	players() {
		console.log("player list");
		var list = Players.findSortByTotalScore();
		return list;
	},
	/**
	 * Increment the given num by 1
	 * @param  {Int} num number to increment
	 * @return {Int}     num + 1
	 */
	incremented(num) {
		return num + 1;
	},
	/**
	 * Check if the given index is in polePosition (first, second, third position)
	 * @param  {Int} index index to check
	 * @return {Boolean}       If the index is in pole position range
	 */
	polePosition(index) {
		return index < 3;
	},
	isCurrentPlayer(player) {
		if (!player) {
			return false;
		}

		var user = Meteor.user();
		if (user._id == player.userId) {
			return true;
		} else {
			return false;
		}
	},
	/**
	 * Returns if it is the fully gamified environment or not
	 * @return {Boolean} True, if the environment is full, or False if it's minimal
	 */
	isFullEnvironment() {
		var FULLY_GAMIFIED = true;
		var publicSettings = Meteor.settings.public;
		if (!publicSettings.ENVIRONMENT || publicSettings.ENVIRONMENT.FULL == undefined) {
			FULLY_GAMIFIED = true;
		} else {
			FULLY_GAMIFIED = publicSettings.ENVIRONMENT.FULL;
		}
		return FULLY_GAMIFIED;
	},
	/**
	 * Check if the survey button must be showed or not
	 * @return {Boolean} If it's debug environment or user already filled the final survey
	 */
	showSurveyButton() {
		var instance = Template.instance();
		// Check if is in debug
		Meteor.call("isDebug", function(err, response) {
			if (response) {
				return true;
			}

			var res = !userDoneSurvey(SURVEY_CERTAINTY_EFFECT_KEY) && !userDoneSurvey(SURVEY_REFLECTION_EFFECT_KEY);
			instance.show_survey_button.set(res);
		});

		return instance.show_survey_button.get();
	},
	leaderboardFinalDialogTitle() {
		return TAPi18n.__("leaderboard.final_dialog.title");
	},
	leaderboardFinalDialogMessage() {
		return TAPi18n.__("leaderboard.final_dialog.message");
	},
	leaderboardFinalDialogClose() {
		return TAPi18n.__("leaderboard.final_dialog.close");
	}
});

Template.leaderboard.events({
	/**
	 * Click event on survey button
	 */
	'click #leaderboard-survey-button' (event, instance) {
		var doneSurvey = userDoneSurvey(SURVEY_CERTAINTY_EFFECT_KEY) || userDoneSurvey(SURVEY_REFLECTION_EFFECT_KEY);
		if (doneSurvey) {
			Blaze._globalHelpers.showDialog(LEADERBOARD_FINAL_DIALOG_ID);
		} else {
			Router.go('survey', {
				_bias: SURVEY_CERTAINTY_EFFECT_KEY
			});
		}
	},
	/**
	 * Close button of final dialog clicked
	 */
	'click #leaderboard_final_close_button' (event, instance) {
		Blaze._globalHelpers.closeDialog(LEADERBOARD_FINAL_DIALOG_ID);
		Router.go('welcome');
	}
});