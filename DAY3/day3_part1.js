const fs = require('fs');

let data, lines;

try {
     data = fs.readFileSync('puzzle.txt', 'utf8');
     lines = data.split(/\r\n|\n/);
} catch (err) {
    console.error('Error reading the file:', err);
}

console.log(lines);