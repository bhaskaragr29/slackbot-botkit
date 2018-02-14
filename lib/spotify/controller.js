'use strict';

const SpotifyWebApi = require('spotify-web-api-node');

class SlackSpotifyController {
    
    constructor(slackClientId = 'dae670f26ff64a75ae55a1e28461f666', 
                slackClientSecret = 'dae670f26ff64a75ae55a1e28461f666') {
        this.slackClientId = slackClientId;
        this.slackClientSecret = slackClientSecret;
        this.api = new SpotifyWebApi({
            clientId : slackClientId,
            clientSecret : slackClientSecret,
            redirectUri : 'http://www.example.com/callback'
          });
    }

    setAccessToken(accessToken) {
        this.accessToken = accessToken;
    }

    getAccessToken() {
        this.api.clientCredentialsGrant() 
            .then(data => {
                console.log('The access token expires in ' + data.body['expires_in']);
                console.log('The access token is ' + data.body['access_token']);
                console.log('Data boddy', data.body);
                // Save the access token so that it's used in future calls
                spotifyApi.setAccessToken(data.body['access_token']);
            })
    }








}