Template.dialog.onRendered(function dialogOnRendered() {
  var dialog = document.querySelector('dialog');
  // If dialog does not contain a showModal function, the polyfill is registered
  if (!dialog.showModal) {
    console.warn("dialog-polyfill.js package not included.");
    dialogPolyfill.registerDialog(dialog);
  }
});

// Events for dialog template
Template.dialog.events({
  'click .close-dialog' (event, instance) {
    Blaze._globalHelpers.closeDialog();
  },
});

// Global template helper for Dialog
Template.registerHelper('showDialog', (message) => {
  var dialog = document.querySelector('dialog');
  if (message) {
    $('#dialog-message').text(message);
  }
  dialog.showModal();
});

Template.registerHelper('closeDialog', () => {
  var dialog = document.querySelector('dialog');
  dialog.close();
});