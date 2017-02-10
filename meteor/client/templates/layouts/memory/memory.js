var PREVIOUS_CARD_INDEX = "previousCardIndex";
var CARD_EVENT_ALLOWED = "cardEventAllowed";
var GAME_TYPE = "gameType";

var CONGRATULATION_DIALOG_ID = "congratulation_dialog";
var GAME_TYPE_DIALOG_ID = "game_type_dialog";
var FINAL_DIALOG_ID = "final_dialog";

var INCREMENTAL = "INCREMENTAL";
var DECREMENTAL = "DECREMENTAL";
var SCORE_SERIES_ID = "SCORE_SERIES_ID";

var INCREMENTAL_REWARD_KEY = "INCREMENTAL_REWARD_KEY";
var DECREMENTAL_REWARD_KEY = "DECREMENTAL_REWARD_KEY";

var PLAYING = "PLAYING";
var END_GAME = "END_GAME";

var FULLY_GAMIFIED = true; // Default value

var MAX_GAME = 5; // Default value
var CARDS_NUMBER = 16; // Default value
var MAX_REWARD = 750; // Default value
var MAX_GAUGE_COUNTER = 50; // Default value

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
function fillPossibleIndexesWithLength(length) {
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
 * Creates the rewards array
 * 
 * @param  {Session} session Meteor Session
 * @return {void}         
 */
function createRewards(session) {
	var INCREMENTAL_REWARD = [];
	var DECREMENTAL_REWARD = [];

	// Sum total segments for incremental rewards
	var incremental_total_segments = 0;
	for (var i = 0; i < MAX_GAME; i++) {
		incremental_total_segments += (i + 1);
	}

	for (var i = 0; i < MAX_GAME; i++) {
		// Gets the i-th segment of reward (0,1,2,3,...)
		var incremental = MAX_REWARD / incremental_total_segments * (i + 1);
		// Gets the (MAX_GAME-i)-th segment of reward (MAX_GAME, MAX_GAME-1,...,1,0)
		var decremental = MAX_REWARD / incremental_total_segments * (MAX_GAME - i);

		INCREMENTAL_REWARD.push(incremental);
		DECREMENTAL_REWARD.push(decremental);
	}

	session.set(INCREMENTAL_REWARD_KEY, INCREMENTAL_REWARD);
	session.set(DECREMENTAL_REWARD_KEY, DECREMENTAL_REWARD);
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

	var length = CARDS_NUMBER;
	if (length % 2 != 0) {
		console.error("Not even value for memory game.");
		return;
	}
	var possible_indexes = fillPossibleIndexesWithLength(length);

	var cards = createMemoryCardsArrayWithIndexes(possible_indexes);
	// Save cards array in Session, so changing it, the getArray()
	// function in helpers will be recalled
	session.set('cardsArray', cards);
	session.set(PLAYING, true);
}


// When template is created, the array is initialized
Template.memory.onCreated(function memoryOnCreated() {
	var publicSettings = Meteor.settings.public;

	// Read number of task in series
	if (publicSettings.MAX_GAME) {
		MAX_GAME = publicSettings.MAX_GAME;
	}
	// Read number of cards for game
	if (publicSettings.CARDS_NUMBER) {
		CARDS_NUMBER = publicSettings.CARDS_NUMBER;
	}
	// Read maximum reward for game
	if (publicSettings.MAX_REWARD) {
		MAX_REWARD = publicSettings.MAX_REWARD;
	}
	// Read maximum gauge counter for game
	if (publicSettings.MAX_GAUGE_COUNTER) {
		MAX_GAUGE_COUNTER = publicSettings.MAX_GAUGE_COUNTER;
	}
	if (!publicSettings.ENVIRONMENT || publicSettings.ENVIRONMENT.FULL == undefined) {
		FULLY_GAMIFIED = true;
	} else {
		FULLY_GAMIFIED = publicSettings.ENVIRONMENT.FULL;
	}
	// Set the new reactive var for moves counter
	this.moves_counter = new ReactiveVar(0);
	createRewards(Session);
});

Template.memory.onRendered(function memoryOnRendered() {
	// Build gauge after rendering, with default values
	Blaze._globalHelpers.buildGauge("container-gauge", TAPi18n.__("memory.moves"), MAX_GAUGE_COUNTER);

	Logs.log("Open memory game");
});

// Helpers for memory template
Template.memory.helpers({
	/**
	 * Returns if it is the fully gamified environment or not
	 * @return {Boolean} True, if the environment is full, or False if it's minimal
	 */
	isFullEnvironment() {
		return FULLY_GAMIFIED;
	},
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
		// If cards are not initialized, won is true
		var cards = Session.get('cardsArray');
		if (!cards) {
			return true;
		}
		// If not playing, won is true
		if (!Session.get(PLAYING)) {
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
			// Gets the scoreSeries object and scores list
			var scoreSeriesId = Session.get(SCORE_SERIES_ID);
			var scoreSeries = ScoreSeries.findOne(scoreSeriesId);
			// scoreSeries is undefined when this function is recalled due to Session
			// values update
			if (!scoreSeries) {
				Session.set(PLAYING, false);
				return true;
			}
			var scores = scoreSeries.scores().fetch();
			var scoreValue = 0;
			if (Session.get(GAME_TYPE) == INCREMENTAL) {
				scoreValue = Session.get(INCREMENTAL_REWARD_KEY)[scores.length];
			} else if (Session.get(GAME_TYPE) == DECREMENTAL) {
				scoreValue = Session.get(DECREMENTAL_REWARD_KEY)[scores.length];
			}

			// So sorry, but I'm late. This fragment of code is dirty
			var congratulation_dialog_width = "300px";
			var dialog_title_font_size = "2.5rem";
			var dialog_title_line_height = "32px";
			var dialog_message_font_size = "14px";

			var scoreIndex = scores.length + 1;

			if (Session.get(GAME_TYPE) == INCREMENTAL) {
				if (100 / (MAX_GAME / scoreIndex) <= 20) {
					//piccolo
				} else if (100 / (MAX_GAME / scoreIndex) <= 40) {
					congratulation_dialog_width = "325px";
					dialog_title_font_size = "3rem";
					dialog_title_line_height = "36px";
					dialog_message_font_size = "17px";

				} else if (100 / (MAX_GAME / scoreIndex) <= 60) {
					congratulation_dialog_width = "350px";
					dialog_title_font_size = "3.5rem";
					dialog_title_line_height = "50px";
					dialog_message_font_size = "23px";

				} else if (100 / (MAX_GAME / scoreIndex) <= 80) {
					congratulation_dialog_width = "400px";
					dialog_title_font_size = "4rem";
					dialog_title_line_height = "55px";
					dialog_message_font_size = "25px";
				} else if (100 / (MAX_GAME / scoreIndex) <= 100) {
					congratulation_dialog_width = "500px";
					dialog_title_font_size = "5rem";
					dialog_title_line_height = "60px";
					dialog_message_font_size = "30px";
				}
			} else {
				if (100 / (MAX_GAME / scoreIndex) <= 20) {
					//grande
					congratulation_dialog_width = "500px";
					dialog_title_font_size = "5rem";
					dialog_title_line_height = "60px";
					dialog_message_font_size = "30px";
				} else if (100 / (MAX_GAME / scoreIndex) <= 40) {
					congratulation_dialog_width = "400px";
					dialog_title_font_size = "4rem";
					dialog_title_line_height = "55px";
					dialog_message_font_size = "25px";

				} else if (100 / (MAX_GAME / scoreIndex) <= 60) {
					congratulation_dialog_width = "350px";
					dialog_title_font_size = "3.5rem";
					dialog_title_line_height = "50px";
					dialog_message_font_size = "23px";

				} else if (100 / (MAX_GAME / scoreIndex) <= 80) {
					congratulation_dialog_width = "325px";
					dialog_title_font_size = "3rem";
					dialog_title_line_height = "36px";
					dialog_message_font_size = "17px";

				} else if (100 / (MAX_GAME / scoreIndex) <= 100) {

				}
			}


			$( "#"+CONGRATULATION_DIALOG_ID ).css( "width", congratulation_dialog_width );
			$( "#"+CONGRATULATION_DIALOG_ID+" #dialog-title" ).css( "font-size", dialog_title_font_size );
			$( "#"+CONGRATULATION_DIALOG_ID+" #dialog-title" ).css( "line-height", dialog_title_line_height );
			$( "#"+CONGRATULATION_DIALOG_ID+" #dialog-message" ).css( "font-size", dialog_message_font_size );

			Blaze._globalHelpers.showDialog(CONGRATULATION_DIALOG_ID, TAPi18n.__("memory.congratulation_dialog.message", {
				moves: moves_counter
			}), TAPi18n.__("memory.congratulation_dialog.title", {
				points: scoreValue
			}));

			var newScoreId = Scores.createScore(scoreValue, "", scoreSeriesId);

			// Play coin sound only if the environment is fully gamified
			if(FULLY_GAMIFIED){
				// Play sound
				Blaze._globalHelpers.playCoinSound();
			}
			Logs.log("Won memory game: " + Session.get(GAME_TYPE) + " - points: " + scoreValue + " - moves: " + moves_counter);

			scores = scoreSeries.scores().fetch();
			Session.set(PLAYING, false);
			// If scores length is greater than max game, the score series is closed
			if (scores.length >= MAX_GAME) {
				scoreSeries.close();
				Session.set(SCORE_SERIES_ID, undefined);
				Session.set(GAME_TYPE, undefined);
				Session.set(END_GAME, true);
				Logs.log("Closed task series");
			}
			return true;
		} else {
			return false;
		}
	},
	/**
	 * Update gauge with moves counter as value
	 * 
	 * @return {void} 
	 */
	updateGauge() {
		var moves_counter = Template.instance().moves_counter.get();
		Blaze._globalHelpers.updateGaugeValue("container-gauge", moves_counter);
	},
	/*
	 ** Dialog translation helper functions
	 */
	memoryGameTypeDialogTitle() {
		return TAPi18n.__("memory.game_type_dialog.title");
	},
	memoryGameTypeDialogIncremental() {
		return TAPi18n.__("memory.game_type_dialog.incremental");
	},
	memoryGameTypeDialogDecremental() {
		return TAPi18n.__("memory.game_type_dialog.decremental");
	},
	memoryCongratulationDialogClose() {
		return TAPi18n.__("memory.congratulation_dialog.close");
	},
	memoryFinalDialogTitle() {
		return TAPi18n.__("memory.final_dialog.title");
	},
	memoryFinalDialogMessage() {
		return TAPi18n.__("memory.final_dialog.message");
	},
	memoryFinalDialogClose() {
		return TAPi18n.__("memory.final_dialog.close");
	}
});

