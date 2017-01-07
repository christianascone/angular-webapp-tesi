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
	 * Find list of scores for this player
	 * 
	 * @return {[Scores]}
	 */
	scores() {
		return Scores.find({playerId: this._id});
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
			total += doc.score;
		});
		return total;
	}
});

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
	playerData = {
		email: email,
		name: name,
		userId: userId
	};
	return Players.insert(playerData);
};