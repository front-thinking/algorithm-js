/*
* 判断数组中是否含有坐标点的值跟坐标index相同的元素，即A[i]=i。复杂度为O(logn)
* 原题目：You are given a sorted (from smallest to largest) array
        A of n distinct integers which can be positive, negative, or zero. You
        want to decide whether or not there is an index i such that A[i] = i.
        Design the fastest algorithm you can for solving this problem
* */
function findeIndexedPoint (arr, start) {
    var start = start || 0;
    var l = arr.length;
    var mid = Math.floor(l/2);
    if (l === 1) {
        if (arr[0] === start) {
            console.log(arr[0] + " : " + start);
            return true;
        } else {
            return false;
        }
    }
    var leftHas = findeIndexedPoint(arr.slice(0, mid), start);
    var rightHas = findeIndexedPoint(arr.slice(mid, l), mid + start);
    if (leftHas || rightHas) {
        return true;
    } else {
        return false;
    }
}


/*
* 算法说明：使用二分归并查找，并传入padding值
* */
