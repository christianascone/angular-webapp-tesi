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
    var email = $('[name=email]').val();
    var password = $('[name=password]').val();
    var age = $('[name=age]').val();
    var gender = $('input[name=genders]:checked').val();
    
  },
  /**
   * Click event for login button.
   * Goes to login page
   * 
   * @param  {Event} event Click event
   * @return {void}       
   */
  'click #login-button': function(event) {
    event.preventDefault();
    Router.go("login");
  }
});