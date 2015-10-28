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
        return [200, { 'Content-Type': 'application/json' }, '{ "access_token": "access_token" }'];
      });
    });
  },
  teardown: function() {
    Ember.run(App, App.destroy);
    server.shutdown();
  },
});

test('users can log in with oauth2 credentials', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(find('a:contains("Login")').length, 1, 'The page shows a login link when the session is not authenticated');
  });

  visit('/login');
  fillIn('#oauth2-identification', 'letme');
  fillIn('#oauth2-password', 'in');
  click('.oauth2-authentication button[type="submit"]');

  andThen(function() {
    assert.equal(find('a:contains("Logout")').length, 1, 'The page shows a logout link when the session is authenticated');
  });
});
