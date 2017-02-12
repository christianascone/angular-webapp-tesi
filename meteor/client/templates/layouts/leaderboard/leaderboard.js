var LEADERBOARD_FINAL_DIALOG_ID = "leaderboard_final_dialog";
var LEADERBOARD_FATALITY_DIALOG_ID = "leaderboard_fatality_dialog";

var usedBias = undefined;
var previousBackgroundColor = undefined;
var materialGreen = "#4caf50";
var materialRed = "#f44336";

var FINAL_USER_POSITION = 3;

Template.leaderboard.onCreated(function onCreated() {
	this.show_survey_button = new ReactiveVar(false);
	// Try to read FINAL_USER_POSITION from public settings
	if (Meteor.settings.public && Meteor.settings.public.FINAL_USER_POSITION) {
		FINAL_USER_POSITION = Meteor.settings.public.FINAL_USER_POSITION;
	}
});

Template.leaderboard.onRendered(function onRendered() {
	Logs.log("Open leaderboard");

	// Random number for fatality buttons swap
	var randomSwap = Math.floor(Math.random() * 2);
	if (randomSwap == 1) {
		// Swap two fatality dialog buttons
		$el = $('#leaderboard_mercy_button');
		$('#leaderboard_fatality_button').insertBefore($el);
	}
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
				instance.show_survey_button.set(true);
				return;
			}

			// If user must play memory or fill framing survey, hide button
			if (!userDoneMemoryGame() || !userDoneSurvey(SURVEY_FRAMING_EFFECT_KEY)) {
				instance.show_survey_button.set(false);
				return;
			}

			var res = !userDoneSurvey(SURVEY_CERTAINTY_EFFECT_KEY) && !userDoneSurvey(SURVEY_REFLECTION_EFFECT_KEY);
			instance.show_survey_button.set(res);
		});

		return instance.show_survey_button.get();
	},
	leaderboardFatalityDialogTitle() {
		return TAPi18n.__("leaderboard.fatality_dialog.title");
	},
	leaderboardFatalityDialogFatality() {
		return TAPi18n.__("leaderboard.fatality_dialog.fatality");
	},
	leaderboardFatalityDialogMercy() {
		return TAPi18n.__("leaderboard.fatality_dialog.mercy");
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

/**
 * Save the selected fatality data (deathblow or mercy).
 * Build a json with used bias, message shown to user and his choice
 * 
 * @param  {String} usedBias Bias to use (Certainty or Reflection)
 * @param  {String} clicked  Fatality or mercy string value to save
 * @return {void}          
 */
function saveFatalityData(usedBias, clicked) {
	var user = Meteor.user();
	var results = {
		id: usedBias,
		question: TAPi18n.__("leaderboard.fatality_dialog.message_" + usedBias, {}, "en"),
		answer: TAPi18n.__("leaderboard.fatality_dialog." + clicked, {}, "en")
	};
	Meteor.call("saveSurveyDataOnDb", user, usedBias, results, navigator.userAgent);
	Blaze._globalHelpers.closeDialog(LEADERBOARD_FATALITY_DIALOG_ID);
	Blaze._globalHelpers.showDialog(LEADERBOARD_FINAL_DIALOG_ID);
}

Template.leaderboard.events({
	'click #leaderboard_fatality_button' (event, instance) {
		Logs.log("Clicked fatality button");
		var clicked = "fatality";
		saveFatalityData(usedBias, clicked);

	},
	'click #leaderboard_mercy_button' (event, instance) {
		Logs.log("Clicked mercy button");
		var clicked = "mercy";
		saveFatalityData(usedBias, clicked);
	},
	/**
	 * Hover fatality button, set the new background for +2 or -2 positions
	 */
	'mouseenter #leaderboard_fatality_button' (event, instance) {
		if (!previousBackgroundColor) {
			previousBackgroundColor = $('.leaderboard-rank-card-1').css("background-color");
		}
		$('.leaderboard-rank-card-' + (FINAL_USER_POSITION - 2)).css("background-color", materialGreen);
		$('.leaderboard-rank-card-' + (FINAL_USER_POSITION - 1)).css("background-color", materialGreen);
		$('.leaderboard-rank-card-' + (FINAL_USER_POSITION + 1)).css("background-color", materialRed);
		$('.leaderboard-rank-card-' + (FINAL_USER_POSITION + 2)).css("background-color", materialRed);
	},
	/**
	 * Hover mercy button, set the new background for +1 (certainty) or -1 (reflection)
	 */
	'mouseenter #leaderboard_mercy_button' (event, instance) {
		if (!previousBackgroundColor) {
			previousBackgroundColor = $('.leaderboard-rank-card-1').css("background-color");
		}
		if (usedBias == SURVEY_CERTAINTY_EFFECT_KEY) {
			$('.leaderboard-rank-card-' + (FINAL_USER_POSITION - 1)).css("background-color", materialGreen);
		} else {
			$('.leaderboard-rank-card-' + (FINAL_USER_POSITION + 1)).css("background-color", materialRed);
		}
	},
	/**
	 * Leave fatality button, set the previous backround color
	 */
	'mouseleave #leaderboard_fatality_button' (event, instance) {
		$('.leaderboard-rank-card-' + (FINAL_USER_POSITION - 2)).css("background-color", previousBackgroundColor);
		$('.leaderboard-rank-card-' + (FINAL_USER_POSITION - 1)).css("background-color", previousBackgroundColor);
		$('.leaderboard-rank-card-' + (FINAL_USER_POSITION + 1)).css("background-color", previousBackgroundColor);
		$('.leaderboard-rank-card-' + (FINAL_USER_POSITION + 2)).css("background-color", previousBackgroundColor);
	},
	/**
	 * Leave mercy button, set the previous backround color
	 */
	'mouseleave #leaderboard_mercy_button' (event, instance) {
		if (usedBias == SURVEY_CERTAINTY_EFFECT_KEY) {
			$('.leaderboard-rank-card-' + (FINAL_USER_POSITION - 1)).css("background-color", previousBackgroundColor);
		} else {
			$('.leaderboard-rank-card-' + (FINAL_USER_POSITION + 1)).css("background-color", previousBackgroundColor);
		}
	},
	/**
	 * Click event on survey button
	 */
	'click #leaderboard-survey-button' (event, instance) {
		Logs.log("Clicked survey button in leaderboard page");

		var doneSurvey = userDoneSurvey(SURVEY_CERTAINTY_EFFECT_KEY) || userDoneSurvey(SURVEY_REFLECTION_EFFECT_KEY);
		if (doneSurvey) {
			Blaze._globalHelpers.showDialog(LEADERBOARD_FINAL_DIALOG_ID);
		} else {
			var certaintySurveyResults = SurveyResults.byBias(SURVEY_CERTAINTY_EFFECT_KEY).fetch();
			var reflectionSurveyResults = SurveyResults.byBias(SURVEY_REFLECTION_EFFECT_KEY).fetch();

			var biasToUse = "";
			if (certaintySurveyResults.length > reflectionSurveyResults.length) {
				biasToUse = SURVEY_REFLECTION_EFFECT_KEY;
			} else {
				biasToUse = SURVEY_CERTAINTY_EFFECT_KEY;
			}
			// Save the used bias
			usedBias = biasToUse;

			var messageJsonObject = "leaderboard.fatality_dialog.message_" + biasToUse + ".";

			var messageHtml = TAPi18n.__(messageJsonObject + "1") + "<ul>" + "<li>" + TAPi18n.__(messageJsonObject + "2") + "</li>" + "<li>" + TAPi18n.__(messageJsonObject + "3") + "</li>" + "</ul>";
			Blaze._globalHelpers.showDialog(LEADERBOARD_FATALITY_DIALOG_ID, messageHtml);
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