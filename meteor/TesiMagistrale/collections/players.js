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