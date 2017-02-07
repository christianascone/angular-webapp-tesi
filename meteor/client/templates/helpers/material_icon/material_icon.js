// Template for menu material icon
Template.material_icon.helpers({
	/**
	 * Returns if it is the fully gamified environment or not
	 * @return {Boolean} True, if the environment is full, or False if it's minimal
	 */
	isFullEnvironment() {
		var FULLY_GAMIFIED = true;
		var publicSettings = Meteor.settings.public;
		if(!publicSettings.ENVIRONMENT || publicSettings.ENVIRONMENT.FULL == undefined){
			FULLY_GAMIFIED = true;
		}else{
			FULLY_GAMIFIED = publicSettings.ENVIRONMENT.FULL;
		}
		return FULLY_GAMIFIED;
	}
});