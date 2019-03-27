/*
* 查找连续的子数组中和最大的子数组之和
* 思路：贪心算法：如果当前和加上新的item后的和反而不如item的大，那么放弃前面的和，重新开始计算当前和
* */
function findGreatestSumSubArray(arr) {
    let curSum = maxSum = arr[0];
    for (let i=1; i<arr.length; i++){
        curSum += arr[i];
        if(curSum < arr[i]){
            curSum = arr[i];
        }
        if(curSum > maxSum){
            maxSum = curSum;
        }
    }
    return maxSum;
}