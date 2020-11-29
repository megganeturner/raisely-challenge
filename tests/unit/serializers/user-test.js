import { module, skip } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Serializer | user', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  skip('it exists', function(assert) {
    let store = this.owner.lookup('service:store');
    let serializer = store.serializerFor('user');

    assert.ok(serializer);
  });

  skip('it serializes records', function(assert) {
    let store = this.owner.lookup('service:store');
    let record = store.createRecord('user', {});

    let serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
