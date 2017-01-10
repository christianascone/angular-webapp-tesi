// Global template helper for sounds
Template.registerHelper('playCoinSound', (message) => {
	var coinSound = new buzz.sound('/sounds/coin.mp3');
	coinSound.play();
});