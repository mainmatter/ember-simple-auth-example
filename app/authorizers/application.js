import Ember from 'ember';
import BaseAuthorizer from 'ember-simple-auth/authorizers/base';

/*
  This custom authorizer has been created as we use
  two authenticators (Devise and OAuth2). It overrides
  the BaseAuthorizer's `authorize` method.

  The use of the custom authorizer is explicitly set
  in 'app/adapters/application.js'.
*/
export default BaseAuthorizer.extend({
  /*
   The `authorize` method is running a block of code
   which is setting request headers according to the
   current authenticator.
  */
  authorize(data, block) {
    const authenticatorType = data['authenticator'];

    if (Ember.isEqual(authenticatorType, 'authenticator:devise')) {
      const authData = `token="${data['token']}", email="${data['email']}"`;
      block('Authorization', `Token ${authData}`);
    }

    if (Ember.isEqual(authenticatorType, 'authenticator:oauth2')) {
      block('Authorization', `Bearer "${data['access_token']}"`);
    }
  }
});
