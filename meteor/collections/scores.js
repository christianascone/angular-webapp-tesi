Scores = new Mongo.Collection('scores');
console.log("Init scores");

/**
 * Create a new score object with given parameters
 * 
 * @param  {Int} Score value
 * @param  {String} Description String
 * @param  {Int} Id of father series
 * @return {Int} Final created object id
 */
Scores.createScore = function(score, description, scoreSeriesId) {
	var scoreData = {
		score: score,
		description: description,
		scoreSeriesId: scoreSeriesId
	};
	return Scores.insert(scoreData);
};