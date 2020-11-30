import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
  store: service(),
  userFirstName: '',
  userLastName: '',
  userEmail: '',
  userPassword: '',
  isLoading: false,
  userExists: false,
  registrationSuccess: false,
  isValidFormatEmail: null,

  canSubmitForm: computed('userFirstName', 'userLastName', 'userEmail', 'userPassword', 'userExists', function p () {
    const hasFirstName = this.get('userFirstName').length > 0;
    const hasLastName = this.get('userLastName').length > 0;
    const hasEmail = this.get('userEmail').length > 0;
    const validEmail = this.get('isValidFormatEmail');
    const userExists = this.get('userExists');
    const hasPassword = this.get('userPassword').length > 0;

    return hasFirstName && hasLastName && hasEmail && validEmail && hasPassword && ! userExists;
  }),


  actions: {
    createUser: async function () {
      this.set('isLoading', true);
      const firstName = this.get('userFirstName');
      const lastName = this.get('userLastName');
      const email = this.get('userEmail');
      const password = this.get('userPassword');

      const validatedUser = await this.store.findRecord('validate-user', email);

      if (validatedUser.data.status === 'EXISTS') {
        this.set('userExists', true);
      }
      else {
        const user = this.store.createRecord('user', {
          firstName,
          lastName,
          email,
          password
        });

        user.save().then(() => {
          this.set('registrationSuccess', true);
        });

      }
      this.set('isLoading', false);
    },

    emailFocusOut: async function () {
      const email = this.get('userEmail');
      // from https://www.w3resource.com/javascript/form/email-validation.php
      const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (! email.match(mailFormat)) {
        this.set('isValidFormatEmail', false);
      }
      else {
        this.set('isValidFormatEmail', true);
        const validatedUser = await this.store.findRecord('validate-user', email);

        if (validatedUser.data.status === 'EXISTS') {
          this.set('userExists', true);
        }
        else {
          this.set('userExists', false);
        }
      }
    },
  }
});
