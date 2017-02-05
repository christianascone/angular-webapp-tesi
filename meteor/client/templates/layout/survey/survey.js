/**
 * Gets the questions json for survey 1, using current language
 * 
 * @return {Json} Json containing (localized) questions for survey 1
 */
function getSurvey1QuestionsJson() {
  return survey["survey_questions_" + TAPi18n.getLanguage()].survey_1;
}

Template.survey_1.onRendered(function onRendered() {
  Logs.log("Open survey 1");
});

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

    var results = [];
    // Gets all the survey 1 questions
    var questions = getSurvey1QuestionsJson();
    for (var i = 0; i < questions.length; i++) {
      var question = questions[i];
      // Read selected radio button value
      var answer = $('input[name=' + question.id + ']:checked').val();
      // Build a json with all data useful for a more readable result
      // (question id, question text and answer value)
      var result = {
        id: question.id,
        question: question.question,
        answer: answer
      };
      results.push(result);
    }

    console.log(results);
  }
});