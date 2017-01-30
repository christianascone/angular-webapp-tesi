ScoreSeries = new Mongo.Collection('scoreSeries');
console.log("Init scoreSeries");

var LINEAR = "LINEAR";
var INCREMENTAL = "INCREMENTAL";
var DECREMENTAL = "DECREMENTAL";

ScoreSeries.helpers({
	/**
	 * Find list of scores for this series
	 * 
	 * @return {[Scores]}
	 */
	scores() {
		return Scores.find({scoreSeriesId: this._id});
	},
	/**
	 * Close this ScoreSeries
	 * @param  {Function} callback Callback optional function to call when update ends
	 * @return {void}            
	 */
	close(callback) {
		ScoreSeries.update(this._id, {$set: {state: "CLOSED"}}, function() {
			if(callback){
				callback();
			}
		});
	}
});

/**
 * Create a new ScoreSeries for a player with a LINEAR game type
 * @param  {Int} playerId Id of player
 * @return {Int}          The created object id
 */
ScoreSeries.createScoreSeriesLinear = function(playerId) {
	return ScoreSeries.createScoreSeries(playerId, LINEAR);
};

/**
 * Create a new ScoreSeries for a player with a INCREMENTAL game type
 * @param  {Int} playerId Id of player
 * @return {Int}          The created object id
 */
ScoreSeries.createScoreSeriesIncremental = function(playerId) {
	return ScoreSeries.createScoreSeries(playerId, INCREMENTAL);
};

/**
 * Create a new ScoreSeries for a player with a DECREMENTAL game type
 * @param  {Int} playerId Id of player
 * @return {Int}          The created object id
 */
ScoreSeries.createScoreSeriesDecremental = function(playerId) {
	return ScoreSeries.createScoreSeries(playerId, DECREMENTAL);
};

/**
 * Create a new score series for a player who starts playing
 * @param  {Int} playerId Id of player
 * @param  {String} gameType Type of game
 * @return {Int} The created object id
 */
ScoreSeries.createScoreSeries = function(playerId, gameType) {
	var scoreData = {
		playerId: playerId,
		gameType: gameType,
		state: "OPEN"
	};
	return ScoreSeries.insert(scoreData);
};