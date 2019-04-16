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