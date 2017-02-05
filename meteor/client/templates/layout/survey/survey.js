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
  },
  /**
   * Gets list of questions for survey 1
   * @return {JSONArray} Array of questions
   */
  questions() {
    return getSurvey1QuestionsJson();
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
        question: question.question_en,
        answer: answer
      };
      results.push(result);
    }

    console.log(results);
    var user = Meteor.user();
    if(!user){
      console.log("Logged user not found.");
      Router.go('login');
      return;
    }
    SurveyResults.createSurvey1Result(user._id, results);
  }
});