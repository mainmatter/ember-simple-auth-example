import Ember from 'ember';
import { module, test } from 'qunit';
import Pretender from 'pretender';
import { authenticateSession } from '../helpers/ember-simple-auth';
import startApp from '../helpers/start-app';

var App;
var server;

module('Authentication', {
  setup: function() {
    App = startApp();
    var response = {
      "errors": [
        {
          status: "401",
          detail: "Access denied"
        }
      ]
    };
    server = new Pretender(function() {
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
  // FIXME: this test fails on any assertion, investigate why
  authenticateSession(App);

  visit('/');

  click('a[href="/posts"]');

  andThen(function() {
    assert.notEqual(currentRouteName(), 'posts');
  });

  andThen(function() {
    assert.equal(find('a:contains("Login")').length, 1, 'The page shows a login link and session is unauthenticated');
  });
});
