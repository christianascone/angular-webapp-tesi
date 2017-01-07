// Called when the my_points template is rendered
Template.my_points.onRendered(function () {
	// Make inline svg for filling with color
	Blaze._globalHelpers.inlineSvg();
});

// Helpers functions for my points template
Template.my_points.helpers({
	/**
	 * Gets total score for player passed as param
	 * 
	 * @return {Int} Current points
	 */
	playerPoints(player) {
		var user = Meteor.user();
		if (!user) {
			return;
		}
		var userId = user._id;
		
		return player.totalScore();
	}
});