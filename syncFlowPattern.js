//case1:  Pattern (sequential iterator), 遍历一个集合，按顺序串行对每一项执行一个异步操作
function iterate(index) {
   if(index === tasks.length)  {
     return finish();
   }
   const task = tasks[index];
   task(function() {
     iterate(index + 1);
   });
}
 function finish() {
   //iteration completed
 }
 iterate(0);

iterateSeries(collection, iteratorCallback, finalCallback) // 可以封装为一个独立完整的方法



//case2:  遍历集合，并发执行异步操作
// Pattern (unlimited parallel execution)
// Run a set of asynchronous tasks in parallel by spawning them all at once, and then wait for all of them to complete by counting the number of times their callbacks are invoked.
const tasks = [ /* ... */ ];

let completed = 0;

tasks.forEach(task => {
  task(() => {
    if(++completed === tasks.length) {
      finish();
    }
   }); 
});

function finish() {
  //all the tasks completed
}


//case3:  带并发限制的异步集合遍历操作
const tasks = ...
let concurrency = 2, running = 0, completed = 0, index = 0;
function next() {
  while(running < concurrency && index < tasks.length) {
    task = tasks[index++];
    task(() => {
      if(completed === tasks.length) {
        return finish();
      }
      completed++, running--;
      next();
   });
   running++; 
  }
} 

next();

function finish() {
  //all tasks finished
}


//case4: 带有异步并发限制的任务调度器
// 参考./TaskQueue.js


//case5: 顺序执行异步，基于promise
let tasks = [ /* ... */ ]
let promise = Promise.resolve();
tasks.forEach(task => {
    promise = promise.then(() => {
        return task();
    }); });
promise.then(() => {
    //All tasks completed
});

//case6: 顺序执行异步，基于promise和reduce方法
let tasks = [ /* ... */ ]
let promise = tasks.reduce((prev, task) => {
    return prev.then(() => {
        return task();
    });
}, Promise.resolve());
promise.then(() => {
    //All tasks completed
});
