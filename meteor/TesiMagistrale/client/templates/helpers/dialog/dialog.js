Template.dialog.onRendered(function dialogOnRendered() {
  var dialog = document.querySelector('dialog');
  // If dialog does not contain a showModal function, the polyfill is registered
  if (!dialog.showModal) {
    console.warn("dialog-polyfill.js package not included.");
    dialogPolyfill.registerDialog(dialog);
  }
});

// Global template helper for Dialog
Template.registerHelper('showDialog', () => {
  var dialog = document.querySelector('dialog');
  dialog.showModal();
});

Template.registerHelper('closeDialog', () => {
  var dialog = document.querySelector('dialog');
  dialog.close();
});