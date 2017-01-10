Template.hello.onCreated(function helloOnCreated() {

});

// Helpers for hello template
Template.hello.helpers({
  players() {
    console.log("player list");
    // TODO: Gets only user without userId and add current user
    var list = Players.find();
    return list;
  }
});

// Events for hello template
Template.hello.events({
  // click is the event type and button is the selector
  'click button' (event, instance) {
    var user = Meteor.user();
    if (!user) {
      console.log("No logged user found.");
      Router.go('login');
      return;
    }

    // Gets reference points. This value will be the total of a real playing user
    var points = $("#points_input").val();

    // Create new mock user
    var result1 = Players.createPlayer("max.rey@gmail.com", {address: "max.rey@gmail.com"});
    var result2 = Players.createPlayer("elisasoverini@gmail.com", {address: "elisasoverini@gmail.com"});
    var result3 = Players.createPlayer("selmi.stefano91@hotmail.it", {address: "selmi.stefano91@hotmail.it"});
    var result4 = Players.createPlayer("anna.marin@yahoo.it", {address: "anna.marin@yahoo.it"});
    var result5 = Players.createPlayer("scarletti@gmail.com", {address: "scarletti@gmail.com"});
    var result6 = Players.createPlayer("lorenzo.ligregni@studio.unibo.it", {address: "lorenzo.ligregni@studio.unibo.it"});
    var result7 = Players.createPlayer("giuseppe.orizzonte@studio.unibo.it", {address: "giuseppe.orizzonte@studio.unibo.it"});
    var result8 = Players.createPlayer("bernardi.n@hotmail.it", {address: "bernardi.n@hotmail.it"});

    // Create a new series and score for every player
    var playersArray = [result1, result2, result3, result4, result5, result6, result7, result8];
    for (var i = 0; i < playersArray.length; i++) {
      var playerId = playersArray[i];
      // Divisor is 0+1 in order to prevent a 0 division
      var divisor = i+1;
      
      // Points for player are the maximum real user points (gets from input)
      // * 1.2 (so, one player will be first) and divided by divisor
      var playerPoints = points * 1.2 / divisor;
      // Add score series and score for player
      console.log("Add mock data for user: " + playerId);
      var createdScoreSeriesId = ScoreSeries.createScoreSeries(playerId, "TEST_GAME");
      Scores.createScore(Math.floor(playerPoints), "MOCK_USER", createdScoreSeriesId);
      var scoreSeries = ScoreSeries.findOne(createdScoreSeriesId);
      scoreSeries.close();
    }
  },
});