'use strict';

const SlackBotKitController = require ('./slackbot-controller');
const clientId = process.env.SLACKBOT_CLIENT_ID;
const clientSecret = process.env.SLACKBOT_CLIENT_SECRET;
const scopes = ['bot'];
const debug = true;
const port = process.env.SLACKBOT_PORT || 3000;


if (!clientId || !clientSecret || !port) {
    console.log('Error: Specify SLACKBOT_CLIENT_ID SLACKBOT_CLIENT_SECRET and SLACKBOT_PORT in environment');
    process.exit(1);
  }  

const controller = new SlackBotKitController(clientId, clientSecret,  scopes, debug, port);

controller.run();