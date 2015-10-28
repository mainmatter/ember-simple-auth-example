import Ember from 'ember';
import { module, test } from 'qunit';
import Pretender from 'pretender';
import startApp from '../helpers/start-app';

var App;
var server;

module('Authentication', {
  setup: function() {
    App = startApp();
    server = new Pretender(function() {
      this.post('/users/sign_in', function() {
        return [401, { 'Content-Type': 'application/json' }, '{ "error": "Invalid email or password" }'];
      });
    });
  },
  teardown: function() {
    Ember.run(App, App.destroy);
    server.shutdown();
  },
});

test('users cannot log in with invalid Devise credentials', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(find('a:contains("Login")').length, 1, 'The page shows a login link when the session is not authenticated');
  });

  visit('/login');
  fillIn('#devise-identification', 'test@test.com');
  fillIn('#devise-password', 'wrong password');
  click('.devise-authentication button[type="submit"]');

  andThen(function() {
    assert.equal(find('a:contains("Login")').length, 1, 'The page still shows login link when authentication failed');
    assert.equal(find('div.errors:contains("Invalid email or password")').length, 1, 'The page shows error message when authentication failed');
  });

  visit('/');

  visit('/login');

  andThen(function() {
    assert.notEqual(find('div.errors:contains("Invalid email or password")').length, 1, 'The error message is reset when we leave the login page');
  });
});
