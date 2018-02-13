
'use strict';

const debug = require('debug')('botkit:slackbot-controller');
const Botkit = require('botkit');

/** 
 * Slackbot controller
*/
class SlackBotKitController {

    constructor(clientId, clientSecret, scopes, debug = false, port) {

      this.opts = {
        clientId: clientId,
        clientSecret: clientSecret,
        debug: debug,
        scopes: scopes,
        json_file_store: __dirname + '/.data/db/'
      }
      this.controller = Botkit.slackbot(this.opts);
      this.port = port

    }

    /**
     * Add Related components
     * @param {Object} controller - Botkit Controller
     */
    addComponents(controller, port) {
      require(__dirname + '/components/express-webserver.js')(controller, port);

      // Set up a simple storage backend for keeping a record of customers
      // who sign up for the app via the oauth
      require(__dirname + '/components/user-registration.js')(controller);

      // Send an onboarding message when a new team joins
      require(__dirname + '/components/onboarding.js')(controller);

      require("fs").readdirSync(require("path").join(__dirname, "skills")).forEach(function (file) {
        require("./skills/" + file)(controller);
      });
    }

    /** 
     * Add related dependicies and trigger controller
    */
    run() {
      debug('Adding Components and trigger controller')
      this.addComponents(this.controller, this.port);
      this.controller.startTicking();
    }
}

module.exports = SlackBotKitController;