import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    },
    error(error) {
      if (error.errors && error.errors[0].status === "401") {
        return;
      }
    }
  }
});
