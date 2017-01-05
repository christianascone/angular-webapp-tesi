Template.registerHelper('showToast', (message) => {
	snackbarContainer = document.querySelector('#toast-container');
	data = {
		message: message
	};
	snackbarContainer.MaterialSnackbar.showSnackbar(data);
});