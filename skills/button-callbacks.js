'use strict';

const utils = require('../utils/helper');
const dashboard = require('../messages/dashboard')
const buttonSearchPlaylist = require('../messages/playlist');
const debug = require('debug')('slackbotkit:button-callbacks');

module.exports = function(controller) {
    controller.on('welcome_message_dashboard', function(bot, message) {
        debug('Trogger welcome_message_dashboard');
        
        utils.fetchData('GET', '/currentTrack', {})
            .then(track => {
                debug('My Track', track);
                dashboard.attachments[1].title = `_${track.name}_`;
                bot.reply(message, dashboard);
            });
    });

    controller.on('interactive_message_callback', function(bot, message) {
        const callbackId = message.callback_id;
        
        switch(callbackId) {
            case "spotbot_options_callback":
                bot.replyInteractive(message, buttonSearchPlaylist);
                break;
            // Add more cases here to handle for multiple buttons
            case "search_artist_album_callback":
                debug('Search Artish Message', message);
                if(message.text === 'finish_album_callback') {
                    controller.trigger('welcome_message_dashboard', [bot, message]);
                } else {
                    const selected_option = message.actions[0].selected_options[0].value;
                    const selected_option_list = selected_option.split("::::")
                    
                    const selectedTrack  = [
                        {
                            __model__:  'Track',
                            name:       selected_option_list[0],
                            uri:        selected_option_list[1],
                            length:     Number(selected_option_list[2]),
                            track_no:   Number(selected_option_list[3]),
                        }
                    ];
                    debug(selectedTrack);
                    utils.fetchData('POST', '/addTracks', selectedTrack)
                        .then(data => {
                            console.log('Selected Track', selectedTrack);
                            console.log('Added PLay list');
                            bot.replyInteractive(message, {
                                text:`Added to playlist ${selected_option_list[0]}`,
                                response_type: 'ephemeral',
                                replace_original: false,
                                delete_original: false
                            });
                    });
                }
                break;
            case 'spotbot_options_current_track':
                const currentTrackAction = message.actions[0].value;
                switch(currentTrackAction) {
                    case 'play':
                        utils.fetchData('GET', '/play', {})
                        .then(data => {
                            debug('Play', data);
                        });
                        break;
                    case 'pause':
                        utils.fetchData('GET', '/pause', {})
                        .then(data => {
                            debug('Done pause', data);
                        });
                        break;
                    case 'next_song':
                        utils.fetchData('GET', '/next', {})
                        .then(data => {
                            debug('Done', data);
                        });
                        break;
                    case 'previous_song':
                        utils.fetchData('GET', '/previous', {})
                        .then(data => {
                            debug('Previous', data);
                        });
                        break;
                    default:
                        break;
                }
                break;    
            default:
                // For debugging
                debug('Wrong Callback', callbackId);
                bot.reply(message, 'Wrong Command');
        }
    });

};