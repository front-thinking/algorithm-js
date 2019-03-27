/*
* 关于promise\setTimeout执行流的问题
* 参考文章：https://www.tuicool.com/articles/MnY7N3a
*         https://zhuanlan.zhihu.com/p/33058983
* 原则：1、Promise的构造函数是同步执行的；
*      2、setTimeout是异步执行，放在macrotask宏任务当中的；
*      3、promise.then()是异步执行，放在microtask微任务当中的；
*      4、主执行栈执行完以后，执行微任务当中的，最后执行宏任务当中的。
*
* */

var q = new Promise(function (resolve) {
    console.log(1);
    return resolve(1);
    console.log(2);
});

setTimeout(()=>{
    console.log(3);
});

q.then(function (res) {
    console.log(res);
    return 4;
}).then(function (res) {
    console.log(5);
    console.log(res);
});

console.log(6);