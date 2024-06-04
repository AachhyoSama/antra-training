let numbers = [11, 22, 33, 44, 55, 66, 77, 88, 99, 110];

// custom filter
Array.prototype.myFilter = function (callback, thisArg) {
    let result = [];
    for (let i = 0; i < this.length; i++) {
        if (callback.call(thisArg, this[i], i, this)) {
            result.push(this[i]);
        }
    }
    return result;
};

let filterCallback = function (currentValue, index, array) {
    return currentValue % 2 === 0;
};

let filteredCustom = numbers.myFilter(filterCallback);
console.log("Custom filter (even numbers):", filteredCustom);

// map
// custom map
Array.prototype.myMap = function (callback, thisArg) {
    let result = [];
    for (let i = 0; i < this.length; i++) {
        result.push(callback.call(thisArg, this[i], i, this));
    }
    return result;
};

let mapCallback = function (currentValue, index, array) {
    return currentValue * currentValue; // square each number
};

let mappedCustom = numbers.myMap(mapCallback);
console.log("Custom map (squared):", mappedCustom);

// includes
// custom includes
Array.prototype.myIncludes = function (element, start = 0) {
    for (let i = start; i < this.length; i++) {
        if (this[i] === element) {
            return true;
        }
    }
    return false;
};

console.log("Custom includes:", numbers.myIncludes(55)); // check for 55
console.log("Custom includes:", numbers.myIncludes(55, 6)); // check for 55 starting from index 6

// indexOf
// custom indexOf
Array.prototype.myIndexOf = function (element, start = 0) {
    for (let i = start; i < this.length; i++) {
        if (this[i] === element) {
            return i;
        }
    }
    return -1;
};

console.log("Custom indexOf:", numbers.myIndexOf(77)); // find index of 77
console.log("Custom indexOf:", numbers.myIndexOf(77, 8)); // find index of 77 starting from index 8
console.log("Custom indexOf:", numbers.myIndexOf(110, -2)); // find index of 110 starting from -2

// reduce
// custom reduce
Array.prototype.myReduce = function (callback, initialValue) {
    let accumulator = initialValue !== undefined ? initialValue : this[0];
    for (let i = initialValue !== undefined ? 0 : 1; i < this.length; i++) {
        accumulator = callback(accumulator, this[i], i, this);
    }
    return accumulator;
};

let reduceCallback = function (total, currentValue) {
    return total * currentValue; // multiply all elements
};

let reducedCustom1 = numbers.myReduce(reduceCallback, 1);
console.log("Custom reduce (product):", reducedCustom1);

let reducedCustom2 = numbers.myReduce(reduceCallback, 100);
console.log(
    "Custom reduce with initial value (product starting with 100):",
    reducedCustom2
);

// custom slice
Array.prototype.mySlice = function (start = 0, end = this.length) {
    let result = [];
    start = start < 0 ? this.length + start : start;
    end = end < 0 ? this.length + end : end;
    for (let i = start; i < end; i++) {
        result.push(this[i]);
    }
    return result;
};

console.log("Custom slice:", numbers.mySlice(4, 8)); // slice from index 4 to 8
console.log("Custom slice with negative indices:", numbers.mySlice(-6, -3)); // slice from -6 to -3

// custom splice
Array.prototype.mySplice = function (start, delCount, ...items) {
    let deletedItems = [];
    start = start < 0 ? this.length + start : start;
    delCount = delCount < 0 ? 0 : delCount;

    for (let i = 0; i < delCount; i++) {
        deletedItems.push(this[start + i]);
    }

    let temp = [
        ...this.slice(0, start),
        ...items,
        ...this.slice(start + delCount),
    ];
    for (let i = 0; i < temp.length; i++) {
        this[i] = temp[i];
    }
    this.length = temp.length;

    return deletedItems;
};

let numbersCopy4 = [...numbers];
console.log("Custom splice (delete):", numbersCopy4.mySplice(2, 4)); // delete 4 elements starting from index 2
console.log("After custom splice (delete):", numbersCopy4);

let numbersCopy5 = [...numbers];
console.log(
    "Custom splice with negative index (delete):",
    numbersCopy5.mySplice(-5, 3)
); // delete 3 elements starting from -5
console.log("After custom splice with negative index (delete):", numbersCopy5);

let numbersCopy6 = [...numbers];
console.log(
    "Custom splice with replacement:",
    numbersCopy6.mySplice(2, 3, 101, 102)
); // replace 3 elements starting from index 2 with 101, 102
console.log("After custom splice with replacement:", numbersCopy6);
