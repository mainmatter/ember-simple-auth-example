import Ember from 'ember';
import { module, test } from 'qunit';
import { authenticateSession, invalidateSession } from '../helpers/ember-simple-auth';
import Pretender from 'pretender';
import startApp from '../helpers/start-app';

var App;
var server;

module('Authentication', {
  setup: function() {
    App = startApp();
    server = new Pretender(function() {
      this.post('/token', function() {
        return [200, { 'Content-Type': 'application/json' }, '{ "access_token": "access_token" }'];
      });
    });
  },
  teardown: function() {
    Ember.run(App, App.destroy);
    server.shutdown();
  },
});

test('users can log in', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(find('a:contains("Login")').length, 1, 'The page shows a login link when the session is not authenticated');
  });

  visit('/login');
  fillIn('#identification', 'letme');
  fillIn('#password', 'in');
  click('button[type="submit"]');

  andThen(function() {
    assert.equal(find('a:contains("Logout")').length, 1, 'The page shows a logout link when the session is authenticated');
  });
});

test('a protected route is accessible when the session is authenticated', function(assert) {
  authenticateSession(App);
  visit('/protected');

  andThen(function() {
    assert.equal(currentRouteName(), 'protected');
  });
});

test('a protected route is not accessible when the session is not authenticated', function(assert) {
  invalidateSession(App);
  visit('/protected');

  andThen(function() {
    assert.notEqual(currentRouteName(), 'protected');
  });
});

test('users can logout', function(assert) {
  authenticateSession(App);
  visit('/');
  click('#logout');
  andThen(function() {
    assert.equal(find('a:contains("Login")').length, 1, 'The page shows a login link when the users logout and session is unauthenticated');
  });
});
