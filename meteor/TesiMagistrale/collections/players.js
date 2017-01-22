Players = new Mongo.Collection('players');
console.log("Init players");

Players.helpers({
	/**
	 * Find one player by logged user Id
	 * @param  {int} userId Id of a login user
	 * @return {[Player]}        Found player list
	 */
	byUserId(userId) {
		return Players.findOne({
			userId: userId
		});
	},
	/**
	 * Find a list of score series for this player
	 * @return {[ScoreSeries]}
	 */
	scoreSeries() {
		return ScoreSeries.find({playerId: this._id});
	},
	/**
	 * Find a list of closed score series for this player
	 * @return {[ScoreSeries]}
	 */
	closedScoreSeries() {
		return ScoreSeries.find({playerId: this._id, state: "CLOSED"});
	},
	/**
	 * Find list of scores for this player
	 * 
	 * @return {[Scores]}
	 */
	scores() {
		var scores = [];
		// Map function to sum scores
		// WARNING: USE ALL SCORE SERIES (NOT ONLY THE CLOSED ONES)
		var scoreSeries = this.scoreSeries().map(function(doc){
			var innerScores = doc.scores().fetch();
			if(innerScores.length > 0){
				scores = scores.concat(innerScores);
			}
		});
		return scores;
	},
	/**
	 * Find and sum the scores of this player.
	 * Finally, it returns the total score
	 * 
	 * @return {Int} Sum of player scores
	 */
	totalScore() {
		var total = 0;
		// Map function to sum scores
		var scores = this.scores().map(function(doc){
			if(!isNaN(doc.score)){
				total += doc.score;
			}
		});
		return total;
	},
	/**
	 * Gets the user in relation with this player using
	 * the userId saved as field
	 * 
	 * @return {User} User in relation with this player
	 */
	user() {
		return Meteor.users.findOne(this.userId);
	}
});

Players.findSortByTotalScore = function(order) {
	var list = Players.find({},{sort:{totalScore : -1}}).fetch();
	// Sort players by score
	list.sort(function(a,b) {
		if (a.totalScore() < b.totalScore()) {
			return 1;
		}
		if (a.totalScore() > b.totalScore()) {
			return -1;
		}
		return 0;
	});

	var result = [];
	// Players are added to list only if they are mocked user (no userId found)
	// or if it's the currently logged user's player
	for(var i = 0; i < list.length; i++) {
		var element = list[i];
		if(!element.userId || element.userId == Meteor.user()._id){
			result.push(element);
		}
	}
	
	return result;
};

/**
 * Create and insert a new Players object with given parameters.
 * Direct insert() should be avoided, because this function
 * request all the necessary parameters for a correct Players object.
 * @param  {String} email  email of player
 * @param  {String} name   name of player
 * @param  {String} userId (Optional) Id of logged user in relation with this player
 * @return {String}        id of newly created user
 */
Players.createPlayer = function(email, name, userId) {
	var playerData = {
		email: email,
		name: name,
		userId: userId
	};
	return Players.insert(playerData);
};