import Serializer from "@ember-data/serializer";

export default Serializer.extend({
  normalizeResponse(store, schema, rawPayload) {
    return rawPayload;
  },

  serialize(snapshot, options) {
    return {
      campaignUuid: snapshot.attributes().campaignUuid,
      data: {
        firstName: snapshot.attributes().firstName,
        lastName: snapshot.attributes().lastName,
        email: snapshot.attributes().email,
        password: snapshot.attributes().password
      }
    };
  }
});
