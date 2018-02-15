'use strict';

const commands = require('../lib/commands');
const SLACK_SOCKET_SERVER = 'http://localhost:4200';
const fetch = require('node-fetch');
const utils = require('../utils/helper');
const SlackController = require('../lib/spotify/controller');


// this is for test pupose will be depreceated later
const testButton = {
    "text": "Welcome to SpotBot!",
    "response_type": 'ephemeral',
    "attachments": [
        {
            "fallback": "Hmm?",
            "color": "#27d243",
            "text": "Here are your options:",
            "mrkdwn_in": [
                "text",
                "pretext",
                "fields"
            ],
            "callback_id": "spotbot_options_callback",
            "attachment_type": "default",
            "actions": [
                {
                    "name": "game",
                    "text": "Search for Songs / Artists",
                    "type": "button",
                    "style": "primary",
                    "value": "chess"
                },
                {
                    "name": "game",
                    "text": "Search for Playlists",
                    "type": "button",
                    "style": "primary",
                    "value": "maze"
                },
                {
                    "name": "Currently Playing",
                    "text": "Currently Playing",
                    "type": "button",
                    "style": "primary",
                    "value": "Currently Playing"
                },
                {
                    "name": "List",
                    "text": "List",
                    "type": "button",
                    "style": "primary",
                    "value": "List"
                },
                {
                    "name": "Recommended",
                    "text": "Recommended",
                    "type": "button",
                    "style": "primary",
                    "value": "Recommended"
                }
            ]
        }
    ]
};
const testData1 = {
    text: 'Welcome to SpotBot!',
    attachments: [
        {
            text: 'Welcome to SpotBot!',
            attachments: [
                {
                    fallback: 'Hmm?',
                    color: '#27d243',
                    text: 'Here are your options:',
                    mrkdwn_in: [
                        'text',
                        'pretext',
                        'fields'
                    ],
                    callback_id: 'wopr_game',
                    attachment_type: 'default',
                    actions: [
                        {
                            name: 'game',
                            text: 'Search for Songs / Artists',
                            type: 'button',
                            style: 'primary',
                            value: 'chess'
                        },
                        {
                            name: 'game',
                            text: 'Search for Playlists',
                            type: 'button',
                            style: 'primary',
                            value: 'maze'
                        },
                        {
                            name: 'Currently Playing',
                            text: 'Currently Playing',
                            type: 'button',
                            style: 'primary',
                            value: 'Currently Playing'
                        },
                        {
                            name: 'List',
                            text: 'List',
                            type: 'button',
                            style: 'primary',
                            value: 'List'
                        },
                        {
                            name: 'Recommended',
                            text: 'Recommended',
                            type: 'button',
                            style: 'primary',
                            value: 'Recommended'
                        }
                    ]
                }
            ]
        },
        {
            text: 'Select songs which you would like to add to the playlist',
            attachments: [
                {
                    fallback: 'You are unable to choose a game',
                    color: '#24db56',
                    mrkdwn_in: [
                        'text',
                        'pretext',
                        'fields'
                    ],
                    callback_id: 'wopr_game',
                    attachment_type: 'default',
                    actions: [
                        {
                            name: 'Search Results',
                            text: 'Search Results',
                            type: 'select',
                            value: 'Search Results',
                            data_source: 'static',
                            options: [
                                {
                                    text: 'Song 1',
                                    value: 'Song 1'
                                },
                                {
                                    text: 'Song 2',
                                    value: 'Song 2'
                                },
                                {
                                    text: 'Song 3',
                                    value: 'Song 3'
                                },
                                {
                                    text: 'Song 4',
                                    value: 'Song 4'
                                },
                                {
                                    text: 'Song 5',
                                    value: 'Song 5'
                                },
                                {
                                    text: 'Song 6',
                                    value: 'Song 6'
                                },
                                {
                                    text: 'Song 7',
                                    value: 'Song 7'
                                },
                                {
                                    text: 'Song 8',
                                    value: 'Song 8'
                                },
                                {
                                    text: 'Song 9',
                                    value: 'Song 9'
                                },
                                {
                                    text: 'Song 10',
                                    value: 'Song 10'
                                }
                            ]
                        },
                        {
                            name: 'Done!',
                            text: 'Done!',
                            type: 'button',
                            style: 'danger',
                            value: 'finish_playlist'
                        }
                    ]
                }
            ]
        },
        {
            text: 'Successfully added to the playlist!',
            response_type: 'ephemeral'
        },
        {
            text: 'Currently Playing: Song 1 :musical_note:',
            attachments: [
                {
                    fallback: 'Hmm?',
                    color: '#27d243',
                    mrkdwn_in: [
                        'text',
                        'pretext',
                        'fields'
                    ],
                    callback_id: 'wopr_game',
                    attachment_type: 'default',
                    title: 'Up Next: Song 2 :musical_note:',
                    actions: [
                        {
                            name: ':rewind:',
                            text: ':rewind:',
                            type: 'button',
                            style: 'default',
                            value: ':rewind:'
                        },
                        {
                            name: 'game',
                            text: ':arrow_forward:',
                            type: 'button',
                            style: 'primary',
                            value: 'maze'
                        },
                        {
                            name: ':double_vertical_bar:',
                            text: ':double_vertical_bar:',
                            type: 'button',
                            style: 'default',
                            value: ':double_vertical_bar:'
                        },
                        {
                            name: ':fast_forward:',
                            text: ':fast_forward:',
                            type: 'button',
                            style: 'default',
                            value: ':fast_forward:'
                        }
                    ]
                }
            ]
        },
        {
            text: 'Here is your current list:',
            attachments: [
                {
                    fallback: 'Hmm?',
                    color: '#27d243',
                    mrkdwn_in: [
                        'text',
                        'pretext',
                        'fields'
                    ],
                    callback_id: 'wopr_game',
                    attachment_type: 'default',
                    actions: [
                        {
                            name: 'game',
                            text: 'Play',
                            type: 'button',
                            style: 'default',
                            value: 'chess'
                        },
                        {
                            name: 'Shuffle',
                            text: 'Shuffle',
                            type: 'button',
                            style: 'default',
                            value: 'Shuffle'
                        },
                        {
                            name: 'Repeat List',
                            text: 'Repeat List',
                            type: 'button',
                            style: 'default',
                            value: 'Repeat List'
                        },
                        {
                            name: 'Clear List',
                            text: 'Clear List',
                            type: 'button',
                            style: 'default',
                            value: 'Clear List'
                        }
                    ]
                }
            ]
        }
    ]
};
const testMenu = {
    "text": "Would you like to play a game?",
    "response_type": "in_channel",
    "attachments": [
        {
            "text": "Choose a game to play",
            "fallback": "If you could read this message, you'd be choosing something fun to do right now.",
            "color": "#3AA3E3",
            "attachment_type": "default",
            "callback_id": "game_selection",
            "actions": [
                {
                    "name": "games_list",
                    "text": "Pick a game...",
                    "type": "select",
                    "options": [
                        {
                            "text": "Hearts",
                            "value": "hearts"
                        },
                        {
                            "text": "Bridge",
                            "value": "bridge"
                        },
                        {
                            "text": "Checkers",
                            "value": "checkers"
                        },
                        {
                            "text": "Chess",
                            "value": "chess"
                        },
                        {
                            "text": "Poker",
                            "value": "poker"
                        },
                        {
                            "text": "Falken's Maze",
                            "value": "maze"
                        },
                        {
                            "text": "Global Thermonuclear War",
                            "value": "war"
                        }
                    ]
                }
            ]
        }
    ]
};

