// Default layout template for logged user
Router.configure({
	layoutTemplate: 'main'
});

Router.route('/', {
	name: 'demo',
	template: 'demo'
});

Router.route('/register', {
	name: 'register',
	template: 'register',
	// None template for login page
	layoutTemplate: 'none'
});

Router.route('/login', {
	name: 'login',
	template: 'login',
	// None template for login page
	layoutTemplate: 'none'
});

Router.route('/hello', {
	name: 'hello',
	template: 'hello'
});

Router.route('/leaderboard', {
	name: 'leaderboard',
	template: 'leaderboard'
});

Router.route('/memory', {
	name: 'memory',
	template: 'memory'
});