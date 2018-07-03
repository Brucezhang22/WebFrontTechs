function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

var arr = [3, 2, 5, 1, 7, 56, 32, 45, 14];

//bubble sort
(function () {
    function bubbleSort(arr) {
        for (var j = 1; j < arr.length; j++) {
            for (var i = 0; i < arr.length - j; i++) {
                if (arr[i] > arr[i + 1]) {
                    swap(arr, i, i + 1);
                }
            }
        }
        return arr;
    }
})();

//cocktail sort
(function () {
    function cocktailSort(arr) {
        var left = 0;
        var right = arr.length - 1;
        while (left < right) {
            for (var i = left; i < right; i++) {
                if (arr[i] > arr[i + 1]) {
                    swap(arr, i, i + 1);
                }
            }
            right--;
            for (var i = right; i > left; i--) {
                if (arr[i - 1] > arr[i]) {
                    swap(arr, i - 1, i);
                }
            }
            left++;
        }
    }
})();

//select sort
(function () {
    function selectSort(arr) {
        for (var i = 0; i < arr.length; i++) {
            var minIndex = i;
            for (var j = i; j < arr.length; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            if (i !== minIndex) {
                swap(arr, i, minIndex);
            }
        }
    }
    // selectSort(arr);
    // console.log(arr);
})();

//insert sort
(function () {
    function insertSort(arr) {
        var newArr = [arr[0]];
        for (var i = 1; i < arr.length; i++) {
            var selected = arr[i];
            if (selected <= newArr[0]) {
                newArr.unshift(selected);
            } else if (selected >= newArr[newArr.length - 1]) {
                newArr.push(selected);
            } else {
                for (var j = 0; j < newArr.length; j++) {
                    if (selected >= newArr[j] && selected <= newArr[j + 1]) {
                        newArr.splice(j + 1, 0, selected);
                        break;
                    }
                }
            }
        }
        return newArr;
    }
})();