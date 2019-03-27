/*
* 关于JS中this的指针问题
* */
var obj = {
    name: 'hello',
    name2: this.name,
    say: function() {
        setTimeout(function() {console.log('test:', this.name);}, 0);
    },
    say2: function() { setTimeout(()=>console.log(this.name), 0);}
}

obj.name; // hello
boj.name2; // '', 这里打印的是window的name，window.name默认为空字符。如果不是name的话，多半打印出来undefined
obj.say(); // '',与上面的情况一样，打印的是window.name。
obj.say2(); // 'hello', 这里用的是箭头函数，打印的是obj的name。