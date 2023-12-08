const fs = require('fs');

let data, lines;

try {
     data = fs.readFileSync('puzzle.txt', 'utf8');
     lines = data.split(/\r\n|\n/);
} catch (err) {
    console.error('Error reading the file:', err);
}

console.log(lines[0]);

function isNumber(char) {
    return /^[0-9]$/.test(char);
}

function getFrontNumber(inputString) {
    for(i = 0;i < inputString.length; i++){
        if(isNumber(+inputString[i])){
            return inputString[i];
        }
    }
}

function getLastNumber(inputString) {
    for(i = inputString.length; i >= 0; i--){
        if(isNumber(+inputString[i])){
            return inputString[i];
        }
    }
}

let totalNumber = 0;

for(z = 0; z < lines.length; z++){
    let currentNumber = `${getFrontNumber(lines[z])}${getLastNumber(lines[z])}`
    totalNumber = totalNumber + parseInt(currentNumber);
}

console.log(`Total Number: ${totalNumber}`);






