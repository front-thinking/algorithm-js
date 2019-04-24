/*
* A TaskQueue class based on callBack Style or continuation-passing style (CPS)
* */

class TaskQueue {
    constructor(concurrency) {
        this.concurrency = concurrency;
        this.running = 0;
        this.queue = [];
    }

    pushTask(task) {
        this.queue.push(task);
        this.next();
    }

    next() {
        while (this.running < this.concurrency && this.queue.length) {
            const task = this.queue.shift();
            task(() => {
                this.running--;
                this.next();
            });
            this.running++;
        }
    }
};

/*
* A TaskQueue class based on Promise Style
* */

class TaskQueue {
    constructor(concurrency) {
        this.concurrency = concurrency;
        this.running = 0;
        this.queue = [];
    }

    pushTask(task) {
        this.queue.push(task);
        this.next();
    }

    next() {
        while (this.running < this.concurrency && this.queue.length) {
            const task = this.queue.shift();
            task().then(() => {
                this.running--;
                this.next();
            });
            this.running++;
        }
    }
};


/*
* A taskQueue based on generator which implement producer-consumer pattern.
* To understand this class, you need know generator\co\producer-consumer, etc.
* */
"use strict";

const co = require('co');

class TaskQueue {
    constructor(concurrency) {
        this.concurrency = concurrency;
        this.running = 0;
        this.taskQueue = [];
        this.consumerQueue = [];
        this.spawnWorkers(concurrency);
    }

    pushTask(task) {
        if (this.consumerQueue.length !== 0) {
            this.consumerQueue.shift()(null, task);
        } else {
            this.taskQueue.push(task);
        }
    }

    spawnWorkers(concurrency) {
        const self = this;
        for(let i = 0; i < concurrency; i++) {
            co(function* () {
                while(true) {
                    const task = yield self.nextTask();
                    yield task;
                }
            });
        }
    }

    nextTask() {
        return callback => {
            if(this.taskQueue.length !== 0) {
                return callback(null, this.taskQueue.shift());
            }

            this.consumerQueue.push(callback);
        }
    }
}

module.exports = TaskQueue;
