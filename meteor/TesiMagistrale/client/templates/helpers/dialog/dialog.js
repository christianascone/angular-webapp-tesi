Template.dialog.onRendered(function dialogOnRendered() {
  var dialog = document.querySelector('dialog');
  // If dialog does not contain a showModal function, the polyfill is registered
  if (!dialog.showModal) {
    console.warn("dialog-polyfill.js package not included.");
    dialogPolyfill.registerDialog(dialog);
  }
});

// Global template helper for Dialog
Template.registerHelper('showDialog', (id, message) => {
  var dialog = null;
  // Use id if provided
  if (id) {
    dialog = document.querySelector('#' + id);
  } else {
    dialog = document.querySelector('dialog');
  }

  // If message, use it in dialog body
  if (message) {
    // Use id if provided
    if (id) {
      $('#' + id + ' #dialog-message').text(message);
    } else {
      $('#dialog-message').text(message);
    }
  }

  try {
    dialog.showModal();
  } catch (error) {
    // Possible error in first render
  }
});

Template.registerHelper('closeDialog', (id) => {
  var dialog = null;
  // Use id if provided
  if (id) {
    dialog = document.querySelector('#' + id);
  } else {
    dialog = document.querySelector('dialog');
  }
  try {
    dialog.close();
  } catch (error) {
    // Possible error in first render
  }
});