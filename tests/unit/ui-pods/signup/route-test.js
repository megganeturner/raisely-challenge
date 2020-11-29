import { module, skip } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | signup', function(hooks) {
  setupTest(hooks);

  skip('it exists', function(assert) {
    let route = this.owner.lookup('route:signup');
    assert.ok(route);
  });
});
