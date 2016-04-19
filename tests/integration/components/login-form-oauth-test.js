import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('login-form-oauth', 'Integration | Component | login form oauth', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{login-form-oauth}}`);

  assert.equal(this.$().find('.headline').text().trim(), 'With oauth2');
});
