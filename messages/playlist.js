'use strict';

module.exports = {
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
            name: 'finish_album_callbacks',
            text: 'Done!',
            type: 'button',
            style: 'danger',
            value: 'finish_album_callback'
          }
        ]
      }
    ]
  };