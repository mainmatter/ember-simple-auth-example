import Ember from 'ember';
import { module, test } from 'qunit';
import Pretender from 'pretender';
import { authenticateSession } from '../helpers/ember-simple-auth';
import { currentSession } from '../helpers/ember-simple-auth';
import startApp from '../helpers/start-app';

var App;
var server;

module('Authentication', {
  setup: function() {
    App = startApp();
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

// FIXME: this test fails on any assertion, investigate why
test('user cannot see posts if not authorized', function(assert) {
  authenticateSession(App);

  andThen(function() {
    assert.equal(currentSession(App).get('isAuthenticated'), true);
  });
  visit('/');

  click('a:contains("Posts")');

  andThen(function() {
    assert.equal(currentSession(App).get('isAuthenticated'), false);
  });
});
