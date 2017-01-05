// Helpers for leaderboard template
Template.leaderboard.helpers({
  players() {
    console.log("player list");
  	return Players.find();
  },
  incremented(num) {
  	return num+1;
  }
});