var PREVIOUS_CARD_INDEX = "previousCardIndex";
var CARD_EVENT_ALLOWED = "cardEventAllowed";
var GAME_TYPE = "gameType";

var CONGRATULATION_DIALOG_ID = "congratulation_dialog";
var GAME_TYPE_DIALOG_ID = "game_type_dialog";

var LINEAR = "LINEAR";
var INCREMENTAL = "INCREMENTAL";
var SCORE_SERIES_ID = "SCORE_SERIES_ID";

var MAX_GAME = 5;

/**
 * Returns a random int value between min and max
 * values (included)
 * http://stackoverflow.com/a/7228322
 * 
 * @param  {Int} min Minimum number
 * @param  {Int} max Maximum number
 * @return {Int}     A random number between given values
 */
function randomIntFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
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
function createMemoryCardsArrayWithIndexes(possible_indexes) {
	var cards = [];
	// Save the initial possible_indexes length
	var length = possible_indexes.length;
	for (var i = 0; i < length; i++) {
		// Gets a random index from possible_indexes array
		var randomIdx = randomIntFromInterval(0, possible_indexes.length - 1);
		// New card
		cards[i] = {
			image_index: possible_indexes[randomIdx],
			removed: false
		};
		// Remove used index from possible_indexes
		possible_indexes.splice(randomIdx, 1);
	}

	return cards;
}

/**
 * Setup a new on board game.
 * - Reset moves counter to 0
 * - Set previous card as undefined
 * - Set card event allowed
 * - Create the random cards deck
 * - Save cards in session
 * 
 * @param  {Blaze.TemplateInstance} instance Instance of memory template
 * @param  {ReactiveDict} session  Meteor session
 * @return {void}
 */
function setupNewMemoryGame(instance, session) {
	// Setup move counter
	instance.moves_counter.set(0);

	// Initial setup for card events
	Session.set(PREVIOUS_CARD_INDEX, undefined);
	Session.set(CARD_EVENT_ALLOWED, true);

	var length = 16;
	if (length % 2 != 0) {
		console.error("Not even value for memory game.");
		return;
	}
	var possible_indexes = fillPossibleIndexesWithLenght(length);

	var cards = createMemoryCardsArrayWithIndexes(possible_indexes);
	// Save cards array in Session, so changing it, the getArray()
	// function in helpers will be recalled
	session.set('cardsArray', cards);
}

// When template is created, the array is initialized
Template.memory.onCreated(function memoryOnCreated() {
	// Set the new reactive var for moves counter
	this.moves_counter = new ReactiveVar(0);
});

// Helpers for memory template
Template.memory.helpers({
	/**
	 * Gets move counter
	 * 
	 * @return {Int} Move counter
	 */
	counter() {
		return Template.instance().moves_counter.get();
	},
	/**
	 * Gets the cards array saved in Session.
	 * It is called every time a new object with key 'cardsArray'
	 * is saved in Session
	 * @return {Array} Cards array
	 */
	getArray() {
		var cards = Session.get('cardsArray');
		return cards;
	},
	/**
	 * Check if this game is won or not
	 * @return {Boolean} True if the game is won, false otherwise
	 */
	won() {
		var cards = Session.get('cardsArray');
		if (!cards) {
			return true;
		}

		// Check remaining cards for Win check
		var remainingCards = 0;
		for (var i = 0; i < cards.length; i++) {
			if (cards[i].removed == false) {
				remainingCards++;
				break;
			}
		}
		if (remainingCards == 0) {
			var moves_counter = Template.instance().moves_counter.get();
			Blaze._globalHelpers.showDialog(CONGRATULATION_DIALOG_ID, "You won with " + moves_counter + " moves.");
			// Gets the scoreSeries object and scores list
			var scoreSeriesId = Session.get(SCORE_SERIES_ID);
			var newScoreId = Scores.createScore(moves_counter, "", scoreSeriesId);

			var scoreSeries = ScoreSeries.findOne(scoreSeriesId);
			// scoreSeries is undefined when this function is recalled due to Session
			// values update
			if(!scoreSeries){
				return true;
			}
			var scores = scoreSeries.scores().fetch();
			// If scores length is greater than max game, the score series is closed
			if(scores.length >= MAX_GAME){
				scoreSeries.close();
				Session.set(SCORE_SERIES_ID, undefined);
				Session.set(GAME_TYPE, undefined);
			}
			return true;
		} else {
			return false;
		}
	}
});

