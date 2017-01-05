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
      } else {
        Router.go('demo');
      }
    });
  }
});