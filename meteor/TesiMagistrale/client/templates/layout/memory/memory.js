// Helpers for memory template
Template.memory.helpers({
	/**
	 * Mock array for cards
	 * @return {Array} mock array
	 */
	getArray() {
		var array = [1,2,3,4,5,6,7,8,9,10];
		return array;
	}
});

// Events for memory template
Template.memory.events({
  'click .card-image'(event, t) {
  	// Get index from selected item
  	var index = $(event.target).data("value");
  	// Fade in and out for images
    $(".card-image-"+index).fadeToggle("fast");
  },
});