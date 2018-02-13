'use strict';

const SLACK_SOCKET_SERVER = 'http://localhost:4200';
const fetch = require('node-fetch');

class SlackSockerServerAPI { 
    constructor() {
        this.server_url =  SLACK_SOCKET_SERVER;
    }

    buildAPICall(url, method = 'POST', data) {
        return fetch(server_url+url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
            .then(data => {
                console.log(data);
            })
            .then(()=>console.log('updated!!!'))
    }
    
}