"use strict";

const inferId = require('./infer-id');

module.exports = function (spotifyTrack, queue) {
    return Promise.all(
        spotifyTrack.artists.map(
                artist => queue.getArtist(inferId(artist.name)).then(response => response, err => err)))
        .then(function (artists) {
            let matches = artists.filter(response => response.statusCode == 200)
                .map(artist => artist.body.songs.filter(
                        song => song.name.toUpperCase() == spotifyTrack.name.toUpperCase()));
            return matches.length ? matches.reduce((prev, curr) => prev.concat(curr)) : matches;
        });
}