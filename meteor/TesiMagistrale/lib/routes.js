// Default layout template for logged user
Router.configure({
	layoutTemplate: 'main'
});

// Layout template for login/register pages
Router.configure({
	layoutTemplate: 'home'
});

Router.route('/', {
	name: 'demo',
	template: 'demo',
	layoutTemplate: 'main'
});

Router.route('/register', {
	name: 'register',
	template: 'register',
	// None template for login page
	layoutTemplate: 'home'
});

Router.route('/login', {
	name: 'login',
	template: 'login',
	// None template for login page
	layoutTemplate: 'home'
});

Router.route('/setup', {
	name: 'setup',
	template: 'setup',
	layoutTemplate: 'main'
});

Router.route('/leaderboard', {
	name: 'leaderboard',
	template: 'leaderboard',
	layoutTemplate: 'main'
});

Router.route('/memory', {
	name: 'memory',
	template: 'memory',
	layoutTemplate: 'main'
});