// Events for memory template
Template.memory.events({
	/**
	 * Ok button of game type dialog clicked
	 */
	'click #game_type_ok_button' (event, instance) {
		console.log("Game type ok button -> " + INCREMENTAL);
		Session.set(GAME_TYPE, INCREMENTAL);
		Blaze._globalHelpers.closeDialog(GAME_TYPE_DIALOG_ID);
		var user = Meteor.user();
		if (!user) {
			console.log("No logged user found.");
			Router.go('login');
			return;
		}
		var userId = user._id;
		var loggedPlayer = undefined;
		if (Players.findOne()) {
			loggedPlayer = Players.findOne().byUserId(userId);
		}

		var createdScoreSeriesId = ScoreSeries.createScoreSeriesIncremental(loggedPlayer._id);
		Session.set(SCORE_SERIES_ID, createdScoreSeriesId);
		console.log("Created ScoreSeries Incremental with id: " + createdScoreSeriesId);
		setupNewMemoryGame(instance, Session);
	},
	/**
	 * Close button of game type dialog clicked
	 */
	'click #game_type_close_button' (event, instance) {
		console.log("Game type close button -> " + LINEAR);
		Session.set(GAME_TYPE, LINEAR);
		Blaze._globalHelpers.closeDialog(GAME_TYPE_DIALOG_ID);
		var user = Meteor.user();
		if (!user) {
			console.log("No logged user found.");
			Router.go('login');
			return;
		}
		var userId = user._id;
		var loggedPlayer = undefined;
		if (Players.findOne()) {
			loggedPlayer = Players.findOne().byUserId(userId);
		}

		var createdScoreSeriesId = ScoreSeries.createScoreSeriesLinear(loggedPlayer._id);
		Session.set(SCORE_SERIES_ID, createdScoreSeriesId);
		console.log("Created ScoreSeries Linear with id: " + createdScoreSeriesId);
		setupNewMemoryGame(instance, Session);
	},
	/**
	 * Close button of congratulation dialog clicked
	 */
	'click #congratulation_close_button' (event, instance) {
		Blaze._globalHelpers.closeDialog(CONGRATULATION_DIALOG_ID);
	},
	/**
	 * Play button click event.
	 * Restart the game
	 */
	'click #new-game-button' (event, instance) {
		var game_type = Session.get(GAME_TYPE);
		if (!game_type) {
			Blaze._globalHelpers.showDialog(GAME_TYPE_DIALOG_ID, "Select game type");
			return;
		}
		setupNewMemoryGame(instance, Session);
	},
	// TODO: Refactor function
	'click .card-image' (event, instance) {
		// If another card event is running, this one is prevented
		if (!Session.get(CARD_EVENT_ALLOWED)) {
			return;
		}
		// Block other click events
		Session.set(CARD_EVENT_ALLOWED, false);
		var ANIMATION_SPEED_FAST = "fast";
		var ANIMATION_SPEED_SLOW = "slow";
		// Get index from selected item
		var index = $(event.target).data("value");
		// Gets the previously saved (if exists) index of selected card
		var previous_selected_index = Session.get(PREVIOUS_CARD_INDEX);

		// Unblock other events
		if (previous_selected_index == index) {
			Session.set(CARD_EVENT_ALLOWED, true);
			return;
		}

		// Increment move counter
		instance.moves_counter.set(instance.moves_counter.get() + 1);

		console.log("Flipped: " + index);
		console.log("Previously flipped: " + previous_selected_index);
		// Fade in/out placeholder
		$(".placeholder-card.card-image-" + index).fadeToggle(ANIMATION_SPEED_FAST, function() {
			// Fade in/out image
			$(".real-card.card-image-" + index).fadeToggle(ANIMATION_SPEED_SLOW, function() {
				// If no index is found, save the currently selected index
				if (previous_selected_index == undefined) {
					console.log("No previous index");
					Session.set(PREVIOUS_CARD_INDEX, index);
					Session.set(CARD_EVENT_ALLOWED, true);
					return;
				}

				// Gets pair of cards
				var cards = Session.get('cardsArray');
				var previousCard = cards[previous_selected_index];
				var currentCard = cards[index];

				var foundPair = previousCard.image_index == currentCard.image_index;
				if (foundPair) {
					console.log("Found Pair");
					// Remove found cards
					cards[previous_selected_index].removed = true;
					cards[index].removed = true;
					Session.set('cardsArray', cards);
					Session.set(PREVIOUS_CARD_INDEX, undefined);
				} else {
					// Clear saved index
					Session.set(PREVIOUS_CARD_INDEX, undefined);
				}
				// Reset cards
				$(".card-image-" + previous_selected_index).fadeToggle(ANIMATION_SPEED_FAST);
				$(".card-image-" + index).fadeToggle(ANIMATION_SPEED_FAST);
				Session.set(CARD_EVENT_ALLOWED, true);
			});

		});
	},
});