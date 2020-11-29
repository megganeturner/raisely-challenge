import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  store: service(),
  userFirstName: '',
  userLastName: '',
  userEmail: '',
  userPassword: '',
  isLoading: false,
  userExists: false,
  registrationSuccess: false,
  isValidFormatEmail: true,


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
          // obviously in a real app we wouldn't be sending the password as plain text
          password
        });

        user.save().then(() => {
          this.set('registrationSuccess', true);
        });

      }
      this.set('isLoading', false);
    },

    emailFocusOut: function () {
      const email = this.get('userEmail');
      // from https://www.w3resource.com/javascript/form/email-validation.php
      const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (! email.match(mailFormat)) {
        this.set('isValidFormatEmail', false);
      }
      else {
        this.set('isValidFormatEmail', true);
      }
    },
  }
});
