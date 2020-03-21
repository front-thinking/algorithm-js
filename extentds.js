// 两个关键点：1 原型链的处理， 2构造函数的指向
// 第8行得到的结果是d.prototype = {__proto__ :__.prototype, d.constructor = d}，即改变了原型链，也保留了构造函数的指向

var __extends = this.__extends || function (d, b) {
  for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; 
  function __() { this.constructor = d; }
  __.prototype = b.prototype;
  d.prototype = new __();
};
