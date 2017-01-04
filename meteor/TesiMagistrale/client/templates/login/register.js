// Events for register template
Template.register.events({
  // submit action on form element
  'submit form': function(event) {
    event.preventDefault();
    var email = $('[name=email]').val();
    var password = $('[name=password]').val();
    // Save user with email and password
    Accounts.createUser({
      email: email,
      password: password
    });
    // TODO: Error handling
    Router.go('demo');
  }
});