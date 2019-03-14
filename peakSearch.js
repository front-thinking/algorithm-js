/*
* 查找峰值，即给定数组先从小到大递增排列到峰值，然后又从峰值开始从大到小递减排列，目标算法复杂度为O(logn)
* */
function peakSearch (arr) {
    var l = arr.length, mid = Math.floor(l/2);
    if (1 === l) {
        return arr[0];
    }
    var leftPeak = peakSearch(arr.slice(0, mid));
    var rightPeak = peakSearch(arr.slice(mid, l));
    return leftPeak > rightPeak ? leftPeak : rightPeak;
}
