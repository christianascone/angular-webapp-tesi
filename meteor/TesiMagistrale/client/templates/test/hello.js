Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
  
});

// Helpers for hello template
Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
  players() {
  	console.log("player list");
    var list = Players.find();
    return list;
  }
});

// Events for hello template
Template.hello.events({
	// click is the event type and button is the selector
  'click button'(event, instance) {
    $('#test-animation-id').fadeToggle('slow');
    var user = Meteor.user();
    if (!user) {
      console.log("No logged user found.");
      Router.go('login');
      return;
    }
    var userId = user._id;
    // Search player with user id
    var loggedPlayer = undefined;
    if(Players.findOne()){
      loggedPlayer = Players.findOne().byUserId(userId);
    }

    Scores.createScore(5, "test", loggedPlayer._id);
  },
});