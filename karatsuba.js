/*
* 大正整数乘法，具体分析可以参考文章https://github.com/front-thinking/blogs/issues/3
* */
function karatsuba (x, y) {
    var x = x + '', y = y + '';
    var n = x.length, a, b, c, d, p, q, i = Math.pow(10, n/2), a1, b1, c1;
    if (n === 1) {
        return +x * +y;
    } else {
        a = Math.floor(+x/i), b = +x%i, c = Math.floor(+y/i), d = +y%i, p = a + b, q = c + d;
        a1 = karatsuba(a, c), b1 = karatsuba(b,d), c1 = karatsuba(p,q);
        return Math.pow(10, n)*a1 + i * (c1 - a1 -b1) + b1;
    }
}
