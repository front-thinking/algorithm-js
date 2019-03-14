/*
 * 归并排序，具体分析可以参考https://github.com/front-thinking/blogs/issues/2
 */
function mergeSort(arr) {
    var n = arr.length, index = Math.floor(n/2), leftArr, rightArr;
    if (arr.length === 0 || arr.length === 1) {
        return arr;
    }
    leftArr = mergeSort(arr.slice(0, index));
    rightArr = mergeSort(arr.slice(index, n));
    return merge(leftArr,  rightArr);
}

/*
 * 合并过程
 */
function merge (arrLeft, arrRight) {
    var k = i = j = 0, ll = arrLeft.length, lr = arrRight.length, nl = ll + lr, res = [];
    while (i < ll && j < lr) {
        if (arrLeft[i] > arrRight[j]){
            res[k++] = arrRight[j++];
        } else {
            res[k++] = arrLeft[i++];
        }
    }
    if (i >= ll) {
        while (k < nl) {
            res[k++] = arrRight[j++];
        }
    } else  if (j >= lr) {
        while (k < nl) {
            res[k++] = arrLeft[i++];
        }
    }


    return res;
}
