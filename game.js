(function(){

    // INITIALIZE /\/\/\/\/\/\/\/\-------------------------------

    var hasWonRow       = false;
    var hasWonColumn    = false;
    var hasWonDiagonal1 = false;
    var hasWonDiagonal2 = false;
    var winnerFound     = false;
    var boardDimesion   = 5;

    var currentPlayer   = 1;  // player 1 is Os, player 2 is Xs
    var currentMoves    = 1;

    var movesBeforeWin  = (2 * boardDimesion) - 1;
    var totalMoves      = boardDimesion * boardDimesion;

    // arrays
    // for a first player 1
    var win1 = [1,1,1,1,1];
    // for a player 2
    var win2 = [2,2,2,2,2];
    // board multidimensional array
    var items = [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
    ];

    // ACTIONS UPON CLICKED /\/\/\/\/\/\/\/\-------------------------------

    $(".grid").click(function(e){
        var $this = $(this);

        // Prevent user from clicking a marked grid
        if($this.attr("data-select")) {
            $(".warning").html("Player " + currentPlayer + "'s turn - <strong>You cannot click on a marked spot</strong>");
            return;
        }

        // Set appropriate attributes/values to grid clicked
        if(currentPlayer == 1) {
            $this.addClass("marked-o").attr({
                "data-select" : "selected",
                "data-marked" : "o"
            });
        } else {
            $this.addClass("marked-x").attr({
                "data-select" : "selected",
                "data-marked" : "x"
            });
        }

        // Change the value of the 2-D array (game logic)
        var currentRow    = $this.data("row");
        var currentColumn = $this.data("column");

        // fill items array with player number
        items[currentRow][currentColumn] = currentPlayer;

        // activate game logic
        if(currentMoves >= movesBeforeWin) {
            gameLogic();
        }

        // Conditions for end of game without winner (Draw)
        if(currentMoves >= totalMoves && winnerFound === false) {
            $(".overlay .theMessage").text("It's a draw!");
            showMainMessage();
        }

        // Change warning message
        if(currentPlayer === 1) {
            $(".warning").text("Player 2's turn");
        } else {
            $(".warning").text("Player 1's turn");
        }

        // Swapping players and increasing moves counter
        switchPlayer();
        currentMoves += 1;
    });

    $(".lets-play").click(function(e){
        e.preventDefault();
        $(".start-message").addClass("hide");
        $(".start-overlay").fadeOut("1000");
    });

    $(".message").on("click", ".play-again", function(e){
        e.preventDefault();
        location.reload();
    });

    // FUNCTIONS /\/\/\/\/\/\/\/\-------------------------------

    function showMainMessage() {
        $(".warning").addClass("hide");
        $(".overlay").fadeIn("1000");
        $(".message").addClass("show");
    }

    function gameLogic() {
        
        // ckecking for a winner
        // ckeck for a winner by row
        winCondRow();

        // ckeck for a winner by column
        winCondColumn();

        // ckeck for a winner by diagonal left to right
        winCondDiagonalLeftRight();

        // ckeck for a winner by diagonal right to left
        winCondDiagonalRightLeft();

        // if the winner is exist than
        // check who exactly won
        // Conditions for end of game with winner
        if(hasWonRow === true || hasWonColumn === true || hasWonDiagonal1 === true || hasWonDiagonal2 === true) {
            var x = $(".marked-x").length;
            var o = $(".marked-o").length;
            winnerFound = true;
            if( x >= o ) {
                $(".overlay .theMessage").text("Well done Player 2, You've won the game!");
            }
            showMainMessage();
        }
    }

    function switchPlayer() {
        currentPlayer = (currentPlayer == 1) ? 2 : 1;
    }

    // check arrays equility with JSON.stringify
    function arraysEqual(a1, a2, a3) {
        return JSON.stringify(a1) === JSON.stringify(a2) || JSON.stringify(a1) === JSON.stringify(a3);
    }

    /*      get arrays
            FUNCTIONS       */
    // get specific row array from items array
    function getRow(i) {
        return items[i];
    }

    // get specific column array from items array
    function getCol(i) {
        return [items[0][i], items[1][i], items[2][i], items[3][i], items[4][i]];
    }

    // get left to right diagonal array from items array
    function getDiaLToR(){
        return [items[0][0], items[1][1], items[2][2], items[3][3], items[4][4]];
    }

    // get right to left diagonal array from items array
    function getDiaRToL(){
        return [items[0][4], items[1][3], items[2][2], items[3][1], items[4][0]];
    }

    /*      checking for a winner
            FUNCTIONS               */
    // ckeck for a winner by row
    function winCondRow() {
        if (arraysEqual(getRow(0),win1,win2) || arraysEqual(getRow(1),win1,win2) || arraysEqual(getRow(2),win1,win2) || arraysEqual(getRow(3),win1,win2) || arraysEqual(getRow(4),win1,win2) ){
            hasWonRow = true;
        }
    }

    // ckeck for a winner by column
    function winCondColumn(column) {
        if (arraysEqual(getCol(0),win1,win2) || arraysEqual(getCol(1),win1,win2) || arraysEqual(getCol(2),win1,win2) || arraysEqual(getCol(3),win1,win2) || arraysEqual(getCol(4),win1,win2) ){
            hasWonColumn = true;
        }
    }

    // ckeck for a winner by diagonal left to right
    function winCondDiagonalLeftRight() {
        if (arraysEqual(getDiaLToR(0),win1,win2) || arraysEqual(getDiaLToR(1),win1,win2) || arraysEqual(getDiaLToR(2),win1,win2) || arraysEqual(getDiaLToR(3),win1,win2) || arraysEqual(getDiaLToR(4),win1,win2) ){
            hasWonDiagonal1 = true;
        }
    }

    // ckeck for a winner by diagonal right to left
    function winCondDiagonalRightLeft() {
        if (arraysEqual(getDiaRToL(0),win1,win2) || arraysEqual(getDiaRToL(1),win1,win2) || arraysEqual(getDiaRToL(2),win1,win2) || arraysEqual(getDiaRToL(3),win1,win2) || arraysEqual(getDiaRToL(4),win1,win2) ){
            hasWonDiagonal2 = true;
        }
    }

}());
