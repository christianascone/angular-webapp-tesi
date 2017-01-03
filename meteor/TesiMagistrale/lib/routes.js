Router.configure({
	layoutTemplate: 'main'
});

Router.route('/', {
	name: 'demo',
	template: 'demo'
});

Router.route('/hello', {
	name: 'hello',
	template: 'hello'
});

Router.route('/leaderboard', {
	name: 'leaderboard',
	template: 'leaderboard'
});