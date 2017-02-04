ScoreSeries = new Mongo.Collection('scoreSeries');
console.log("Init scoreSeries");

var INCREMENTAL = "INCREMENTAL";
var DECREMENTAL = "DECREMENTAL";
var CLOSED_STATE = "CLOSED";
var OPEN_STATE = "OPEN";

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
		ScoreSeries.update(this._id, {$set: {state: CLOSED_STATE}}, function() {
			if(callback){
				callback();
			}
		});
	}
});

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
 * Select Closed ScoreSeries for incremental game type
 * @return {[ScoreSeries]} Closed ScoreSeries list for incremental game
 */
ScoreSeries.closedIncremental = function() {
	return ScoreSeries.byStateAndGameType(CLOSED_STATE, INCREMENTAL);
};

/**
 * Select Closed ScoreSeries for decremental game type
 * @return {[ScoreSeries]} Closed ScoreSeries list for decremental game
 */
ScoreSeries.closedDecremental = function() {
	return ScoreSeries.byStateAndGameType(CLOSED_STATE, DECREMENTAL);
};

/**
 * Select ScoreSeries by given state and gameType
 * @param  {String} state ScoreSeries state
 * @param  {String} gameType ScoreSeries gameType
 * @return {[ScoreSeries]}       All the scoreSeries with given state
 */
ScoreSeries.byStateAndGameType = function(state, gameType) {
	return ScoreSeries.find({state: state, gameType: gameType});
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
		state: OPEN_STATE
	};
	return ScoreSeries.insert(scoreData);
};