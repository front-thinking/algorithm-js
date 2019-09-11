// 定义一个异步的触发运算，使得可以按照传回调或者then的方法同时支持调用
// 如：

// callback oriented usage
asyncDivision(10, 2, (error, result) => {
    if (error) {
        return console.error(error);
    }
    console.log(result);
});
// promise oriented usage
asyncDivision(22, 11)
    .then(result => console.log(result))
    .catch(error => console.error(error));


module.exports = function asyncDivision(dividend, divisor, cb) {
    return new Promise((resolve, reject) => {
        process.nextTick(() => {
            const result = dividend / divisor;
            if (isNaN(result) || !Number.isFinite(result)) {
                const error = new Error('Invalid operands');
                if (cb) {
                    cb(error);
                }
                return reject(error);
            }
            if (cb) {
                cb(null, result);
            }
            resolve(result);
        });
    });
};