const Queue = require('./queue');
const tunefind = require('tunefindjs');
const apiKeys = require('../api-keys.json');
tunefind.login(apiKeys.user, apiKeys.pass);
const queue = new Queue(tunefind);

function failure() {
    expect(false).toBeTrue();
    done();
}

describe('Queue', function () {
    describe("doesn't let user run into 429 errors", function () {

        it("when retrieving artists by id", function (done) {
            Promise.all([
                queue.getArtist('lady-gaga'), queue.getArtist('chk-chik-chick'), queue.getArtist('elsie')
            ]).then(function (responses) {
                expect(responses.length).toEqual(3);
                responses.forEach(response => expect(response.statusCode).toEqual(200));
                responses.forEach(response => expect(response.body.songs).toBeDefined());
                done();
            }, failure);
        });

        it("when retrieving all artists", function (done) {
            Promise.all([
                queue.getArtists(0, 1), queue.getArtists(1, 1), queue.getArtists(2, 1)
            ]).then(function (responses) {
                expect(responses.length).toEqual(3);
                responses.forEach(response => expect(response.statusCode).toEqual(200));
                responses.forEach(response => expect(response.body.artists.length).toEqual(1));
                done();
            }, failure);
        });
    });
});