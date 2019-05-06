/*
* A Readable streams, we can try to implement
* a stream that generates random strings
* */

"use strict";

const stream = require('stream');
const Chance = require('chance');

const chance = new Chance();

class RandomStream extends stream.Readable {
    constructor(options) {
        super(options);
    }

    _read(size) {
        const chunk = chance.string();
        console.log(`Pushing chunk of size: ${chunk.length}`);
        this.push(chunk, 'utf8');
        if(chance.bool({likelihood: 5})) {
            this.push(null); // end the stream by indicate an EOF situation.
        }
    }
}

module.exports = RandomStream;