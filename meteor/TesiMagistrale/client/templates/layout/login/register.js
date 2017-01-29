Template.register.helpers({
  /**
   * Function to execute after register template done loading
   * @return {void}
   */
  afterLoad() {
    var user = Meteor.user();
    if (user) {
      console.log("Logged user found.");
      Router.go('welcome');
    }
  }
});

// Events for register template
Template.register.events({
  // submit action on form element
  'submit form': function(event) {
    event.preventDefault();
    var email = $('[name=email]').val();
    var password = $('[name=password]').val();
    // Save user with email and password
    Accounts.createUser({
      email,
      email,
      password
    }, function(error) {
      if (error) {
        console.log(error);
        Blaze._globalHelpers.showToast("Register failed: " + error.reason);
      } else {
        Router.go('welcome');
      }
    });
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