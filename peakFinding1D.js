/*
* 查找峰值，一位数组的情况下。定义峰值a[i]，满足a[i]>a[i-1], a[i]>a[i+1].
* */

/*
* 1、二分查找，复杂度O(logn)
* */
function peakFinding1D (arr) {
    var l = arr.length, mid = Math.floor(l/2);

    switch (true) {
        case l === 1:
            return arr[0];
            break;
        case l === 2:
            return arr[0] > arr[1] ? arr[0] : arr[1];
            break;
        default:
            break;
    }

    if (arr[mid] < arr[mid + 1]) {
        return peakFinding1D(arr.slice(mid, l));
    }
    if (arr[mid] < arr[mid - 1]) {
        return peakFinding1D(arr.slice(0, mid))
    }
    return arr[mid];
}


/*
* 2、原始暴利检索
* */
function peakFinding1DBrutSearch (arr) {
    var l = arr.length;
    if (l === 1) {
        return arr[0];
    }
    for (var i = 0; i < l; i++) {
        if (i === 0 && arr[i] > arr[i+1]) {
            return arr[i];
        }
        if (i === l - 1 && arr[i] > arr[i-1]) {
            return arr[i];
        }
        if (arr[i] > arr[i-1] && arr[i] > arr[i+1]) {
            return arr[i];
        }
    }
}


function getArr(n) {
    var n = n || 20000, i = 0, arr = [];
    while(i < n) {
        arr[i++] = Math.floor(Math.random()*100);
    }
    return arr;
}
