// Called when template is created.
// Setup reactive var for dialog polyfill and ready render check
Template.dialog.onCreated(function dialogOnCreated() {
  // Set the new reactive var for moves counter
  this.using_dialog_polyfill = new ReactiveVar(false);
  this.ready = new ReactiveVar(false);
});

Template.dialog.onRendered(function dialogOnRendered() {
  // Update template and set ready state
  Template.instance().ready.set(true);
});

Template.dialog.helpers({
  /**
   * Setup a dialog template, with dialog polyfill check. 
   * Add, if needed, dialog functions
   * 
   * @param  {String} id Html if of dialog element to setup
   * @return {void}    
   */
  setup(id) {
    // Get ready value only for helpers update
    Template.instance().ready.get();
    // Select dialog with given id
    var dialog = document.querySelector('#' + id);
    // Id showModal() function is undefined, use dialogPolyfill
    // for registering the object
    if (!dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
      // Update reactive var. This dialog template IS USING dialog polyfill
      Template.instance().using_dialog_polyfill.set(true);
    }
  },
  /**
   * Check whether it's using dialog polyfill
   * @return {Boolean} Is this template using dialog polyfill?
   */
  isUsingDialogPolyfill() {
    return Template.instance().using_dialog_polyfill.get();
  }
});

// Global template helper for Dialog
Template.registerHelper('showDialog', (id, message, title) => {
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

  // If title, use it in dialog body
  if (title) {
    // Use id if provided
    if (id) {
      $('#' + id + ' #dialog-title').text(title);
    } else {
      $('#dialog-title').text(title);
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