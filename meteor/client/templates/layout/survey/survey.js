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
    return survey["survey_questions_" + TAPi18n.getLanguage()].survey_1;
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