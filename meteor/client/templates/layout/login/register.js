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
    var age = $('[name=age]').val();
    var gender = $('input[name=genders]:checked').val();
    // Save user with email and password
    Accounts.createUser({
      email,
      email,
      password,
      profile: {
        gender: gender,
        age: age
      }
    }, function(error) {
      // If error, show error toast
      if (error) {
        console.log(error);
        Blaze._globalHelpers.showToast("Register failed: " + error.reason);
      } else {
        // Retrieve currently logged user (just registered)
        var user = Meteor.user();
        var userId = user._id;
        // Search player with user id
        var loggedPlayer = undefined;
        if (Players.findOne()) {
          loggedPlayer = Players.findOne().byUserId(userId);
        }

        // Read email from logged user
        var email = null;
        if (user && user.emails) {
          email = user.emails[0];
        }

        // If no players with given userId are found, a new one is created
        if (!loggedPlayer) {
          var result = Players.createPlayer(email, userId);
          console.log(result);
        } else {
          console.warn("Existing player with userId: " + userId);
        }
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