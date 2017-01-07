Scores = new Mongo.Collection('scores');
console.log("Init scores");

Scores.createScore = function(score, description, playerId) {
	scoreData = {
		score: score,
		description: description,
		playerId: playerId
	};
	return Scores.insert(scoreData);
};