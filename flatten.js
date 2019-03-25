/*
* 数组扁平化flat(depth)
* 方法会递归到指定深度将所有子数组连接，
* 并返回一个新数组, depth指定嵌套数组中的结构深度，默认值为1，
* 不管多少层则可以用Infinity关键字作为参数
* 例子：[1, 2, [3]].flat(1) // [1, 2, 3]
* [1, 2, [3, [4]]].flat(2) // [1, 2, 3, 4]
* [1, 2, [3, [4, [5]]]].flat(Infinity) // [1, 2, 3, 4, 5]
* */

// reduce版本
function flatten1(arr) {
    return arr.reduce((a, b) => {
        // return Array.isArray(b) ? a.concat(flatten(b)) : a.concat(b);
        return a.concat(Array.isArray(b) ? flatten(b) : b);
    }, []);
};

/*
*
* 管你原来是几维，先来个二向箔：转成字符串，之后再复原成数组，
* 不过这个方法有个缺点，就是原来的空数组转的空字符串也会被放入新生成的数组里去。
* 所以如果不需要空串元素的话还需要对结果进行过滤操作。
*
* */
function flatten2(arr){
    let str = arr.toString()
    return str.split(',')
}