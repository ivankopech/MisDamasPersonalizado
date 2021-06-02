
window.onload = function () {
  //The initial setup
  var gameBoard = [
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0],
    [2, 0, 2, 0, 0, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0]
  ];
  //arrays to store the instances
  var pieces = [];
  var tiles = [];

  //distance formula
  var dist = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
  }
  //Piece object - there are 24 instances of them in a checkers game
  function Piece(element, position) {
    // when jump exist, regular move is not allowed
    // since there is no jump at round 1, all pieces are allowed to move initially
    //this.allowedtomove = true;
    //linked DOM element
    this.element = element;
    //positions on gameBoard array in format row, column
    this.position = position;
    //which player's piece i it
    this.player = '';
    //figure out player by piece id
    // if (this.element.attr("id") < 12)
    //   this.player = 1;
    // else
    //   this.player = 2;
    // //makes object a king
    // this.king = false;
    // this.makeKing = function () {
    //   this.element.css("backgroundImage", "url('img/king" + this.player + ".png')");
    //   this.king = true;
    // }
    //moves the piece
    // this.move = function (tile) {
    //   this.element.removeClass('selected');
    //   if (!Board.isValidPlacetoMove(tile.position[0], tile.position[1])) return false;
    //   //make sure piece doesn't go backwards if it's not a king
    //   if (this.player == 1 && this.king == false) {
    //     if (tile.position[0] < this.position[0]) return false;
    //   } else if (this.player == 2 && this.king == false) {
    //     if (tile.position[0] > this.position[0]) return false;
    //   }
    //   //remove the mark from Board.board and put it in the new spot
    //   Board.board[this.position[0]][this.position[1]] = 0;
    //   Board.board[tile.position[0]][tile.position[1]] = this.player;
    //   this.position = [tile.position[0], tile.position[1]];
    //   //change the css using board's dictionary
    //   this.element.css('top', Board.dictionary[this.position[0]]);
    //   this.element.css('left', Board.dictionary[this.position[1]]);
    //   //if piece reaches the end of the row on opposite side crown it a king (can move all directions)
    //   if (!this.king && (this.position[0] == 0 || this.position[0] == 7))
    //     this.makeKing();
    //   return true;
    // };

    //tests if piece can jump anywhere
    // this.canJumpAny = function () {
    //   return (this.canOpponentJump([this.position[0] + 2, this.position[1] + 2]) ||
    //     this.canOpponentJump([this.position[0] + 2, this.position[1] - 2]) ||
    //     this.canOpponentJump([this.position[0] - 2, this.position[1] + 2]) ||
    //     this.canOpponentJump([this.position[0] - 2, this.position[1] - 2]))
    // };

    //tests if an opponent jump can be made to a specific place
    //this.canOpponentJump = function (newPosition) {
      // //find what the displacement is
      // var dx = newPosition[1] - this.position[1];
      // var dy = newPosition[0] - this.position[0];
      // //make sure object doesn't go backwards if not a king
      // if (this.player == 1 && this.king == false) {
      //   if (newPosition[0] < this.position[0]) return false;
      // } else if (this.player == 2 && this.king == false) {
      //   if (newPosition[0] > this.position[0]) return false;
      // }
      //must be in bounds
     // if (newPosition[0] > 7 || newPosition[1] > 7 || newPosition[0] < 0 || newPosition[1] < 0) return false;
      //middle tile where the piece to be conquered sits
      // var tileToCheckx = this.position[1] + dx / 2;
      // var tileToChecky = this.position[0] + dy / 2;
      // if (tileToCheckx > 7 || tileToChecky > 7 || tileToCheckx < 0 || tileToChecky < 0) return false;
      //if there is a piece there and there is no piece in the space after that
      // if (!Board.isValidPlacetoMove(tileToChecky, tileToCheckx) && Board.isValidPlacetoMove(newPosition[0], newPosition[1])) {
      //   //find which object instance is sitting there
      //   for (let pieceIndex in pieces) {
      //     if (pieces[pieceIndex].position[0] == tileToChecky && pieces[pieceIndex].position[1] == tileToCheckx) {
      //       if (this.player != pieces[pieceIndex].player) {
      //         //return the piece sitting there
      //         return pieces[pieceIndex];
      //       }
      //     }
      //   }
      // }
      //return false;
    //};

    // this.opponentJump = function (tile) {
    //   var pieceToRemove = this.canOpponentJump(tile.position);
    //   //if there is a piece to be removed, remove it
    //   if (pieceToRemove) {
    //     pieceToRemove.remove();
    //     return true;
    //   }
    //   return false;
    // };

    // this.remove = function () {
    //   //remove it and delete it from the gameboard
    //   this.element.css("display", "none");
    //   if (this.player == 1) {
    //     $('#player2').append("<div class='capturedPiece'></div>");
    //     Board.score.player2 += 1;
    //   }
    //   if (this.player == 2) {
    //     $('#player1').append("<div class='capturedPiece'></div>");
    //     Board.score.player1 += 1;
    //   }
    //   Board.board[this.position[0]][this.position[1]] = 0;
    //   reset position so it doesn't get picked up by the for loop in the canOpponentJump method
    //    this.position = [];
    //    var playerWon = Board.checkifAnybodyWon();
    //   if (playerWon) {
    //     $('#winner').html("Player " + playerWon + " has won!");
    //    }
    // }
  }

  function Tile(element, position) {
    //linked DOM element
    this.element = element;
    //position in gameboard
    this.position = position;
    //if tile is in range from the piece
    this.inRange = function (piece) {
      for (let k of pieces)
        if (k.position[0] == this.position[0] && k.position[1] == this.position[1]) return 'wrong';
      if (!piece.king && piece.player == 1 && this.position[0] < piece.position[0]) return 'wrong';
      if (!piece.king && piece.player == 2 && this.position[0] > piece.position[0]) return 'wrong';
      // if (dist(this.position[0], this.position[1], piece.position[0], piece.position[1]) == Math.sqrt(2)) {
      //   //regular move
      //   return 'regular';
      // } else if (dist(this.position[0], this.position[1], piece.position[0], piece.position[1]) == 2 * Math.sqrt(2)) {
      //   //jump move
      //   return 'jump';
      // }
    };
  }

  //Board object - controls logistics of game
  var Board = {
    board: gameBoard,
    tilesElement: $('div.tiles'),
    //dictionary para convertir posiciones en Board.board a las unidades del viewport
    dictionary: ["0vmin", "10vmin", "20vmin", "30vmin", "40vmin", "50vmin", "60vmin", "70vmin", "80vmin", "90vmin"],
    //inicializar tabla
    initalize: function () {
      var countPieces = 0;
      var countTiles = 0;
      for (let row in this.board) { //row is the index
        for (let column in this.board[row]) { //column is the index
          //whole set of if statements control where the tiles and pieces should be placed on the board
          if (row % 2 == 1) {
            if (column % 2 == 0) {
              countTiles = this.tileRender(row, column, countTiles)
            }
          } else {
            if (column % 2 == 1) {
              countTiles = this.tileRender(row, column, countTiles)
            }
          }
          if (this.board[row][column] == 1) {
            countPieces = this.playerPiecesRender(1, row, column, countPieces)
          } else if (this.board[row][column] == 2) {
            countPieces = this.playerPiecesRender(2, row, column, countPieces)
          }
        }
      }
    },
    tileRender: function (row, column, countTiles) {
      this.tilesElement.append("<div class='tile' id='tile" + countTiles + "' style='top:" + this.dictionary[row] + ";left:" + this.dictionary[column] + ";'></div>");
      tiles[countTiles] = new Tile($("#tile" + countTiles), [parseInt(row), parseInt(column)]);
      return countTiles + 1
    },

    playerPiecesRender: function (playerNumber, row, column, countPieces) {
      $(`.player${playerNumber}pieces`).append("<div class='piece' id='" + countPieces + "' style='top:" + this.dictionary[row] + ";left:" + this.dictionary[column] + ";'></div>");
      pieces[countPieces] = new Piece($("#" + countPieces), [parseInt(row), parseInt(column)]);
      return countPieces + 1;
    },
    
  }

  //initialize the board
  Board.initalize();

}