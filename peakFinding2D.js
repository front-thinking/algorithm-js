/*
* 查找峰值，二维数组的情况下。定义峰值a[i, j]，满足a[i][j]>=a[i-1][j], a[i][j]>=a[i+1][j], a[i][j]>=a[i][j-1], a[i][j] >= a[i][j+1].
* */

/*
* 1、二分查找，复杂度O(nlogn)
* start, end是查找的起止列数
* */
function peakFinding2D (arr, start, end) {
    var l = arr.length, columns = end - start + 1, mid = Math.floor(columns/2);

    var j = findMaxIndex(arr, mid); // 先找到第mid列的最大值

    if (arr[j][mid] < arr[j][mid + 1] && mid + 1 <= l) {
        return peakFinding2D(arr, start + 1, end);
    }

    if (arr[j][mid] < arr[j][mid-1] && mid - 1 >= 0) {
        return peakFinding2D(arr, start, end-1);
    }

    return {
        row: j,
        column: mid
    }


}

/*
* 辅助函数，查找二维数组中某一列的最大值
* */
function findMaxIndex (arr, k) {
    var l = arr.length, index = 0, max = arr[k][index];
    for (var i = 0; i < l; i++) {
        if (arr[k][i] > max) {
            max = arr[k][i];
            index = i;
        }
    }
    return index;
}


function get2DArr(n) {
    var n = n || 20000, i = j = 0, arr = [];
    while(i < n) {
        arr[i] = [];
        while (j < n) {
            arr[i][j] = Math.floor(Math.random()*100);
            j++;
        }
        i++;
        j = 0;
    }
    return arr;
}
