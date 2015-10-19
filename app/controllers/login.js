import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),

  actions: {
    authenticate() {
      const { identification, password } = this.getProperties('identification', 'password');
      return this.get('session').authenticate('authenticator:oauth2', identification, password);
    }
  }
});
