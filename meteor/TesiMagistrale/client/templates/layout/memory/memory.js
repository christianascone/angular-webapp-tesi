/**
 * Returns a random int value between min and max
 * values (included)
 * http://stackoverflow.com/a/7228322
 * 
 * @param  {Int} min Minimum number
 * @param  {Int} max Maximum number
 * @return {Int}     A random number between given values
 */
function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

/**
 * Fill and returns an array with every possible index for memory game.
 * Using the length value passed as param, every value between 0 and length
 * is appended twice to array
 * @param  {Int} length Max value to use
 * @return {[Int]}        Filled array
 */
function fillPossibleIndexesWithLenght(length) {
	// Empty array which will contains the possible
	// image indexes
	var possible_indexes = [];
	// Memory game needs every value appears twice.
	// The half_length permits to use only length/2 values
	var half_length = length / 2;
	// Iterate every card
	for (var i = 0; i < length; i++) {
		var j = i;
		// If the index is greater than half_length, it
		// must restart from 0
		if (j >= half_length) {
			j -= half_length;
		}
		possible_indexes[i] = j;
	}

	return possible_indexes;
}

/**
 * Create a new memory cards array using the possible indexes.
 * Every card is filled with a random element from possible_indexes array
 * 
 * @param  {[Int]} possible_indexes Array containing the possible indexes for Cards
 * @return {[]}                  Array with created card for memory game
 */
function createMemoryCardsArrayWithIndexes(possible_indexes){
	var cards = [];
	// Save the initial possible_indexes length
	var length = possible_indexes.length;
	for (var i = 0; i < length; i++) {
		// Gets a random index from possible_indexes array
		var randomIdx = randomIntFromInterval(0, possible_indexes.length-1);
		// New card
		cards[i] = {
			image_index: possible_indexes[randomIdx],
			flipped: false,
			removed: false
		};
		// Remove used index from possible_indexes
		possible_indexes.splice(randomIdx, 1);
	}

	return cards;
}

// When template is created, the array is initialized
Template.memory.onCreated(function memoryOnCreated() {
	var length = 16;
	if(length % 2 != 0){
		console.error("Not even value for memory game.");
		return;
	}
	var possible_indexes = fillPossibleIndexesWithLenght(length);

	cards = createMemoryCardsArrayWithIndexes(possible_indexes);
});

// Helpers for memory template
Template.memory.helpers({
	/**
	 * Gets the cards array
	 * @return {Array} Cards array
	 */
	getArray() {
		return cards;
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