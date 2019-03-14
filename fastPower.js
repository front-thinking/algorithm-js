/*
* 快速n方计算
* */
function fastPower (a, b) {
    var c, temp;
    if (b === 1) {
        return a;
    } else {
        c = b * b;
        temp = fastPower(c, Math.floor(b/2))
    }
    if ( b % 2 === 1){
        return a * temp;
    } else {
        return temp;
    }
}
