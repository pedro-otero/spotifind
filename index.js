"use strict";

const Queue = require('./src/queue');
const tunefindjs = require('tunefindjs');
const findSongs = require('./src/find-songs');

class Spotifind {
    constructor(user, pass) {
        tunefindjs.login(user, pass);
        this.queue = new Queue(tunefindjs);
    }

    findFeaturings(spotifyTrack) {
        return findSongs(spotifyTrack, this.queue)
            .then(function (results) {
                return results.reduce(function (accum, current) {
                    accum.movies = accum.movies.concat(current.movies);
                    accum.shows = accum.shows.concat(current.shows);
                    return accum;
                }, {movies: [], shows: []});
            });
    }
}

module.exports = Spotifind;