// Events for dialog template
Template.demo.events({
  'click .ok-dialog' (event, instance) {
    console.log("ok dialog");
    Blaze._globalHelpers.closeDialog();
  },
  'click .close-dialog' (event, instance) {
    Blaze._globalHelpers.closeDialog();
  },
  // click is the event type and button is the selector
  'click #show-dialog' (event, instance) {
    Blaze._globalHelpers.showDialog();
  },
});