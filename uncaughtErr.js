const fs = require('fs');

function readJSONThrows(filename, callback) {
  fs.readFile(filename, 'utf8', (err, data) => {
    if(err) {
      return callback(err);
    }
    //no errors, propagate just the data
    callback(null, JSON.parse(data));
  });
}

try {
  readJSONThrows('noValideJSON.html', err => {
    console.log(123);
    console.log(err);
  });
} catch (err) {
  console.log('try catch: ', err);
}

// 回答打印出来什么内容，为什么？

// 涉及到Event Loop执行机制，简单