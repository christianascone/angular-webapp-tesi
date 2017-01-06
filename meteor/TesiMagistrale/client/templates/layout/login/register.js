Template.register.helpers({
  /**
   * Function to execute after register template done loading
   * @return {void}
   */
  afterLoad() {
    user = Meteor.user();
    if (user) {
      console.log("Logged user found.");
      Router.go('demo');
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
      password
    }, function(error) {
      if (error) {
        console.log(error);
        Blaze._globalHelpers.showToast("Register failed");
      } else {
        Router.go('demo');
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