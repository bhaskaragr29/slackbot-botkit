'use strict';

module.exports = {
    text: "Welcome to SpotBot!",
    response_type: 'ephemeral',
    replace_original: false,
    delete_original: false,
    attachments: [
        {
            fallback: "Hmm?",
            color: "#27d243",
            text: "Here are your options:",
            mrkdwn_in: [
                'text',
                'pretext',
                'fields'
            ],
            callback_id: "spotbot_options_callback",
            attachment_type: "default",
            actions: [
                {
                    "name": "search_song",
                    "text": "Search for Songs / Artists",
                    "type": "button",
                    "style": "primary",
                    "value": "search_song"
                },
                {
                    "name": "search_playlist",
                    "text": "Search for Playlists / Alubums",
                    "type": "button",
                    "style": "primary",
                    "value": "search_playlist"
                },
                {
                    "name": "view_current_list",
                    "text": "View Current Playlist",
                    "type": "button",
                    "style": "primary",
                    "value": "current_playlist"
                },
                {
                    "name": "featured_playlist",
                    "text": "Featured PlayList",
                    "type": "button",
                    "style": "primary",
                    "value": "featured_playlist"
                },
                {
                    "name": "Recommended Playlist",
                    "text": "Recommended",
                    "type": "button",
                    "style": "primary",
                    "value": "recommended_playlist"
                }
            ]
        },
        {
            "title": "",
            "pretext": "*Currently Playing* ",
            "mrkdwn_in": ["text", "pretext"],
            "callback_id": "spotbot_options_current_track",
            "attachment_type": "default",
            actions: [
                // {
                //     name: 'Previous Song',
                //     text: ':rewind:',
                //     type: 'button',
                //     style: 'default',
                //     value: 'previous_song'
                // },
                {
                    name: 'Play',
                    text: ':arrow_forward:',
                    type: 'button',
                    style: 'primary',
                    value: 'play'
                },
                {
                    name: 'Pause',
                    text: ':double_vertical_bar:',
                    type: 'button',
                    style: 'default',
                    value: 'pause'
                },
                // {
                //     name: 'Next Song',
                //     text: ':fast_forward:',
                //     type: 'button',
                //     style: 'default',
                //     value: 'next_song'
                // }
            ]

        },
        {
            "title": "",
            "pretext": "",
            "callback_id": "spotbot_shutdown",
            "attachment_type": "default",
            actions: [
                {
                    name: 'Previous Song',
                    text: 'Done',
                    type: 'button',
                    style: 'danger',
                    value: 'shutdown_conversation'
                }
            ]

        }
    ]
};