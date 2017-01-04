import {
	Template
} from 'meteor/templating';
import {
	ReactiveVar
} from 'meteor/reactive-var';

import './main.html';

// Helpers for logout template
Template.main.helpers({
  loggedUserEmail() {
    var user = Meteor.user();
    return user.emails[0].address;
  }
});

Template.logout.events({
  'click .logout'(event, instance) {
    event.preventDefault();
    Meteor.logout();
    Router.go('login');
  }
});