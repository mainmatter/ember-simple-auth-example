import Ember from 'ember';
import { module, test } from 'qunit';
import { authenticateSession, invalidateSession } from '../helpers/ember-simple-auth';
import startApp from '../helpers/start-app';

var App;

module('Setup', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, App.destroy);
  },
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
