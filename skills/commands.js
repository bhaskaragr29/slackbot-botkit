'use strict';

const commands = require('../lib/commands');
const SLACK_SOCKET_SERVER = 'http://localhost:4200';
const fetch = require('node-fetch');
const utils = require('../utils/helper');
const SlackController = require('../lib/spotify/controller');
const dashboard = require('../messages/dashboard');

module.exports = function (controller) {

    controller.hears(['^dashboard$'], 'direct_message,direct_mention', function (bot, message) {
        //should show dashboard in personal view only in channel
        controller.trigger('welcome_message_dashboard', [bot, message]);
    });
};