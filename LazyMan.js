class C {

    constructor (name) {
        this.name = name;
        this.tasks = [];
        var self = this;
        this.tasks.push(function() {
            console.log('Hi, this is ' + self.name);
            self.next();
        });
        setTimeout(()=>this.next(), 0);

    }

    next () {
        let fn = this.tasks.shift();
        fn && fn();
    }

    eat (sm) {
        var self = this;
        let fn = function () {
            setTimeout(function () {
                console.log('Eat ' + sm);
            }, 0);

            self.next();
        };
        this.tasks.push(fn);
        return this;
    }


    sleep (t) {
        var self = this;
        let fn = function () {
            setTimeout(function () {
                console.log('Sleep ' + t + ' seconds...');

                self.next();
            }, t*1000);
        };
        this.tasks.push(fn);
        return this;
    }

    sleepFirst (t) {
        var self = this;
        let fn = function () {
            setTimeout(function () {
                console.log('First Sleep ' + t + ' seconds...');
                self.next();
            }, t*1000);

        };
        this.tasks.unshift(fn);
        return this;
    }

}

const LazyMan = function(name) {
    return new C(name);
}
