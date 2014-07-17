/* global Pretender */

import Ember from 'ember';
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';

var App;
var server;

module('Authentication', {
  setup: function() {
    App = startApp();
    server = new Pretender(function() {
      this.post('/token', function(request) {
        return [200, { 'Content-Type': 'application/json' }, '{ "access_token": "access_token" }'];
      });
    });
  },
  teardown: function() {
    Ember.run(App, App.destroy);
    server.shutdown();
  },
});

test('users can log in', function() {
  expect(2);
  visit('/');

  andThen(function() {
    equal(find('a:contains("Login")').length, 1, 'The page shows a login link when the session is not authenticated');
  });

  visit('/login');
  fillIn('#identification', 'letme');
  fillIn('#password', 'in');
  click('button[type="submit"]');

  andThen(function() {
    equal(find('a:contains("Logout")').length, 1, 'The page shows a logout link when the session is authenticated');
  });
});
