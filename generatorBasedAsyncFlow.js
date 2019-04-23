/*
* 基于generator来控制异步操作的控制流
* */
const fs = require('fs');

asyncFlow(function*(callback) {
    const fileName = 'package.json';
    const myself = yield fs.readFile(fileName, 'utf8', callback);
    yield fs.writeFile(`clone_of_${fileName}`, myself, callback);
    console.log('Clone created');
});

/*
* 主要的控制权在callback这个函数，将其作为参数传递到generatorFunction,然后在generatorFunction里的每一个异步里调用callback来继续执行；
* */
function asyncFlow(generatorFunction) {
    function callback(err) {
        if(err) {
            return generator.throw(err);
        }
        const results = [].slice.call(arguments, 1);
        generator.next(results.length> 1 ? results : results[0]);
    }
    const generator = generatorFunction(callback);
    generator.next();
}

/*
* 主要的控制权依然是在callback这个函数，但是不再将其传递到generatorFunction里，而是拿到每一步generatorFunction返回的异步函数，然后执行。
* */
function asyncFlowWithThunks(generatorFunction) {
    function callback(err) {
        if(err) {
            return generator.throw(err);
        }
        const results = [].slice.call(arguments, 1);
        const thunk = generator.next(results.length> 1 ? results :
            results[0]).value;
        thunk && thunk(callback);
    }
    const generator = generatorFunction();
    const thunk = generator.next().value;
    thunk && thunk(callback);
}

/*
*  A Thunk function is something likes this
*  A thunk used in the generator-based control flow is just a function that
    partially applies all the arguments of the original function except its
    callback. The return value is another function that only accepts the
    callback as an argument. For example, the thunkified version of
    fs.readFile() would be as follows:
* */
function readFileThunk(filename, options) {
    return function(callback){
        fs.readFile(filename, options, callback);
    }
}

/*
* A asyc flow based on asyncFlowWithThunks demo.
* */
asyncFlowWithThunks(function* () {
    const fileName = path.basename(__filename);
    const myself = yield readFileThunk(__filename, 'utf8');
    yield writeFileThunk(`clone_of_${fileName}`, myself);
    console.log("Clone created");
});