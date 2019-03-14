/*
* 查找逆序对儿，具体分析可以参考文章https://github.com/front-thinking/blogs/issues/4
* */
function inversionsCount (arr) {

    let l = arr.length, i = Math.floor(l/2);

    if ( [0, 1].indexOf(l) !== -1) {
        return {
            arr: arr,
            cts: 0
        };
    } else {
        let lfObj = inversionsCount(arr.slice(0, i));
        let rtObj = inversionsCount(arr.slice(i, l));
        let mdObj = mergeSplitCount(lfObj.arr, rtObj.arr);
        return {
            arr: mdObj.arr,
            cts: lfObj.cts + rtObj.cts + mdObj.cts
        }
    }

}


function mergeSplitCount (arrLeft, arrRight) {
    var ll = arrLeft.length, lr = arrRight.length, cts = 0, i = j = k = 0, resArr = [];

    while (i < ll && j < lr) {
        if (arrLeft[i] < arrRight[j]) {
            resArr[k] = arrLeft[i];
            k++;
            i++;
        } else {
            resArr[k] = arrRight[j];
            k++;
            j++;
            cts += ll - i;
        }
    }

    while (k < ll + lr) {
        if (i >= ll) {
            resArr[k] = arrRight[j];
            k++;
            j++;
        } else {
            resArr[k] = arrLeft[i];
            i++;
            k++;
        }
    }

    return {
        arr: resArr,
        cts: cts
    }

}
