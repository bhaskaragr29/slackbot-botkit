
'use strict';



const env = require('node-env-file');
const debug = require('debug')('botkit:main');

// Create the Botkit controller, which controls all instances of the bot.


// Set up an Express-powered webserver to expose oauth and webhook endpoints
class SlackBotKitController {

  constructor(clientId, clientSecret, scopes, debug = false) {

    this.opts = {
      clientId: clientId,
      clientSecret: clientSecret,
      debug: debug,
      scopes: scopes,
      json_file_store: __dirname + '/.data/db/'
    }
    this.controller = Botkit.slackbot(this.opts);

  }


  addComponents(controller) {
    require(__dirname + '/components/express-webserver.js')(controller);

    // Set up a simple storage backend for keeping a record of customers
    // who sign up for the app via the oauth
    require(__dirname + '/components/user-registration.js')(controller);

    // Send an onboarding message when a new team joins
    require(__dirname + '/components/onboarding.js')(controller);

    require("fs").readdirSync(require("path").join(__dirname, "skills")).forEach(function (file) {
      require("./skills/" + file)(controller);
    });
  }

  run() {
    this.addComponents(this.controller);
    this.controller.startTicking();
  }

}

module.exports = SlackBotKitController;