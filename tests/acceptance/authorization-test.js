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
      var response = {
        data: [
          {
            type: "posts",
            id: 1,
            attributes: {
              content: 'That is my post content.'
            }
          }
        ]
      };
      this.get('/api/posts', function() {
        return [200, { 'Content-Type': 'application/json' }, JSON.stringify(response)];
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
    assert.equal(currentRouteName(), 'posts');
  });
});
