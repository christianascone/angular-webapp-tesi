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
    list = Players.find();
    return list;
  }
});

// Events for hello template
Template.hello.events({
	// click is the event type and button is the selector
  'click button'(event, instance) {
    user = Meteor.user();
    if (!user) {
      console.log("No logged user found.");
      Router.go('login');
      return;
    }
    userId = user._id;
    // Search player with user id
    loggedPlayer = undefined;
    if(Players.findOne()){
      loggedPlayer = Players.findOne().byUserId(userId);
    }

    Scores.createScore(5, "test", loggedPlayer._id);
  },
});