/**
 * Close the game type selection dialog and gets the player 
 * object by currently logged user
 * 
 * @return {Players} Player object in relation with logged user
 */
function closeDialogAndGetPlayer() {
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

	return loggedPlayer;
}

/**
 * Create an incremental game series and setup a new game
 * 
 * @param  {Player} loggedPlayer Player of logged user
 * @return {void}              
 */
function createIncrementalSeriesAndStartGame(loggedPlayer, instance) {
	Session.set(GAME_TYPE, INCREMENTAL);
	var createdScoreSeriesId = ScoreSeries.createScoreSeriesIncremental(loggedPlayer._id);
	Session.set(SCORE_SERIES_ID, createdScoreSeriesId);
	console.log("Created ScoreSeries Incremental with id: " + createdScoreSeriesId);
	setupNewMemoryGame(instance, Session);
}

/**
 * Create an decremental game series and setup a new game
 * 
 * @param  {Player} loggedPlayer Player of logged user
 * @return {void}              
 */
function createDecrementalSeriesAndStartGame(loggedPlayer, instance) {
	Session.set(GAME_TYPE, DECREMENTAL);
	var createdScoreSeriesId = ScoreSeries.createScoreSeriesDecremental(loggedPlayer._id);
	Session.set(SCORE_SERIES_ID, createdScoreSeriesId);
	console.log("Created ScoreSeries Decremental with id: " + createdScoreSeriesId);
	setupNewMemoryGame(instance, Session);
}

