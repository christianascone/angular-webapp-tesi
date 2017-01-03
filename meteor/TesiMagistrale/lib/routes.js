Router.configure({
    layoutTemplate: 'main'
});

Router.route('/', function () {
  this.render('demo');
});

Router.route('/hello', function () {
  this.render('hello');
});

Router.route('/leaderboard', function () {
  this.render('leaderboard');
});