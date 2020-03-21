// 模拟JS中的instance of，判断某个对象是否是另一个对象的实例。

function instance_of(V, F) {
  var O = F.prototype;
  V = V.__proto__;
  while (true) {
    if (V === null)
      return false;
    if (O === V)
      return true;
    V = V.__proto__;
  }
}
