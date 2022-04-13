// DON'T TOUCH THIS CODE
if (typeof window === 'undefined'){
  var Piece = require("./piece");
}
// DON'T TOUCH THIS CODE

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid () {
  let board = [];
  for (let i = 0; i < 8; i++) {
    board.push([]);
    for (let k = 0; k < 8; k++) {
      board[i].push(undefined);
    }
  }
  board[3][3] = new Piece("white");
  board[4][4] = new Piece("white");
  board[3][4] = new Piece("black");
  board[4][3] = new Piece("black");
  return board;
}

/**
 * Constructs a Board with a starting grid set up.
 */
function Board () {
  this.grid = _makeGrid();
}

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
  if (pos[0] < 0 || pos[1] < 0 || pos[0] > 7 || pos[1] > 7) {
    return false;
  }
  else {
    return true;
  }
};

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  if (this.isValidPos(pos)) {
    return this.grid[pos[0]][pos[1]];
  }
  else {
    throw new Error("Not valid pos!");
  }
};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  if (this.getPiece(pos)) {
    return this.getPiece(pos).color === color;
  }
  else {
    return undefined;
  }
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  if (this.getPiece(pos)) {
    return true;
  }
  else {
    return false;
  }
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns an empty array if it reaches the end of the board before finding another piece
 * of the same color.
 *
 * Returns empty array if it hits an empty position.
 *
 * Returns empty array if no pieces of the opposite color are found.
 */
Board.prototype._positionsToFlip = function(pos, color, dir, piecesToFlip = []){
  let nextPos = [pos[0] + dir[0], pos[1] + dir[1]]
  
  if (!this.isValidPos(nextPos)) { 
    return [];
  }

  if (!this.isOccupied(nextPos)) {
    return [];
  }

  if (this.isMine(nextPos, color)) {
    return piecesToFlip;
  }

  piecesToFlip.push(nextPos);
  return this._positionsToFlip(nextPos, color, dir, piecesToFlip);

};

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {
  if (!this.isOccupied(pos)) {
    let newArr = [];
  
    Board.DIRS.forEach( (el) => {
      let tempArr = [];
      newArr = this._positionsToFlip(pos, color, el, tempArr).concat(newArr);
    });
  
    if (newArr.length !== 0) {
      return true;
    }
  
  }
  return false;
};

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
  if (this.validMove(pos, color)) {
    this.grid[pos[0]][pos[1]] = new Piece(color);
    
    let newArr = [];

    Board.DIRS.forEach( (el) => {
      let tempArr = [];
      newArr = this._positionsToFlip(pos, color, el, tempArr).concat(newArr);
    })

    newArr.forEach( (position) => {
      this.grid[position[0]][position[1]].flip();
    })
  }
  else {
    throw new Error("Invalid move!")
  }
};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
  let arr = [];

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (this.validMove([i, j], color)) {
        arr.push([i, j]);
      }
    }
  }

  return arr;
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
  return this.validMoves(color).length > 0;
};



/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
  return !(this.hasMove("white") && this.hasMove("black"));
};




/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
  // console.log(this.grid);
  let newArr = [];

  for (let i = 0; i < 8; i++) {
    newArr.push(new Array(0));

    for (let k = 0; k < 8; k++) {
      if (this.grid[i][k]) {
        newArr[i].push(this.grid[i][k].toString());
      }
      else {
        newArr[i].push("_");
      }
    }

    console.log(newArr[i].join(" "));
  }

  
};


// DON'T TOUCH THIS CODE
if (typeof window === 'undefined'){
  module.exports = Board;
}
// DON'T TOUCH THIS CODE


