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
      this.post('/token', function() {
        return [400, { 'Content-Type': 'application/json' }, '{ "error": "invalid_grant" }'];
      });
    });
  },
  teardown: function() {
    Ember.run(App, App.destroy);
    server.shutdown();
  },
});

test('users cannot log with invalid oauth2 credentials', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(find('a:contains("Login")').length, 1, 'The page shows a login link when the session is not authenticated');
  });

  visit('/login');
  fillIn('#oauth2-identification', 'dontletme');
  fillIn('#oauth2-password', 'in');
  click('.oauth2-authentication button[type="submit"]');

  andThen(function() {
    assert.equal(find('a:contains("Login")').length, 1, 'The page still shows login link when authentication failed');
    assert.equal(find('div.errors:contains("invalid_grant")').length, 1, 'The page shows error message when authentication failed');
  });
});
