'use strict';

const debug = require('debug')('botkit:incoming_webhooks');
const fetch = require('node-fetch');
const utils = require('../../utils/helper');

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

/**
 * Incoming webhooks
 * @param  {Object} webserver Express webserver
 * @param  {Object} controller Bitkit Controller
 * @return 
 */
module.exports = function(webserver, controller) {

    debug('Configured /slack/receive url');
    webserver.post('/slack/receive', function(req, res) {

        // NOTE: we should enforce the token check here
        // respond to Slack that the webhook has been received.
        res.status(200);
        // Now, pass the webhook into be processed
        controller.handleWebhookPayload(req, res);

    });

    webserver.post('/slack/dyoptions', function(req, res) {
        //Bad bad bad
        // NOTE: we should enforce the token check here
        // respond to Slack that the webhook has been received.
        res.status(200);
        res.setHeader('Content-Type', 'application/json');

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
        const payload = JSON.parse(req.body.payload);
        
        const data = {
            "method": "album",
            "text": payload.value
        };
        const trackList = [];
        fetchData("/search", data)
            .then(tracks => {
                console.log(tracks);
                tracks.forEach(track => {
                    const minutes = utils.millisToMinutesAndSeconds(track.length);
                    trackList.push({text: `:musical_note: ${track.name} - ${minutes}`, value: `${track.name}::::${track.uri}`});
                });
                //const text = trackList.join("\n");
                res.send(JSON.stringify({options: trackList}));
            })


        
        // Now, pass the webhook into be processed
        //controller.handleWebhookPayload(req, res);

    });

}
