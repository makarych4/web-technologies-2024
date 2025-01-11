// Задание 1

function pickPropArray(objectsArray, propertyName) {
    let resultArray = [];
    for (let i = 0; i < objectsArray.length; i++) {
        let currentObject = objectsArray[i];
        if (currentObject.hasOwnProperty(propertyName)) {
            resultArray.push(currentObject[propertyName]);
        }
    }

    return resultArray;
}

const students = [
    { name: 'Павел', age: 20 },
    { name: 'Иван', age: 20 },
    { name: 'Эдем', age: 20 },
    { name: 'Денис', age: 20 },
    { name: 'Виктория', age: 20 },
    { age: 40 },
];

const result = pickPropArray(students, 'name');

console.log('Задание 1:');
console.log(result);
// [ 'Павел', 'Иван', 'Эдем', 'Денис', 'Виктория' ]

// Задание 2

function createCounter() { // возвращает анонимную функцию
    let count = 0;
    return function () {
        count++;
        console.log(count);
    }
}

console.log('Задание 2:');

const counter1 = createCounter();
counter1(); // 1
counter1(); // 2

const counter2 = createCounter();
counter2(); // 1
counter2(); // 2

// Задание 3

function spinWords(str) {
    const wordsArray = str.split(' ');

    for (let i = 0; i < wordsArray.length; i++) {
        const word = wordsArray[i];
        if (word.length >= 5) {
            wordsArray[i] = word.split('').reverse().join('');
        }
    }

    return wordsArray.join(' ');
}

console.log('Задание 3:');

const result1 = spinWords("Привет от Legacy");
console.log(result1); // тевирП от ycageL

const result2 = spinWords("This is a test");
console.log(result2); // This is a test