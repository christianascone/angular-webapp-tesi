Template.register.onCreated(function registerOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);

});

// Helpers for register template
Template.register.helpers({
  counter() {
    return Template.instance().counter.get();
  },
  players() {
    return PlayersList.find();
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
      email: email,
      password: password
    });
    Router.go('demo');
  }
});