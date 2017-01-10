var POINTS_READY = "POINTS_READY";

Template.my_points.created = function () {
    // Setup ready var for this template INSTANCE
    this.ready = new ReactiveVar(false);
  };

// Called when the my_points template is rendered
Template.my_points.onRendered(function() {
	// Make inline svg for filling with color
	Blaze._globalHelpers.inlineSvg();
	// After rendering, the ready var is true
	Template.instance().ready.set(true);
});

// Helpers functions for my points template
Template.my_points.helpers({
	/**
	 * Gets total score for player passed as param
	 * 
	 * @return {Int} Current points
	 */
	playerPoints(player, animate) {
		// If instance is not ready, returns
		var readyVar = Template.instance().ready;
		if(!readyVar || !readyVar.get()){
			return;
		}
		// Logged user control
		var user = Meteor.user();
		if (!user) {
			return;
		}

		var totalScore = player.totalScore();

		// If animate is false or not defined, simply setup points text value
		// with jquery
		if (!animate) {
			$('.my_points_counter_' + player._id).each(function() {
				$(this).text(totalScore);
			});
			return;
		}

		// Otherwise, use a great animation
		$('.my_points_counter_' + player._id).each(function() {
			$(this).prop('Counter', 0).animate({
				Counter: totalScore
			}, {
				duration: 4000,
				easing: 'swing',
				step: function(now) {
					$(this).text(Math.ceil(now));
				}
			});
		});
	}
});