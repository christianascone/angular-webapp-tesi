// Events for login template
Template.login.events({
	// submit action on form element
	'submit form': function(event) {
		event.preventDefault();
		var email = $('[name=email]').val();
		var password = $('[name=password]').val();
		// Login with given data
		Meteor.loginWithPassword(email, password, function(error) {
			if (error) {
				console.log(error);
			} else {
				Router.go('demo');
			}
		});
	}
});