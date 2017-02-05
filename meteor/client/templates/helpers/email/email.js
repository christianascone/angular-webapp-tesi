// Global template helper for sending emails
Template.registerHelper(
	/**
	 * Send an email from and to, addresses configure in 
	 * settings.json, with private MAIL_URL
	 * 
	 * @param  {String} subject     Subject of the email
	 * @param  {String} body        Body text of email
	 * @param  {Array} attachments (Optional) List of attachments in format {fileName: "file.txt", contents: "contents text"}
	 * @return {void}             
	 */
	'sendMeEmail', (subject, body, attachments) => {
		var publicSettings = Meteor.settings.public;
		var recipientAddress = publicSettings.RECIPIENT_MAIL_ADDRESS;
		var senderAddress = publicSettings.SENDER_MAIL_ADDRESS;
		if(!recipientAddress || !senderAddress){
			console.warn("Recipient or Sender address not found.");
			return;
		}
		Meteor.call("sendEmail", recipientAddress, senderAddress, subject, body, attachments);
	}
);