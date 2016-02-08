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
    let token;

    if (authenticatorType === 'authenticator:devise') {
      token = data['token'];
    } else if (authenticatorType === 'authenticator:oauth2') {
      token = data['access_token'];
    }

    block('Authorization', `Bearer ${token}`);
  }
});

