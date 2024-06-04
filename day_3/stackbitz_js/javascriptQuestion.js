/* 1. find the most frequently occurring number  */
const findHighestFreq = (arr) => {
    // hashmap to store each frequency
    const frequencyMap = {};

    // counting frequency of each number, setting number as key and frequency as value
    arr.forEach((num) => {
        frequencyMap[num] = (frequencyMap[num] || 0) + 1;
    });

    let maxFreq = 0;
    let maxFreqNum = null;
    for (const num in frequencyMap) {
        if (frequencyMap[num] > maxFreq) {
            maxFreq = frequencyMap[num];
            maxFreqNum = num;
        }
    }

    return maxFreqNum;
};
/* test */
const arr1 = [..."317111"];
console.log("findHighestFreq: ", findHighestFreq(arr1)); // 4: has 4 of 1

/*
    2. get the absolute difference between two digonal |(1+5+9)-(3+5+9)| = 2
  */
const getDiffBetweenDigonal = (matrix) => {
    let firstDiagonalSum = 0;
    let secondDiagonalSum = 0;

    for (let i = 0; i < matrix.length; i++) {
        firstDiagonalSum += matrix[i][i];
        secondDiagonalSum += matrix[i][matrix.length - 1 - i];
    }

    return Math.abs(firstDiagonalSum - secondDiagonalSum);
};
// /* test */
const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [9, 8, 9],
];
console.log("getDiffBetweenDigonal: ", getDiffBetweenDigonal(matrix));

/* 3. Count the number of 3 as digit in all numbers from 0 to 50. */
const find3 = (start, end) => {
    let threeCount = 0;

    for (let i = start; i <= end; i++) {
        const numToStr = i.toString();
        for (const char of numToStr) {
            if (char === "3") {
                threeCount++;
            }
        }
    }

    return threeCount;
};
/* test */
console.log("find3: ", find3(0, 50)); // 15

/* 4. give a string “cvs health”, change it to “Cvs Health” */
const capitalFirstLetter = (str) => {
    let wordsArr = str.split(" ");
    let resultWord = "";

    for (let i = 0; i < wordsArr.length; i++) {
        if (i > 0) {
            resultWord += " ";
        }

        resultWord += wordsArr[i][0].toUpperCase() + wordsArr[i].substring(1);
    }

    return resultWord;
};
/* test */
const str2 = "cvs health";
console.log("capitalFirstLetter: ", capitalFirstLetter(str2));

/*
    5. give a str: wave
    Output: ["Wave", "wAve", "waVe", "wavE"]
  */
const capEachCharInStr = (str) => {
    const resultArr = [];

    for (let i = 0; i < str.length; i++) {
        const charArray = str.split("");
        charArray[i] = charArray[i].toUpperCase();
        resultArr.push(charArray.join(""));
    }

    return resultArr;
};
/* test */
const str3 = "wave";
console.log("capEachCharInStr: ", capEachCharInStr(str3));

/*
    6. give a string, only have (){}[], create a function check if the string is valid
  */
const isValid = (str) => {
    // empty stack to store opening brackEts
    const openingStack = [];
    const matchingBracket = {
        ")": "(",
        "}": "{",
        "]": "[",
    };

    for (const char of str) {
        if (char === "(" || char === "{" || char === "[") {
            openingStack.push(char);
        } else if (char === ")" || char === "}" || char === "]") {
            if (
                openingStack.length === 0 ||
                openingStack.pop() !== matchingBracket[char]
            ) {
                return false;
            }
        }
    }

    return openingStack.length === 0;
};
/* test */
console.log("isValid: ", isValid("()[{}{}]")); // true

/* 7. Fibonacci */
const fibonacci = (num) => {
    // for loop
    let prev1 = 0;
    let prev2 = 1;
    let fib = 0;

    if (num === 0) {
        return prev1;
    } else if (num === 1) {
        return prev2;
    }

    for (let i = 2; i <= num; i++) {
        fib = prev1 + prev2;
        prev1 = prev2;
        prev2 = fib;
    }

    return fib;
};
// const fibonacci = (num) => {
//     // recursion
//     if (num <= 1) {
//         return num;
//     }
//     return fibonacci(num - 1) + fibonacci(num - 2);
// };
/* test */
console.log("fibonacci: ", fibonacci(4));

/* 8. looking for most close 3 numbers to the target */
const givenArr = [45, 45, 32, 55, 16, 25, 74, 22, 13, 27, 41];
function findCloseNums(givenNum, givenArr, find) {
    if (givenArr.length === 0) {
        return [];
    }
    const newArray = givenArr.map((item) => {
        return {
            value: item,
            diff: Math.abs(item - givenNum),
        };
    });
    newArray.sort((a, b) => a.diff - b.diff || a.value - b.value); // Sorting by difference first, then by value
    return newArray.slice(0, find).map((item) => item.value);
}
console.log("findCloseNums: ", findCloseNums(30, givenArr, 3)); //[32, 27, 25];

/* 9. given the out string length, and how many char you have to use, create a function to generate the random string */
/*
    @param [number, number] N, K
    @return [string]
  */
function createRandomStr(N, K) {
    const charPool =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // characters pool
    let result = "";
    for (let i = 0; i < N; i++) {
        const randomIndex = Math.floor(Math.random() * K); // Generating a random index within the range of K
        result += charPool[randomIndex];
    }
    return result;
}
console.log("createRandomStr: ", createRandomStr(8, 3)); // acbaabca

/* 10. sort the array by the given sequence */
function sortBySeq(arr, sqs) {
    const sortedArr = [];
    for (let char of sqs) {
        for (let item of arr) {
            if (item === char) {
                sortedArr.push(item);
            }
        }
    }
    return sortedArr;
}
const sqs = "qwertyuiopasdfghjklzxcvbnm";
console.log("sortBySeq: ", sortBySeq([..."hello"], sqs)); // ["e", "o", "h", "l", "l"];
