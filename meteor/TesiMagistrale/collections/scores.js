Scores = new Mongo.Collection('scores');
console.log("Init scores");

/**
 * Create a new score object with given parameters
 * 
 * @param  {Int} Score value
 * @param  {String} Description String
 * @param  {Int} Id of playing player
 * @return {Scores} Final created object
 */
Scores.createScore = function(score, description, playerId) {
	var scoreData = {
		score: score,
		description: description,
		playerId: playerId
	};
	return Scores.insert(scoreData);
};