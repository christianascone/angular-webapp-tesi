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
  	return PlayersList.find();
  }
});

// Events for hello template
Template.hello.events({
	// click is the event type and button is the selector
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
    console.log(PlayersList.insert({
		"name": "Gino",
		"age": 15
	}));
    console.log(PlayersList);
    console.log(PlayersList.find().fetch());

  },
});