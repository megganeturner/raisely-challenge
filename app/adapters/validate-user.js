import Adapter from "@ember-data/adapter";
import { run } from "@ember/runloop";
import RSVP from "rsvp";
import $ from "jquery";

export default class ValidateUser extends Adapter {
  findRecord(store, type, id, snapshot) {
    let data = this.serialize(snapshot, { includeId: true });

    return new RSVP.Promise(function (resolve, reject) {
      $.ajax({
        type: "POST",
        url: "https://api.raisely.com/v3/check-user",
        dataType: "json",
        data
      }).then(
        function (data) {
          run(null, resolve, data);
        },
        function (jqXHR) {
          jqXHR.then = null; // tame jQuery's ill mannered promises
          run(null, reject, jqXHR);
        }
      );
    });
  }
}
