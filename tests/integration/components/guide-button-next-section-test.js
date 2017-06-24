import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('guide-button-next-section', 'Integration | Component | guide button next section', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{guide-button-next-section}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#guide-button-next-section}}
      template block text
    {{/guide-button-next-section}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
