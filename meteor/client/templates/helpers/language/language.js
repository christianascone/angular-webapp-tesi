/**
 * Update the current language (and user default language)
 * @param  {String} lang   Language code to use (it, en, de)
 * @return {void}        
 */
function updateLanguage(lang) {
	console.log(lang + " language");
	TAPi18n.setLanguage(lang);
	Meteor.users.update(Meteor.userId(), {
		$set: {
			'profile.language': lang
		}
	})
}

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
		var lang = "it";
		updateLanguage(lang);
		Logs.log("Switch language to: italian");
	},
	'click #en-button': function(event) {
		event.preventDefault();
		var lang = "en";
		updateLanguage(lang);
		Logs.log("Switch language to: english");
	}
});