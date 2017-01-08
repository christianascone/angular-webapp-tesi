Template.demo.onRendered(function demoOnRendered() {
  var dialog = document.querySelector('dialog');
  // If dialog does not contain a showModal function, the polyfill is registered
  if (!dialog.showModal) {
    console.warn("dialog-polyfill.js package not included.");
    dialogPolyfill.registerDialog(dialog);
  }
});

// Events for demo template
Template.demo.events({
  'click .close' (event, instance) {
    var dialog = document.querySelector('dialog');
    dialog.close();
  },
  // click is the event type and button is the selector
  'click #show-dialog' (event, instance) {
    var dialog = document.querySelector('dialog');
    dialog.showModal();
  },
});