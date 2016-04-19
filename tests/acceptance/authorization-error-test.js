import Ember from 'ember';
import { module, test } from 'qunit';
import Pretender from 'pretender';
import { authenticateSession } from '../helpers/ember-simple-auth';
import { currentSession } from '../helpers/ember-simple-auth';
import startApp from '../helpers/start-app';

var App;
var server;
var adapterException;

module('Authentication', {
  setup: function() {
    App = startApp();

    // Ignore promise rejection to avoid "Adapter operation failed"
    // during tests.
    // Original exception will fail test on promise rejection.
    adapterException = Ember.Test.adapter.exception;
    Ember.Test.adapter.exception = () => null;

    server = new Pretender(function() {
      var response = {
        errors: [
          {
            detail: "Access denied",
            status: "401"
          }
        ]
      };
      this.get('/api/posts', function() {
        return [401, { 'Content-Type': 'application/json' }, JSON.stringify(response)];
      });
    });
  },
  teardown: function() {
    Ember.run(App, App.destroy);
    server.shutdown();
  },
});

test('user cannot see posts if not authorized', function(assert) {
  authenticateSession(App);

  andThen(function() {
    assert.equal(currentSession(App).get('isAuthenticated'), true);
  });
  visit('/');

  visit('/posts');

  andThen(function() {
    assert.equal(currentSession(App).get('isAuthenticated'), false);
    assert.equal(find('a:contains("Login")').length, 1, 'The page shows a logout link when the session is not authenticated');
    assert.equal(currentRouteName(), 'index');
  });
});
