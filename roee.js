// ========== roee.js ===============
/*
* A read-only event emitter
* */
const EventEmitter = require('events');
module.exports = class Roee extends EventEmitter {
    constructor(executor) {
        super();
        const emit = this.emit.bind(this);
        this.emit = undefined;
        executor(emit);
    }
};

// ========= ticker.js ==============
/*
* A time tick based on roee.js
* */
const Roee = require('./roee');
const ticker = new Roee((emit) => {
    let tickCount = 0;
    setInterval(() => emit('tick', tickCount++), 1000);
});
module.exports = ticker;


// ========= ticker usage =============
const ticker = require('./ticker');
ticker.on('tick', (tickCount) => console.log(tickCount, 'TICK'));
// ticker.emit('something', {}); <-- This will fail