var SURVEY_CONFIRM_DIALOG_ID = "survey_confirm_dialog";
var SURVEY_FINAL_DIALOG_ID = "survey_final_dialog";
var INDEX = 0;

/**
 * Gets the questions json for survey, using current language
 * 
 * @return {Json} Json containing (localized) questions for survey
 */
function getSurveyQuestionsJson() {
  return survey_questions["survey_"+INDEX];
}

Template.survey.helpers({
  /**
   * Function to execute after survey template done loading
   * @return {void}
   */
  afterLoad() {
    var user = Meteor.user();
    if (!user) {
      console.log("Logged user not found.");
      Router.go('login');
      return;
    }
    INDEX = Router.current().params._index;

    Logs.log("Open Survey_"+INDEX);

    // Check if is in debug
    Meteor.call("isDebug", function(err, response) {
      // Find survey with index for logged user
      var userSurveyResults = SurveyResults.byUserIdAndIndex(user._id, INDEX).fetch();
      // If user already completed the survey with saved index and this is not
      // a debug environment, he cannot continue
      if (userSurveyResults.length > 0 && !response) {
        Logs.log("Try to complete another Survey "+INDEX+". Not permitted, due to already present results.");
        Blaze._globalHelpers.showDialog(SURVEY_FINAL_DIALOG_ID);
        return;
      }
    });
  },
  /**
   * Gets list of questions for survey
   * @return {JSONArray} Array of questions
   */
  questions() {
    return getSurveyQuestionsJson();
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
  surveyTitle() {
    return TAPi18n.__("survey."+INDEX+".title");
  },
  surveyConfirmDialogTitle() {
    return TAPi18n.__("survey."+INDEX+".confirm_dialog.title");
  },
  surveyConfirmDialogMessage() {
    return TAPi18n.__("survey."+INDEX+".confirm_dialog.message");
  },
  surveyConfirmDialogOk() {
    return TAPi18n.__("survey."+INDEX+".confirm_dialog.confirm");
  },
  surveyConfirmDialogClose() {
    return TAPi18n.__("survey."+INDEX+".confirm_dialog.cancel");
  },
  surveyFinalDialogTitle() {
    return TAPi18n.__("survey."+INDEX+".final_dialog.title");
  },
  surveyFinalDialogMessage() {
    return TAPi18n.__("survey."+INDEX+".final_dialog.message");
  },
  surveyFinalDialogClose() {
    return TAPi18n.__("survey."+INDEX+".final_dialog.close");
  }
});

// Events for survey template
Template.survey.events({
  'submit form' (event, instance) {
    event.preventDefault();
    Blaze._globalHelpers.showDialog(SURVEY_CONFIRM_DIALOG_ID);
    Logs.log("Survey "+INDEX+": pressed submit button.");
  },
  /**
   * Close button of survey confirm dialog. User can continue to fill form.
   */
  'click #survey_confirm_close_button' (event, instance) {
    Blaze._globalHelpers.closeDialog(SURVEY_CONFIRM_DIALOG_ID);
    Logs.log("Survey "+INDEX+": pressed cancel button.");
  },
  /**
   * Close button of survey ending dialog clicked
   */
  'click #survey_final_close_button' (event, instance) {
    Blaze._globalHelpers.closeDialog(SURVEY_FINAL_DIALOG_ID);
    Router.go('welcome');
  },
  // submit action on form element
  'click #survey_confirm_ok_button': function(event) {
    var results = [];
    // Gets all the survey questions
    var questions = getSurveyQuestionsJson();
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
    SurveyResults.createSurveyResult(user._id, INDEX, results);
    Logs.log("Survey "+INDEX+" completed.");
    Blaze._globalHelpers.showDialog(SURVEY_FINAL_DIALOG_ID);
    // Send results in email
    var emailAttachmentContentsJson = {
      user: user,
      survey: {
        index: INDEX,
        data: results
      }
    };
    var attachment = {
      fileName: "survey"+INDEX+"_" + user._id + ".json",
      contents: JSON.stringify(emailAttachmentContentsJson, null, 2)
    };
    var attachmentsArray = [attachment];
    Blaze._globalHelpers.sendMeEmail("Survey "+INDEX+" results user: " + user._id, "Attached survey "+INDEX+" results of user " + user._id, attachmentsArray);
  }
});