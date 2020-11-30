import Serializer from "@ember-data/serializer";

export default Serializer.extend({

  normalizeResponse(store, schema, rawPayload) {
    return {
        ...rawPayload,
        data: {
          type: 'validate-user',
          // Ember expects a payload with an id for primaryKey, so we just generate a random number to handle this
          id: Math.floor(Math.random() * 10000),
          attributes: {
            status: rawPayload.data.status,
          },
        },
      };
  },

  serialize(snapshot) {
    return {
      campaignUuid: '46aa3270-d2ee-11ea-a9f0-e9a68ccff42a',
      data: {
        email: snapshot.id,
      }
    };
  },
});
