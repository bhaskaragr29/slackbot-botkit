'use strict';

const commands = require('../lib/commands');
const SLACK_SOCKET_SERVER = 'http://localhost:4200';
const fetch = require('node-fetch');


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

module.exports = function(controller) {

    controller.on('interactive_message_callback', function(bot, message) {
        // These 3 lines are used to parse out the id's
        var ids = message.callback_id.split(/\-/);
        var user_id = ids[0];
        var item_id = ids[1];
    
        var callbackId = message.callback_id;
        
        // Example use of Select case method for evaluating the callback ID
        // Callback ID 123 for weather bot webcam
        switch(callbackId) {
        case "123":
            bot.replyInteractive(message, "Button works!");
            break;
        // Add more cases here to handle for multiple buttons    
        default:
            // For debugging
            bot.reply(message, 'The callback ID has not been defined');
        }
    });

    controller.on('interactive_message_callback', function(bot, message) {
        // These 3 lines are used to parse out the id's
        var ids = message.callback_id.split(/\-/);
        var user_id = ids[0];
        var item_id = ids[1];
    
        var callbackId = message.callback_id;
        
        // Example use of Select case method for evaluating the callback ID
        // Callback ID 123 for weather bot webcam
        switch(callbackId) {
        case "123":
            bot.replyInteractive(message, "Button works!");
            break;
        // Add more cases here to handle for multiple buttons    
        default:
            // For debugging
            bot.reply(message, 'The callback ID has not been defined');
        }
    });


    controller.hears(['^hello$'], 'direct_message,direct_mention', function(bot, message) {
        const commands_list = [];
        commands.forEach(command => {
            commands_list.push(command.slack_text);
        });
        const text = commands_list.join("\n");
        bot.reply(message, {text: text});
    });

    controller.hears(['^help (.*)$'], 'direct_mention', function(bot, message) {
        // console.log(message);
        // bot.reply(message,{
        //     "attachments": [
        //         {
        //             "title": "Title",
        //             "pretext": "Pretext _supports_ mrkdwn",
        //             "text": "Testing *right now!*",
        //             "mrkdwn_in": ["text", "pretext"]
        //         }
        //     ]
        // })
        const commandMessage = message.match[1];
        // console.log(commandMessage);   
        // bot.startConversation(message, function(err, convo) {

        //     convo.addMessage({text: 'hello', action:'foo'},'default');
        
        //     convo.addMessage({text: 'foo'},'foo');
        
        //     convo.beforeThread('foo', function(convo, next) {
        
        //       console.log('BEFORE FOO!');
        //       next();
        
        //     });
        
        //     convo.beforeThread('foo', function(convo, next) {
        
        //       console.log('ALSO BEFORE FOO');
        //       next();
        
        //     });
        
        
        //     console.log('GO BAB GO');
        
        //   });

        
        // let user = {
        //         id: message.user,
        //         list: []
        //     }
        

        // if (!user.list || !user.list.length) {
        //     user.list = [
        //         {
        //             'id': 1,
        //             'text': 'Test Item 1'
        //         },
        //         {
        //             'id': 2,
        //             'text': 'Test Item 2'
        //         },
        //         {
        //             'id': 3,
        //             'text': 'Test Item 3'
        //         }
        //     ]
        // }

        // var reply = {
        //     text: 'Here is your list. Say `add <item>` to add items.',
        //     attachments: [],
        // }

        // for (var x = 0; x < user.list.length; x++) {
        //     reply.attachments.push({
        //         title: user.list[x].text + (user.list[x].flagged? ' *FLAGGED*' : ''),
        //         callback_id: message.user + '-' + user.list[x].id,
        //         attachment_type: 'default',
        //         actions: [
        //             {
        //                 "name":"flag",
        //                 "text": ":waving_black_flag: Flag",
        //                 "value": "flag",
        //                 "type": "button",
        //             },
        //             {
        //                "text": "Delete",
        //                 "name": "delete",
        //                 "value": "delete",
        //                 "style": "danger",
        //                 "type": "button",
        //                 "confirm": {
        //                   "title": "Are you sure?",
        //                   "text": "This will do something!",
        //                   "ok_text": "Yes",
        //                   "dismiss_text": "No"
        //                 }
        //             }
        //         ]
        //     })
        // }
        // bot.reply(message, reply);

        // var testButtonReply = {
        //     username: 'Button Bot' ,
        //     text: 'This is a test message with a button',
        //     replace_original: 'true',
        //     attachments: [
        //         {
        //             fallback: "fallback text",
        //             callback_id: '123',
        //             attachment_type: 'default',
        //             title: 'message title',
        //             text: 'message content',
        //             color: '#0075C7',
        //             actions: [
        //                 {
        //                   "name": "button name",
        //                   "text": "button text",
        //                   "type": "button",
        //                   "value": "whatever you want to pass into the interactive_message_callback"}
        //             ]
        //         }
        //     ],
        //     icon_url: 'http://14379-presscdn-0-86.pagely.netdna-cdn.com/wp-content/uploads/2014/05/ButtonButton.jpg'
            
        // }

        
    bot.reply(message, testMenu); 

        
    });
    
    controller.hears(['^search (.*)$'], 'direct_mention', function(bot, message) {
        const fetchData = (route, data) => {
            let url = "http://localhost:4200" + route;
            return fetch(url, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json())
            .catch(e => console.log(e))
        }
        const data = {
            "method": "album",
            "text": message.match[1]
        };
        const trackList = [];
        fetchData("/search", data)
            .then(tracks => {
                console.log(tracks);
                tracks.forEach(track => {
                    trackList.push(track.name);
                });
                const text = trackList.join("\n");
                bot.reply(message, {text: text});
            })
    });


};
