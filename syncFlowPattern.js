// Pattern (sequential iterator), 遍历一个集合，按顺序串行对每一项执行一个异步操作
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



// 遍历集合，并发执行异步操作
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
