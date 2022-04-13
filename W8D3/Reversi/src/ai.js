const Board = require("./board.js");

require("./game.js");
// require("./board.js");

function Bob(game) {
    this.color = "white";
    this.game = game;
    this.board = game.board;
}
//Board.prototype._positionsToFlip = function(pos, color, dir, piecesToFlip = [])
Bob.prototype.makeMove = function(validMoves) {
    let largest = 0;
    let bestMove = undefined;
    let bobsMoves = this.board.validMoves(this.color)

    for (let i = 0; i < bobsMoves.length; i++) {
        for (let k = 0; k < Board.DIRS.length; k++) {
            currentMove = this.board._positionsToFlip(bobsMoves[i], this.color, Board.DIRS[k])
            if (currentMove.length > largest) {
                largest = currentMove.length;
                bestMove = bobsMoves[i];
            }
        }
    }

    console.log(bestMove);

    if (bestMove) {
        console.log(bestMove);
        console.log("I AM THE BEST MOVE");
        return bestMove;
    }
}

if (typeof window === 'undefined'){
    module.exports = Bob;
}

// class Bob {
//     constructor(game) {
//         this.color = "white";
//         this.game = game;
//         this.game.board = board;
//     }

//     makeMove() {
//         let largest = 0;
//         let bestMove = undefined;

//         for (let i = 0; i < validMoves.length; i++) {
//             if (this.board._positionsToFlip(validMoves[i]).length > largest) {
//                 largest = this.board._positionsToFlip(validMoves[i]).length;
//                 bestMove = validMoves[i];
//             }
//         }

//         if (bestMove) {
//             this.board.placePiece(bestMove, this.color)
//         }
//     }
// }

