Template.debug.onCreated(function debugOnCreated() {

});

// Helpers for debug template
Template.debug.helpers({
  players() {
    console.log("player list");
    // TODO: Gets only user without userId and add current user
    var list = Players.find();
    return list;
  }
});

// Events for debug template
Template.debug.events({
  // Click event to send a test email
  'click #send-mail-button' (event, instance) {
    var json = {testJson: "test", array: [1,2,3]};
    var attachment = {
      fileName: "Test.json",
      contents: JSON.stringify(json, null, 2)
    };
    var attachmentsArray = [attachment];
    Blaze._globalHelpers.sendMeEmail("Test subject", "Body No attachments");
    Blaze._globalHelpers.sendMeEmail("Test subject", "Body With attachments", attachmentsArray);
  },
  // Click event for "create mock user" button
  'click #create-button' (event, instance) {
    var user = Meteor.user();
    if (!user) {
      console.log("No logged user found.");
      Router.go('login');
      return;
    }

    Meteor.call("setupMockUsers");
  },
  // Click event for "clear mock users" button
  'click #clear-button' (event, instance) {
    Players.clearMockUsers();
  }
});