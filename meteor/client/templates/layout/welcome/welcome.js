Template.welcome.onRendered(function onRendered() {
  Logs.log("Open Welcome");
});

Template.welcome.helpers({
  /**
   * Check if task 1 (Memory Game) is already done
   * @return {Boolean} True if task is done
   */
  taskMemoryIsDone() {
    return userDoneMemoryGame();
  },
  /**
   * Check if task 2 (survey 1) is already done
   * @return {Boolean} True if task is done
   */
  taskSurvey1IsDone() {
    return userDoneSurvey(SURVEY_FRAMING_EFFECT_KEY);
  },
  /**
   * Check if task 3/4 (leaderboard and survey 2) is already done
   * @return {Boolean} True if task is done
   */
  taskSurvey2IsDone() {
    return userDoneSurvey(SURVEY_CERTAINTY_EFFECT_KEY) || userDoneSurvey(SURVEY_REFLECTION_EFFECT_KEY);
  }
});
// Events for dialog template
Template.welcome.events({
  'click .ok-dialog' (event, instance) {
    console.log("ok dialog");
    Blaze._globalHelpers.closeDialog();
  },
  'click .close-dialog' (event, instance) {
    Blaze._globalHelpers.closeDialog();
  },
  // Click event for "start test" button which open the memory game
  'click #start-test-button' (event, instance) {
    Logs.log("Clicked Start Test button");
    Router.go('memory');
  },
  // Click event for "first survey" button which open the first survey
  'click #first-survey-button' (event, instance) {
    Logs.log("Clicked First survey button");
    Router.go('survey', {_bias: SURVEY_FRAMING_EFFECT_KEY});
  },
  // Click event for "go to leaderboard" button which open the leaderboard
  'click #leaderboard-button' (event, instance) {
    Logs.log("Clicked go to leaderboard button");
    Router.go('leaderboard');
  }
});