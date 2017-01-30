var FINAL_USER_POSITION = 3;

Template.setup.onCreated(function setupOnCreated() {

});

// Helpers for setup template
Template.setup.helpers({
  players() {
    console.log("player list");
    // TODO: Gets only user without userId and add current user
    var list = Players.find();
    return list;
  }
});

// Events for setup template
Template.setup.events({
  // Click event to send a test email
  'click #send-mail-button' (event, instance) {
    var publicSettings = Meteor.settings.public;
    var recipientAddress = publicSettings.RECIPIENT_MAIL_ADDRESS;
    var senderAddress = publicSettings.SENDER_MAIL_ADDRESS;
    Meteor.call("sendEmail", recipientAddress, senderAddress, "Test", "Body");
  },
  // Click event for "create mock user" button
  'click #create-button' (event, instance) {
    var user = Meteor.user();
    if (!user) {
      console.log("No logged user found.");
      Router.go('login');
      return;
    }

    // Gets reference points. This value will be the total of a real playing user
    var points = $("#points_input").val();

    // Create new mock user
    var result1 = Players.createPlayer({address: "max.rinaldi@gmail.com"});
    var result2 = Players.createPlayer({address: "elisasoverini@gmail.com"});
    var result3 = Players.createPlayer({address: "selmi.stefano91@hotmail.it"});
    var result4 = Players.createPlayer({address: "anna.marin@yahoo.it"});
    var result5 = Players.createPlayer({address: "scarletti@gmail.com"});
    var result6 = Players.createPlayer({address: "lorenzo.ligregni@studio.unibo.it"});
    var result7 = Players.createPlayer({address: "giuseppe.orizzonte@studio.unibo.it"});
    var result8 = Players.createPlayer({address: "bernardi.n@hotmail.it"});
    var result9 = Players.createPlayer({address: "ilaria_serra@gmail.com"});

    // Create a new series and score for every player
    var playersArray = [result1, result2, result3, result4, result5, result6, result7, result8, result9];
    for (var i = 0; i < playersArray.length; i++) {
      var playerId = playersArray[i];
      // Divisor is 0+1 in order to prevent a 0 division
      var divisor = i+1;
      var userPosition = FINAL_USER_POSITION;
      var multiplier = userPosition - 1 + 0.2;
      
      // Points for player are the maximum real user points (gets from input)
      // * 1.2 (so, one player will be first) and divided by divisor
      var playerPoints = points * multiplier / divisor;
      // Add score series and score for player
      console.log("Add mock data for user: " + playerId);
      var createdScoreSeriesId = ScoreSeries.createScoreSeries(playerId, "TEST_GAME");
      Scores.createScore(Math.floor(playerPoints), "MOCK_USER", createdScoreSeriesId);
      var scoreSeries = ScoreSeries.findOne(createdScoreSeriesId);
      scoreSeries.close();
    }
  },
  // Click event for "clear mock users" button
  'click #clear-button' (event, instance) {
    Players.clearMockUsers();
  }
});