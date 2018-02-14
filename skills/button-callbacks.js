'use strict';

const button_search_playlist = {
    text: 'Select songs which you would like to add to the playlist',
    response_type: "in_channel",
    attachments: [
      {
        fallback: 'You are unable to choose a playlist/artist',
        color: '#24db56',
        mrkdwn_in: [
          'text',
          'pretext',
          'fields'
        ],
        callback_id: 'search_artist_album_callback',
        attachment_type: 'default',
        actions: [
          {
            name: 'search_result',
            text: 'Search Results',
            type: 'select',
            value: 'Search Results',
            data_source: 'external',
            min_query_length: 7,
          },
          {
            name: 'Add to Playlist',
            text: 'Add to Playlist',
            type: 'button',
            style: 'primary',
            value: 'Add to Playlist'
          },
          {
            name: 'Done!',
            text: 'Done!',
            type: 'button',
            style: 'danger',
            value: 'Done!'
          }
        ]
      }
    ]
  };
  const options_search  = {
    options: [
        {
            text: "Unexpected sentience",
            value: "AI-2323"
        },
        {
            text: "Bot biased toward other bots",
            value: "SUPPORT-42"
        },
        {
            text: "Bot broke my toaster",
            value: "IOT-75"
        }
    ]
};

module.exports = function(controller) {
    
    controller.on('interactive_message_callback', function(bot, message) {
        // These 3 lines are used to parse out the id's
        var user_id = message.user;
        
        var callback_id = message.callback_id;
        
        // Example use of Select case method for evaluating the callback ID
        // Callback ID 123 for weather bot webcam
        switch(callback_id) {
            case "spotbot_options_callback":
                bot.replyInteractive(message, button_search_playlist);
                break;
            // Add more cases here to handle for multiple buttons
            case "search_artist_album_callback":
                const selected_option = message.actions[0].selected_options[0].value;
                const selected_option_list = selected_option.split("::::")
                console.log('Message', message);
                console.log('Raw Message', selected_option.value);
                bot.replyInteractive(message, {
                    text:`You selected ${selected_option_list[0]}`,
                    response_type: 'ephemeral',
                    replace_original: false,
                    delete_original: false
                });
                break;    
            default:
                // For debugging
                bot.reply(message, 'Added');
        }
    });

};