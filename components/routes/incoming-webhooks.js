'use strict';

const debug = require('debug')('slackbotkit:incoming_webhooks');
const fetch = require('node-fetch');
const utils = require('../../utils/helper');


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
            "method": "any",
            "text": payload.value
        };
        const trackList = [];
        fetchData("/search", data)
            .then(tracks => {
                tracks.forEach(track => {
                    const minutes = utils.millisToMinutesAndSeconds(track.length);
                    debug(track);
                    const value = `${track.name}::::${track.uri}::::${track.length}::::${track.track_no}`;
                    trackList.push({text: `:musical_note: ${track.name} - ${minutes}`, value: value});
                });
                //const text = trackList.join("\n");
                res.send(JSON.stringify({options: trackList}));
            })


        
        // Now, pass the webhook into be processed
        //controller.handleWebhookPayload(req, res);

    });

}
