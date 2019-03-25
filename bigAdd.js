/*
* 两个最大数的加法
* */
var bigAdd = function (a, b) {
    var al = a.length, bl = b.length, temp = '', sign = false, res = '';
    var l = Math.max(al, bl);
    if (al < bl) {
        a = paddingLeft(a, bl - al);
    } else {
        b = paddingLeft(b, al - bl);
    }
    for(var i=l-1; i>=0; i--) {
        temp = (+a[i]) + (+b[i]);
        if (sign){
            temp += 1;
            sign = false;
        }
        if (temp > 9) {
            temp = temp - 10;
            sign = true;
        }

        res = temp + res;

    }

    if (sign) {
        res = '1' + res;
    }
    return res;
};

var paddingLeft =  function (str, l) {
    for (var i=0; i<l; i++) {
        str = '0' + str;
    }
    return str;
};