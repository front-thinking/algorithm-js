// the revealing module pattern
// 通过闭包和自执行函数，形成模块
const module = (() => {
  const privateFoo = () => {...};
  const privateBar = [];
  const exported = {
    publicFoo: () => {...},
    publicBar: () => {...}
  };
  return exported;
})();
console.log(module);