// Events for memory template
Template.memory.events({
	/**
	 * Ok button of game type dialog clicked
	 */
	'click #game_type_ok_button' (event, instance) {
		console.log("Game type ok button -> " + INCREMENTAL);
		var loggedPlayer = closeDialogAndGetPlayer();
		if (!loggedPlayer) {
			return;
		}

		createIncrementalSeriesAndStartGame(loggedPlayer, instance);
	},
	/**
	 * Close button of game type dialog clicked
	 */
	'click #game_type_close_button' (event, instance) {
		console.log("Game type close button -> " + DECREMENTAL);
		var loggedPlayer = closeDialogAndGetPlayer();
		if (!loggedPlayer) {
			return;
		}

		createDecrementalSeriesAndStartGame(loggedPlayer, instance);
	},
	/**
	 * Close button of congratulation dialog clicked
	 */
	'click #congratulation_close_button' (event, instance) {
		Blaze._globalHelpers.closeDialog(CONGRATULATION_DIALOG_ID);
		if (Session.get(END_GAME)) {
			Session.set(END_GAME, false);
			Blaze._globalHelpers.showDialog(FINAL_DIALOG_ID);
		}
	},
	/**
	 * Close button of final task dialog clicked
	 */
	'click #final_close_button' (event, instance) {
		Blaze._globalHelpers.closeDialog(FINAL_DIALOG_ID);
		var doneSurvey = userDoneSurvey(SURVEY_FRAMING_EFFECT_KEY);
		if (doneSurvey) {
			Router.go('welcome');
		} else {
			Router.go('survey', {_bias: SURVEY_FRAMING_EFFECT_KEY});
		}
	},
	/**
	 * Play button click event.
	 * Restart the game
	 */
	'click #new-game-button' (event, instance) {
		var user = Meteor.user();
		var userId = user._id;
		var loggedPlayer = undefined;
		if (Players.findOne()) {
			loggedPlayer = Players.findOne().byUserId(userId);
		}

		// Check if is in debug
		Meteor.call("isDebug", function(err, response) {
			// Find all closed series for logged player
			var closedSeries = loggedPlayer.closedScoreSeries().fetch();
			// If player has closed at least one score series and it's not in debug,
			// show final dialog and prevent from playing
			if (closedSeries.length > 0 && !response) {
				Logs.log("Try to start again memory game. Not permitted, due to already closed series.");
				Blaze._globalHelpers.showDialog(FINAL_DIALOG_ID);
				return;
			}
			// Otherwise, in case of production environment or no closed series found
			// for this player, continue with regular game
			
			var game_type = Session.get(GAME_TYPE);
			if (response) {
				if (!game_type) {
					Blaze._globalHelpers.showDialog(GAME_TYPE_DIALOG_ID, TAPi18n.__("memory.game_type_dialog.message"));
					return;
				}
				setupNewMemoryGame(instance, Session);
			} else {
				if (game_type) {
					Logs.log("Start another memory game");
					setupNewMemoryGame(instance, Session);
					return;
				}
				var closedIncrementalCount = ScoreSeries.closedIncremental().fetch().length;
				var closedDecrementalCount = ScoreSeries.closedDecremental().fetch().length;
				// Start a new game with type which balance the difference
				if(closedIncrementalCount > closedDecrementalCount){
					Logs.log("Start memory game: Decremental");
					
					createDecrementalSeriesAndStartGame(loggedPlayer, instance);
				}else{
					Logs.log("Start memory game: Incremental");
					
					createIncrementalSeriesAndStartGame(loggedPlayer, instance);
				}
			}
		});
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
			Logs.log("Clicked already flipped card.");
			return;
		}

		console.log("Flipped: " + index);
		Logs.log("Flipped: " + index);
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

				// Increment move counter
				instance.moves_counter.set(instance.moves_counter.get() + 1);

				// Gets pair of cards
				var cards = Session.get('cardsArray');
				var previousCard = cards[previous_selected_index];
				var currentCard = cards[index];

				var foundPair = previousCard.image_index == currentCard.image_index;
				if (foundPair) {
					console.log("Found Pair");
					Logs.log("Found Pair");
					// Remove found cards
					cards[previous_selected_index].removed = true;
					cards[index].removed = true;
					Session.set('cardsArray', cards);
					Session.set(PREVIOUS_CARD_INDEX, undefined);
				} else {
					console.log("Found Pair");
					Logs.log("Not found Pair");
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