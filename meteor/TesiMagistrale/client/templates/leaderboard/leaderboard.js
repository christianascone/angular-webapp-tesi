// Helpers for leaderboard template
Template.leaderboard.helpers({
  players() {
    console.log("player list");
  	return PlayersList.find();
  }
});