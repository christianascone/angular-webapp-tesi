// Events for login template
Template.login.events({
  // submit action on form element
  'submit form': function(event) {
    event.preventDefault();
    var email = $('[name=email]').val();
    var password = $('[name=password]').val();
    // Login with given data
    Meteor.loginWithPassword(email, password);
    // TODO: Error handling
    Router.go('demo');
  }
});