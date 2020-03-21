//写一个类Person，拥有属性age和name，拥有方法say(something)
//再写一个类Superman，继承Person，拥有自己的属性power，拥有自己的方法fly(height)
// 要求使用es5的写法

function Person (age, name) {
  this.age = age;
  this.name = name;
  this.say = function (smt) {
    console.log('I am a person, I can say something, ' + smt);
  }
}

var Superman = (function(_super){
  _extends(Superman, Person);
  function Superman(age, name, power, ht) {
    _super.call(this, age, name);
    this.power = power;
    this.ht = ht;
    this.fly = () {console.log('I can fly ', ht, ' high.');}
  }
}) (Person);

var __extends = this.__extends || function (d, b) {
  for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; 
  function __() { this.constructor = d; }
  __.prototype = b.prototype;
  d.prototype = new __();
};
