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
  },
  /**
   * Check if user has completed every task
   * @return {Boolean} If user completed every task
   */
  allTasksCompleted() {
    return userDoneMemoryGame() && userDoneSurvey(SURVEY_FRAMING_EFFECT_KEY) && userDoneSurvey(SURVEY_CERTAINTY_EFFECT_KEY);
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
  // click is the event type and button is the selector
  'click #start-test' (event, instance) {
    Logs.log("Clicked Start Test button");
    Router.go('memory');
  },
});