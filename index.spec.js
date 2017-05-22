"use strict";

const apiKeys = require('./api-keys.json');
const Spotifind = require('./index');
const spotifind = new Spotifind(apiKeys.user, apiKeys.pass);
const tests = require('./spec/test-tracks.json');

const test = setup => {
    it(`: ${setup.track.name} - ${setup.track.artists.map(artist => artist.name).join(', ')}`, function (done) {
        spotifind.findFeaturings(setup.track).then(function (results) {
            if (!setup.result) expect(results).toBeFalsy();
            expect(results.movies.length).toEqual(setup.result.movies.length);
            expect(results.shows.length).toEqual(setup.result.shows.length);
            results.movies.forEach((movie, i) => {
                var expectedMovie = setup.result.movies[i];
                expect(movie.id).toEqual(expectedMovie.id);
            });
            results.shows.forEach((show, i) => {
                var expectedShow = setup.result.shows[i];
                expect(show.id).toEqual(expectedShow.id);
                expect(show.number).toEqual(expectedShow.number);
                expect(show.episode_id).toEqual(expectedShow.episode_id);
            });
            done();
        });
    });
}

describe('Spotifind', function () {

    describe('Finds songs in tunefind from a Spotify track', function () {

        tests.forEach(test);

    });
});