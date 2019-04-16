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
