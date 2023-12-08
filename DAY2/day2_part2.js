const fs = require('fs');

let data, lines;

try {
     data = fs.readFileSync('puzzle.txt', 'utf8');
     lines = data.split(/\r\n|\n/);
} catch (err) {
    console.error('Error reading the file:', err);
}

function getBlockCount(block){
    return block.match(/(\d*) \D/)[1]
}

function getBlockColor(block){
    return block.match(/\d ([a-z]*)/)[1]
}

let blockLimits = {
    "red" : 12,
    "green" : 13,
    "blue" : 14  
}

function withInLimits(blocksSet, blocksLimits){
    if(blocksSet["red"] > blocksLimits["red"]){
        return false;
    }
    if(blocksSet["green"] > blocksLimits["green"]){
        return false;
    }
    if(blocksSet["blue"] > blocksLimits["blue"]){
        return false;
    }
    return true;
}

let counter = 0;
let powerCounter = 0;
newLines = lines.map(game => {
    return {
        gameId: game.match(/Game (.*):/)[1],
        game: game.match(/Game .*:(.*)/)[1].split(';').map(element => {
            return element.split(',')
        }),
        gamePossible: true,
        gamePower: 0
    }
})

for(i = 0; i < newLines.length; i++){
    let gameMaxCounter = {
        "red" : 0,
        "green" : 0,
        "blue" : 0  
    }
    newLines[i].game.forEach(element => {
        let gameCounter = {
            "red" : 0,
            "green" : 0,
            "blue" : 0  
        }

        element.forEach(blockSet => {
            gameCounter[getBlockColor(blockSet)] = parseInt(gameCounter[getBlockColor(blockSet)]) + parseInt(getBlockCount(blockSet));
            if(parseInt(gameMaxCounter[getBlockColor(blockSet)]) < parseInt(getBlockCount(blockSet))){
                gameMaxCounter[getBlockColor(blockSet)] = parseInt(getBlockCount(blockSet));
            }
        })
        if(!withInLimits(gameCounter, blockLimits)){
            newLines[i].gamePossible = false;
        }

    })
    newLines[i].gamePower = gameMaxCounter["red"] * gameMaxCounter["blue"] * gameMaxCounter["green"];
    powerCounter = powerCounter + parseInt(newLines[i].gamePower);
    if(newLines[i].gamePossible){
        counter = parseInt(counter) + parseInt(newLines[i].gameId);
    } 
}

console.log(`The Answer prt1 is: ${counter}`);
console.log(`The Answer prt2 is: ${powerCounter}`);



