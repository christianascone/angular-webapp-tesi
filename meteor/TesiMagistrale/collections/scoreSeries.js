ScoreSeries = new Mongo.Collection('scoreSeries');
console.log("Init scoreSeries");

ScoreSeries.helpers({
	/**
	 * Find list of scores for this series
	 * 
	 * @return {[Scores]}
	 */
	scores() {
		return Scores.find({scoreSeriesId: this._id});
	}
});

/**
 * Create a new score series for a player who starts playing
 * @param  {Int} playerId Id of player
 * @param  {String} gameType Type of game
 * @return {Int} The created object id
 */
ScoreSeries.createScoreSeries = function(playerId, gameType) {
	var scoreData = {
		playerId: playerId,
		gameType: gameType
	};
	return ScoreSeries.insert(scoreData);
};