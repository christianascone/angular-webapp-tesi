var SURVEY1_CONFIRM_DIALOG_ID = "survey1_confirm_dialog";
var SURVEY1_FINAL_DIALOG_ID = "survey1_final_dialog";

/**
 * Gets the questions json for survey 1, using current language
 * 
 * @return {Json} Json containing (localized) questions for survey 1
 */
function getSurvey1QuestionsJson() {
  return survey_questions.survey_1;
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

    // Check if is in debug
    Meteor.call("isDebug", function(err, response) {
      // Find survey with index 1 for logged user
      var userSurveyResults = SurveyResults.byUserIdAndIndex(user._id, 1).fetch();
      // If user already completed the survey with index 1 and this is not
      // a debug environment, he cannot continue
      if (userSurveyResults.length > 0 && !response) {
        Logs.log("Try to complete another Survey 1. Not permitted, due to already present results.");
        Blaze._globalHelpers.showDialog(SURVEY1_FINAL_DIALOG_ID);
        return;
      }
    });
  },
  /**
   * Gets list of questions for survey 1
   * @return {JSONArray} Array of questions
   */
  questions() {
    return getSurvey1QuestionsJson();
  },
  /**
   * Simple check for first object in options list.
   * If true, the checked option is added to input
   * 
   * @param  {Int}  index Index of item to check
   * @return {String}       "Checked" if index is equal to 0, "" otherwise
   */
  isChecked(index) {
    if(index == 0){
      return "checked";
    }else{
      return "";
    }
  },
  /**
   * Translate a question object
   * @param  {JSON} json Json object containing string to translate
   * @param  {String} tag  Tag identifier for object to translate
   * @return {String}      Translated string
   */
  translateJsonObject(json, tag) {
    // Read from object using a tag concatenation
    // For example: "question" tag, in english ("en")
    // will return json["question_en"]
    return json[tag + "_" + TAPi18n.getLanguage()];
  },
  surveyConfirmDialogTitle() {
    return TAPi18n.__("survey.1.confirm_dialog.title");
  },
  surveyConfirmDialogMessage() {
    return TAPi18n.__("survey.1.confirm_dialog.message");
  },
  surveyConfirmDialogOk() {
    return TAPi18n.__("survey.1.confirm_dialog.confirm");
  },
  surveyConfirmDialogClose() {
    return TAPi18n.__("survey.1.confirm_dialog.cancel");
  },
  surveyFinalDialogTitle() {
    return TAPi18n.__("survey.1.final_dialog.title");
  },
  surveyFinalDialogMessage() {
    return TAPi18n.__("survey.1.final_dialog.message");
  },
  surveyFinalDialogClose() {
    return TAPi18n.__("survey.1.final_dialog.close");
  }
});

// Events for survey_1 template
Template.survey_1.events({
  'submit form' (event, instance) {
    event.preventDefault();
    Blaze._globalHelpers.showDialog(SURVEY1_CONFIRM_DIALOG_ID);
    Logs.log("Survey 1: pressed submit button.");
  },
  /**
   * Close button of survey confirm dialog. User can continue to fill form.
   */
  'click #survey1_confirm_close_button' (event, instance) {
    Blaze._globalHelpers.closeDialog(SURVEY1_CONFIRM_DIALOG_ID);
    Logs.log("Survey 1: pressed cancel button.");
  },
  /**
   * Close button of survey ending dialog clicked
   */
  'click #survey1_final_close_button' (event, instance) {
    Blaze._globalHelpers.closeDialog(SURVEY1_FINAL_DIALOG_ID);
    Router.go('welcome');
  },
  // submit action on form element
  'click #survey1_confirm_ok_button': function(event) {
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
        question: question.question_en,
        answer: answer
      };
      results.push(result);
    }

    console.log(results);
    var user = Meteor.user();
    if (!user) {
      console.log("Logged user not found.");
      Router.go('login');
      return;
    }
    SurveyResults.createSurvey1Result(user._id, results);
    Logs.log("Survey 1 completed.");
    Blaze._globalHelpers.showDialog(SURVEY1_FINAL_DIALOG_ID);
  }
});