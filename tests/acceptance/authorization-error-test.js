import Ember from 'ember';
import { module, test } from 'qunit';
import Pretender from 'pretender';
import startApp from '../helpers/start-app';

var App;
var server;

module('Authentication', {
  setup: function() {
    App = startApp();
    var response = {
      "errors": [
        {
          status: "403",
          detail: "access_denied"
        }
      ]
    };
    server = new Pretender(function() {
      this.get('/api/posts', function() {
        return [403, { 'Content-Type': 'application/json' }, JSON.stringify(response)];
      });
    });
  },
  teardown: function() {
    Ember.run(App, App.destroy);
    server.shutdown();
  },
});

test('user cannot see posts if not authorized', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentRouteName(), 'index');
  });

  visit('/posts');

  andThen(function() {
    assert.equal(currentRouteName(), 'login');
  });
});
