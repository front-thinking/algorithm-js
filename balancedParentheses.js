/*
* 平衡圆括号问题
* 概念: {(()())}是平衡的，([]{}()})是不平衡的
* 原理：从左向右查找时，第一个遇到的右括号，一定与它左侧最近的左括号匹配。
* 同样，最后一个右括号，一定与第一个左括号相匹配。
* 很像入栈出栈操作
* */

var match = function(open, close) {
    var opens = '([{',
        closes = ')]}';

    return opens.indexOf(open) === closes.indexOf(close);
};

var balancedParentheses = function(symbols) {
    var stack = new Stack(),
        balanced = true,
        index = 0,
        len = symbols.length,
        symbol, top;

    while (index < len && balanced) {
        symbol = symbols[index];

        if (symbol === '(' || symbol === '[' || symbol === '{') {
            stack.push(symbol);
        } else {
            if (stack.isEmpty()) {
                balanced = false;
            } else {
                top = stack.pop();
                if (!match(top, symbol)) {
                    balanced = false;
                }
            }
        }
        index++;
    }

    if (balanced && stack.isEmpty()) {
        return true;
    }
    return false;
};


/*
* 附：堆的类
* */
function Stack() {

    var items = [];

    // 添加一个元素到栈顶
    this.push = function(element){
        items.push(element);
    };

    // 移除栈顶的元素并返回
    this.pop = function(){
        return items.pop();
    };

    // 返回栈顶的元素，不对栈进行修改
    this.peek = function(){
        return items[items.length-1];
    };

    // 栈是否为空
    this.isEmpty = function(){
        return items.length == 0;
    };

    // 返回栈的元素个数
    this.size = function(){
        return items.length;
    };

    // 清空栈
    this.clear = function(){
        items = [];
    };

    // 打印栈
    this.print = function(){
        console.log(items.toString());
    };

    // 返回栈的字符串表示
    this.toString = function(){
        return items.toString();
    };
}