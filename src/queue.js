"use strict";

const throttledqueue = require('throttled-queue');
const config = require('./../config/queue.json');
const throttle = throttledqueue(config.n, config.t);

function addToQueue(client, functionName, functionArguments) {
    return new Promise(function (resolve, reject) {
        throttle(function () {
            client[functionName].apply(null, functionArguments).then(resolve, reject);
        });
    });
}

class Queue {

    constructor(tunefind) {
        this.client = tunefind;
    }

    getArtists() {
        return addToQueue(this.client, 'getArtists', arguments);
    }

    getArtist() {
        return addToQueue(this.client, 'getArtist', arguments);
    }
}

module.exports = Queue;