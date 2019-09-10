// Pattern (sequential iterator), 遍历一个集合，对每一项执行一个异步操作
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
