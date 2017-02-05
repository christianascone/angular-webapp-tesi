/**
 * Gets the questions json for survey 1, using current language
 * 
 * @return {Json} Json containing (localized) questions for survey 1
 */
function getSurvey1QuestionsJson() {
  return survey["survey_questions_" + TAPi18n.getLanguage()].survey_1;
}

Template.survey_1.helpers({
  /**
   * Function to execute after survey_1 template done loading
   * @return {void}
   */
  afterLoad() {
    var user = Meteor.user();
    if (!user) {
      console.log("Logged user not found.");
      Router.go('login');
      return;
    }

    Logs.log("Open Survey_1");
  },
  questions() {
    return getSurvey1QuestionsJson();
  }
});

// Events for survey_1 template
Template.survey_1.events({
  // submit action on form element
  'submit form': function(event) {
    event.preventDefault();
    var example = $('input[name=example]:checked').val();
  }
});