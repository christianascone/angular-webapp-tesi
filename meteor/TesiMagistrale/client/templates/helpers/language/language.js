// Events for language template
Template.language.events({
	/**
	 * Click events for language switching.
	 * Switch language between italian/english with i18n
	 * 
	 * @param  {Event} event Fired event
	 * @return {void}
	 */
	'click #it-button': function(event) {
		event.preventDefault();
		console.log("it language");
		TAPi18n.setLanguage("it");
	},
	'click #en-button': function(event) {
		event.preventDefault();
		console.log("en language");
		TAPi18n.setLanguage("en");
	}
});