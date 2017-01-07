// Helpers for memory template
Template.memory.helpers({
	/**
	 * Mock array for cards
	 * @return {Array} mock array
	 */
	getArray() {
		var array = [];
		var lenght = 10;
		for (var i = 0; i < lenght; i++) {
			array[i] = i;
		}
		return array;
	}
});

// Events for memory template
Template.memory.events({
  'click .card-image'(event, t) {
  	// Get index from selected item
  	var index = $(event.target).data("value");
  	// Fade in and out for images
    $(".card-image-"+index).fadeToggle("slow");
  },
});