module.exports = function (controller) {


    controller.hears(['^hello$'], 'direct_message,direct_mention', function (bot, message) {
        const commands_list = [];
        commands.forEach(command => {
            commands_list.push(command.slack_text);
        });
        const text = commands_list.join("\n");
        bot.reply(message, { text: text });
    });

    controller.hears(['^try$'], 'direct_message,direct_mention', function (bot, message) {
        const td = 
                { __model__: 'Track',
                    name: 'Fester Skank',
                uri: 'spotify:track:1nMmV6f2zhsMZ5kTMdszSb',
                length: 143986,
                track_no: 3 
            };
        utils.fetchData('POST', '/addTracks', [td])
                        .then(data => {
                            console.log('Added PLay list');
                            bot.replyInteractive(message, {
                                text:`Added to playlist`,
                                response_type: 'ephemeral',
                                replace_original: false,
                                delete_original: false
                            });
                    });
        
    });

    controller.hears(['^hi$'], 'direct_mention',  function(bot, message) {
        bot.startConversation(message, function(err, convo) {
            if (!err) {
                //convo.say(testButton);
                convo.ask(testButton, function(response, convo) {
                    console.log(response);
                    convo.ask({text: 'You want me to call you `' + response.text + '`?', response_type: 'ephemeral'}, [
                        {
                            pattern: 'yes',
                            callback: function(response, convo) {
                                // since no further messages are queued after this,
                                // the conversation will end naturally with status == 'completed'
                                convo.next();
                            }
                        },
                        {
                            pattern: 'no',
                            callback: function(response, convo) {
                                // stop the conversation. this will cause it to end with status == 'stopped'
                                convo.stop();
                            }
                        },
                        {
                            default: true,
                            callback: function(response, convo) {
                                convo.repeat();
                                convo.next();
                            }
                        }
                    ]);

                    convo.next();

                }, {'key': 'nickname'}); // store the results in a field called nickname

                convo.on('end', function(convo) {
                    if (convo.status == 'completed') {
                        bot.reply(message, 'OK! I will update my dossier...');

                        controller.storage.users.get(message.user, function(err, user) {
                            if (!user) {
                                user = {
                                    id: message.user,
                                };
                            }
                            user.name = convo.extractResponse('nickname');
                            controller.storage.users.save(user, function(err, id) {
                                bot.reply(message, 'Got it. I will call you ' + user.name + ' from now on.');
                            });
                        });



                    } else {
                        // this happens if the conversation ended prematurely for some reason
                        bot.reply(message, 'OK, nevermind!');
                    }
                });
            }
        });
    });

    // controller.hears(['^help (.*)$'], 'direct_message,direct_mention', function (bot, message) {
    //     const commandMessage = message.match[1];
    //     //testButton
    //     message.ephemeral = true;
    //     message.user = message.event.user;
    //     console.log(message);
    //     bot.sendEphemeral(testButton, function (convo) {
    //         console.log(convo);
    //     }); 

    // });

    // controller.hears(['^showme$'], 'direct_mention', function (bot, message) {
    //     const controller = new SlackController();

    //     const opts =
    //         {
    //             min_energy: 0.4,
    //             seed_genres: ['alt_rock',
    //                 'bluegrass',
    //                 'blues'],
    //             min_popularity: 50,
    //             market: ['GB']
    //         };
    //     controller.recommendations(opts)
    //         .then(tracks => {
    //             const trackList = utils.compileTrackList(tracks);
    //             bot.reply(message, { text: trackList.join("\n") });
    //         }
    //     );


    // });

    // controller.hears(['^search (.*)$'], 'direct_mention', function (bot, message) {
    //     const fetchData = (route, data) => {
    //         let url = "http://localhost:4200" + route;
    //         return fetch(url, {
    //             method: "POST",
    //             body: JSON.stringify(data),
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         }).then(res => res.json())
    //             .catch(e => console.log(e))
    //     }
    //     const data = {
    //         "method": "album",
    //         "text": message.match[1]
    //     };
    //     const trackList = [];
    //     fetchData("/search", data)
    //         .then(tracks => {
    //             console.log(tracks);
    //             tracks.forEach(track => {
    //                 trackList.push(":musical_note:" + track.name);
    //             });
    //             const text = trackList.join("\n");
    //             bot.reply(message, { text: text });
    //         })
    // });


};
