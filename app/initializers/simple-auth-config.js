/* global EmberSimpleAuthSampleENV */

export default {
  name:       'simple-auth-config',
  before:     'simple-auth',
  initialize: function() {
    window.ENV = EmberSimpleAuthSampleENV;
  }
};