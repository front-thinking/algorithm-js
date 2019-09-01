/**
* 实现类似于Vue中的nextTick方法，满足：
 * 1、同一事件循环周期(同一个主任务执行期间)多次调用nextTick，只启动一次异步执行的微任务；
 * 2、调用nextTick自动启动微任务。
* */

const callbacks = [];
let pending = false;

function flushCallbacks() {
  pending = false;
  const copies = callbacks.slice(0);
  callbacks.length = 0;
  for (let i = 0; i< copies.length; i++) {
    copies[i]();
  }
}

let microTimeFunc;
const p = Promise.resolve();
microTimeFunc = () => {
  p.then(flushCallbacks);
};

export function nextTick(cb, ctx) {
  callbacks.push(() => {
    if (cb) {
      cb.call(ctx);
    }
  });

  if(!pending) {
    pending = true;
    microTimeFunc();
  }
}