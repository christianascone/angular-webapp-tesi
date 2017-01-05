PlayersList = new Mongo.Collection('players');
console.log("Init players");

PlayersList.helpers({
	/**
	 * Find one player by logged user Id
	 * @param  {int} userId Id of a login user
	 * @return {[Player]}        Found player list
	 */
  byUserId(userId) {
    return PlayersList.findOne({userId: userId});
  }
});
