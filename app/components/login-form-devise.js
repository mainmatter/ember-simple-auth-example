import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  classNames: ['devise-authentication'],
  errors: null,

  actions: {
    authenticate() {
      const { identification, password } = this.getProperties('identification', 'password');

      this.get('session').authenticate('authenticator:devise', identification, password).catch((err) => {
        this.set('errors', err.error);
      });
    }
  }
});
