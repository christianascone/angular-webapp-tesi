// Global template helper for Toast
Template.registerHelper('showToast', (message) => {
	// Find toast element
	snackbarContainer = document.querySelector('#toast-container');
	// Set data with message
	data = {
		message: message
	};
	// Show toast message
	snackbarContainer.MaterialSnackbar.showSnackbar(data);
});