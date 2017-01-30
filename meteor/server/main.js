import {
	Meteor
} from 'meteor/meteor';

Meteor.startup(() => {
	// code to run on server at startup
	var email_env = process.env.MAIL_URL;
	if (!email_env) {
		console.warn("No MAIL_URL environment variable found.");
	}
});

// In your server code: define a method that the client can call
Meteor.methods({
	/**
	 * Send an email using MAIL_URL environment variable for SMTP
	 * connection.
	 * 
	 * @param  {String} to      Recipient address
	 * @param  {String} from    Sender address
	 * @param  {String} subject Email subject
	 * @param  {String} text    Mail body
	 * @return {void}
	 */
	sendEmail: function(to, from, subject, text) {
		check([to, from, subject, text], [String]);
		// Let other method calls from the same client start running,
		// without waiting for the email sending to complete.
		this.unblock();
		Email.send({
			to: to,
			from: from,
			subject: subject,
			text: text
		});
	}
});