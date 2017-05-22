"use strict";

const findSongs = require('./find-songs.js');
const queue = {
    getArtist: function (id) {
        let artists = {
            "some-artist": {
                songs: [
                    {
                        name: 'some song',
                        movies: [{
                            name: 'some movie'
                        }]
                    }
                ]
            }
        };
        if (id in artists) {
            return Promise.resolve({statusCode: 200, body: artists[id]});
        } else {
            return Promise.resolve({statusCode: 404});
        }
    }
}

function failure() {
    expect(true).toBeFalse();
    done();
}

describe("Find songs", function () {

    it("returns matched songs", function (done) {
        let spotifyTrack = {
            uri: '',
            name: 'some song',
            artists: [{name: 'some artist'}]
        };
        findSongs(spotifyTrack, queue).then(result => {
            expect(result.length).toBeTruthy();
            result.forEach(song => expect(song.name).toEqual('some song'));
            done();
        }, failure);
    });

    it("returns empty array when artist is not found", function (done) {
        let spotifyTrack = {
            uri: '',
            name: 'some track not found',
            artists: [{name: 'some artist not found'}]
        };
        findSongs(spotifyTrack, queue).then(result => {
            expect(result.length).toBeFalsy();
            done();
        }, failure);
    });

    it("returns empty array when track is not found", function (done) {
        let spotifyTrack = {
            uri: '',
            name: 'some track not found',
            artists: [{name: 'some artist'}]
        };
        findSongs(spotifyTrack, queue).then(result => {
            expect(result.length).toBeFalsy();
            done();
        }, failure);
    });
});