'use strict';

const fetch = require('node-fetch');

const millisToMinutesAndSeconds = millis => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

const compileTrackList = tracks => {
    const filteredTracks = [];
    tracks.forEach(track => {
        filteredTracks.push(":musical_note: "+ track.name + " - "+millisToMinutesAndSeconds(track.length));
    });
    return filteredTracks;
}

const fetchData = (method, route, data) => {
    let url = "http://localhost:4200" + route;
    let options = {
        method: method,
        headers: {
            "Content-Type": "application/json"
        }
    };
    if(method === 'POST') {
        options.body = JSON.stringify(data)
    }

    return fetch(url,options).then(res => res.json())
        .catch(e => console.log(e))
}

module.exports = {
    millisToMinutesAndSeconds,
    compileTrackList,
    fetchData
}