import Ember from 'ember';
import Base from 'simple-auth/authenticators/base';

var TestAuthenticator = Base.extend({
  restore: function() {
    return new Ember.RSVP.resolve();
  },
  authenticate: function() {
    return new Ember.RSVP.resolve();
  },
  invalidate: function() {
    return new Ember.RSVP.resolve();
  }
});

export default {
  name:       'simple-auth-test-setup',
  before:     'simple-auth',
  initialize: function(container) {
    if (Ember.testing) {
      container.register('simple-auth-authenticator:test', TestAuthenticator);
    }
  }
};
