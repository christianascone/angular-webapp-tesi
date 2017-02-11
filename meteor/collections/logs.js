Logs = new Mongo.Collection('logs');
console.log("Init logs");

/**
 * Log a new user action
 * @param  {String} description Description of log
 * @return {Logs}             The new log object
 */
Logs.log = function(description) {
	Logs.logUserAgent(description, navigator.userAgent);
};

/**
 * Log a new user action
 * @param  {String} description Description of log
 * @param  {String} userAgent UserAgent
 * @return {Logs}             The new log object
 */
Logs.logUserAgent = function(description, userAgent) {
	// Check if a logged user is available
	var user = Meteor.user();
	if(!user){
		return;
	}
	var logData = {
		userId: user._id,
		userAgent: userAgent,
		description: description,
		date: new Date()
	};
	Meteor.call("isLoggerEnabled", function(error, response){
		// Logs only if logger is enabled in settings
		if(response){
			Logs.insert(logData);
		}
	});
};