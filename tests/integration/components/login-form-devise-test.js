import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('login-form-devise', 'Integration | Component | login form devise', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{login-form-devise}}`);

  assert.equal(this.$().find('.headline').text().trim(), 'With Devise');
});
