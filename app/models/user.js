import DS from 'ember-data';
const { attr, Model } = DS;

export default Model.extend({
  campaignUuid: attr('string',
    { defaultValue: '46aa3270-d2ee-11ea-a9f0-e9a68ccff42a' }),
  firstName: attr('string'),
  lastName: attr('string'),
  email: attr('string'),
  password: attr('string'),
})
