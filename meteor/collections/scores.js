Scores = new Mongo.Collection('scores');
console.log("Init scores");

// (Mock user identifier for setup)
var MOCK_USER = "MOCK_USER";

/**
 * Create a new score for a mock user, using given score value and ScoreSeries Id
 * @param  {Int} score         Score value
 * @param  {Int} scoreSeriesId Id of father series
 * @return {Int}               Final created object id
 */
Scores.createScoreMock = function(score, scoreSeriesId) {
	Scores.createScore(score, MOCK_USER, 0, scoreSeriesId);
};

/**
 * Create a new score object with given parameters
 * 
 * @param  {Int} 	Score value
 * @param  {String} Description String
 * @param  {Int} 	Moves counter
 * @param  {Int} 	Id of father series
 * @return {Int} 	Final created object id
 */
Scores.createScore = function(score, description, moves, scoreSeriesId) {
	var scoreData = {
		score: score,
		description: description,
		moves: moves,
		scoreSeriesId: scoreSeriesId
	};
	return Scores.insert(scoreData);
};