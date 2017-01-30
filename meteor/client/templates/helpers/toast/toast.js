// Global template helper for Toast
Template.registerHelper('showToast', (message) => {
	// Find toast element
	var snackbarContainer = document.querySelector('#toast-container');
	// Set data with message
	var data = {
		message: message
	};
	// Show toast message
	snackbarContainer.MaterialSnackbar.showSnackbar(data);
});