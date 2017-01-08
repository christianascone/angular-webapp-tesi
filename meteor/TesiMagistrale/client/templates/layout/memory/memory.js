// When template is created, the array is initialized
Template.memory.onCreated(function memoryOnCreated() {
	// counter starts at 0
	array = [];
	var lenght = 16;
	var half_lenght = lenght / 2;
	for (var i = 0; i < lenght; i++) {
		var j = i;
		if (j >= half_lenght) {
			j -= half_lenght;
		}
		// Set image_index to use for src jpg
		// Flipped and removed are false by default
		array[i] = {
			image_index: j,
			flipped: false,
			removed: false
		};
	}
});

// Helpers for memory template
Template.memory.helpers({
	/**
	 * Gets the cards array
	 * @return {Array} Cards array
	 */
	getArray() {
		return array;
	}
});

// Events for memory template
Template.memory.events({
	'click .card-image' (event, t) {
		// Get index from selected item
		var index = $(event.target).data("value");
		// Fade in and out for images
		$(".card-image-" + index).fadeToggle("slow");
	},
});