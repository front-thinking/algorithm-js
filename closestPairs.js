/*
* 查找最近点的分析，分别是暴利检索和分治策略，具体文章参考https://github.com/front-thinking/blogs/issues/5
* */
/*
 * 原始粗暴方法
 */
function brutSerch (points) {
    var points = points || randomPoints(20);
    var bestDist = Infinity, result = {pointA: null, pointB: null, distance: Infinity}, n = points.length;
    for (var i=0; i < n; i++) {
        for (var j = i+1; j < n; j++) {
            var temp = getDistance(points[i], points[j]);
            if (temp < bestDist) {
                bestDist = temp;
                result = {
                    pointA: points[i],
                    pointB: points[j],
                    distance: temp
                };
            }
        }
    }
    return result;
}

/*
 * 分治策略
 */
function closestPairs (points) {
    var points = points || randomPoints(20);
    var pointsByX = mergeSort(points, 'x');
    var pointsByY = mergeSort(points, 'y');
    var result = findClosestPairs(pointsByX, pointsByY);
    console.log(result);
}

/*
 * 查找最近点对儿
 */
function findClosestPairs (psX, psY) {
    var l = psX.length;

    if ([0, 1].indexOf(l) !== -1) {
        return {
            pointA: null,
            pointB: null,
            distance: Infinity
        }
    }

    if (l === 2) {
        return {
            pointA: psX[0],
            pointB: psX[1],
            distance: getDistance(psX[0], psX[1])
        }
    }

    var midIndex = Math.floor (l/2);
    var leftHalfByX = psX.slice(0, midIndex);
    var rightHalfByX = psX.slice(midIndex, l);
    var leftHalfByY = mergeSort(psX.slice(0, midIndex), 'y');
    var rightHalfByY = mergeSort(psX.slice(midIndex, l), 'y');
    var leftBest = findClosestPairs(leftHalfByX, leftHalfByY);
    var rightBest = findClosestPairs(rightHalfByX, rightHalfByY);
    var minDist = Math.min(leftBest.distance, rightBest.distance);
    var splitBest = findSplitBest(psX, psY, minDist);
    return mergeSort([leftBest, rightBest, splitBest], 'distance')[0];
}

/*
 * 查找最近的点横跨一左一右的情况
 */
function findSplitBest (psX, psY, dist) {
    var l = psX.length, assPs = [], assPsIndex = 0;
    var midPoint = psX[Math.floor(l / 2)], find = false;

    for (var i = 0; i < l; i++) {
        if (Math.abs(psY[i].x - midPoint.x) < dist) {
            assPs[assPsIndex++] = psY[i];
        }
    }
    var t = 0;
    for (var j = 0; j < assPsIndex; j++) {
        for (var k = j + 1; k < assPsIndex && assPs[k].y - assPs[j].y < dist; k++) {
            console.log(t++);
            var splitDist = getDistance(assPs[k], assPs[j]);
            if (splitDist < dist) {
                find = {
                    pointA: assPs[k],
                    pointB: assPs[j],
                    distance: splitDist
                }
            }
        }
    }

    if (find) {
        return find;
    } else {
        return {
            pointA: null,
            pointB: null,
            distance: Infinity
        };
    }

}


/*
 * 两点间几何距离
 */
function getDistance (pointA, pointB) {
    return Math.pow(Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2), 0.5);
}


/*
 * 归并排序
 */
function mergeSort(arr, flag) {
    var n = arr.length, index = Math.floor(n/2), leftArr, rightArr;
    if (arr.length === 0 || arr.length === 1) {
        return arr;
    }
    leftArr = mergeSort(arr.slice(0, index), flag);
    rightArr = mergeSort(arr.slice(index, n), flag);
    return merge(leftArr,  rightArr, flag);
}

/*
 * 合并过程
 */
function merge (arrLeft, arrRight, flag) {
    var k = i = j = 0, ll = arrLeft.length, lr = arrRight.length, nl = ll + lr, res = [];
    while (i < ll && j < lr) {
        if (arrLeft[i][flag] > arrRight[j][flag]){
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

/*
 * 随机产生n位长度的坐标点数组
 */
function randomPoints (n) {
    var points = [], n = n || 20;
    for (var i = 0; i < n; i++) {
        x = +((Math.random()*20).toFixed(2));
        y = +((Math.random()*20).toFixed(2));
        points[i] = {x, y};
    }
    return points;
}
