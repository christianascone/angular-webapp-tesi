/**
 * Gets number of memory game closed series for current user
 * @return {Int} Number of closed series for player
 */
userMemoryGameCount = function() {
  var user = Meteor.user();
  if (!user) {
    return false;
  }
  var userId = user._id;
  var loggedPlayer = undefined;
  if (Players.findOne()) {
    loggedPlayer = Players.findOne().byUserId(userId);
  }
  if (!loggedPlayer) {
    return false;
  }
  // Find all closed series for logged player
  var closedSeries = loggedPlayer.closedScoreSeries().fetch();

  return closedSeries;
}

/**
 * Check if the logged user has done also the final memory game
 * @return {Boolean} If user has done the final memory game
 */
userDoneFinalMemoryGame = function() {
  var closedSeries = userMemoryGameCount();
  // Check if player has closed more than 1 series
  return closedSeries.length > 1;
}

/**
 * Check if the logged user has done memory game
 * @return {Boolean} If user has done memory game
 */
userDoneMemoryGame = function() {
  var closedSeries = userMemoryGameCount();
  // Check if player has closed at least one score series
  return closedSeries.length > 0;
}

/**
 * Check if user has completed the survey with given index
 * @param  {String} surveyBias Survey index
 * @return {Boolean}             If user has completed the survey
 */
userDoneSurvey = function(surveyBias) {
  var user = Meteor.user();
  if (!user) {
    return false;
  }
  // Find survey with index for logged user
  var userSurveyResults = SurveyResults.byUserIdAndBias(user._id, surveyBias).fetch();
  return userSurveyResults.length > 0;
}

/**
 * Gets the current user saved language
 * @return {String} Current saved language for user
 */
const userLanguage = () => {
  // If the user is logged in, retrieve their saved language
  if (Meteor.user()) return Meteor.user().profile.language;
};

Meteor.startup(() => {
  var PUBLIC_SETTINGS = Meteor.settings.public;
  // Default language is english
  var defaultLang = "en";
  // Try to read default language from settings, if exists
  if (PUBLIC_SETTINGS && PUBLIC_SETTINGS.LANGUAGE && PUBLIC_SETTINGS.LANGUAGE.DEFAULT) {
    defaultLang = PUBLIC_SETTINGS.LANGUAGE.DEFAULT;
  }
  // Set language
  TAPi18n.setLanguage(defaultLang);

  Tracker.autorun(() => {
    // Read user saved language if exists and set as current language
    if (userLanguage()) {
      var userLang = userLanguage();
      TAPi18n.setLanguage(userLang);
    }
  });
});