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
        return [200, { 'Content-Type': 'application/json' }, '{ "token": "access_token", "email": "test@test.com" }'];
      });
    });
  },
  teardown: function() {
    Ember.run(App, App.destroy);
    server.shutdown();
  },
});

test('users can log in with valid Devise credentials', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(find('a:contains("Login")').length, 1, 'The page shows a login link when the session is not authenticated');
  });

  visit('/login');
  fillIn('#devise-identification', 'test@test.com');
  fillIn('#devise-password', 'password');
  click('.devise-authentication button[type="submit"]');

  andThen(function() {
    assert.equal(find('a:contains("Logout")').length, 1, 'The page shows a logout link when the session is authenticated');
  });
});
