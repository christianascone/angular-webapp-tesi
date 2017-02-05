Template.leaderboard.onRendered(function onRendered(){
	Logs.log("Open leaderboard");
});

// Helpers for leaderboard template
Template.leaderboard.helpers({
	/**
	 * List of players
	 * @return {[Player]} List with all players
	 */
	players() {
		console.log("player list");
		var list = Players.findSortByTotalScore();
		return list;
	},
	/**
	 * Increment the given num by 1
	 * @param  {Int} num number to increment
	 * @return {Int}     num + 1
	 */
	incremented(num) {
		return num + 1;
	},
	/**
	 * Check if the given index is in polePosition (first, second, third position)
	 * @param  {Int} index index to check
	 * @return {Boolean}       If the index is in pole position range
	 */
	polePosition(index) {
		return index < 3;
	},
	isCurrentPlayer(player) {
		if(!player){
			return false;
		}

		var user = Meteor.user();
		if(user._id == player.userId){
			return true;
		}else{
			return false;
		}
	},
	/**
	 * Returns if it is the fully gamified environment or not
	 * @return {Boolean} True, if the environment is full, or False if it's minimal
	 */
	isFullEnvironment() {
		var FULLY_GAMIFIED = true;
		var publicSettings = Meteor.settings.public;
		if(publicSettings.ENVIRONMENT.FULL == undefined){
			FULLY_GAMIFIED = true;
		}else{
			FULLY_GAMIFIED = publicSettings.ENVIRONMENT.FULL;
		}
		return FULLY_GAMIFIED;
	}
});