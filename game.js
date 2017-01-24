"use strict";

(function(){

    // init
    var player = 1;
    var diagonal = 0;
    var antiDiagonal = 0;
    var rows = [0,0,0,0,0];
    var cols = [0,0,0,0,0];
    var boardDimesion = 5;
    var currentMoves = 1;
    var totalMoves = boardDimesion * boardDimesion;

    // start-game button
    $(".lets-play").click(function(e){
        e.preventDefault();
        $(".start-message").addClass("hide");
        $(".start-overlay").fadeOut("1000");
    });

    //end-game button
    $(".message").on("click", ".play-again", function(e){
        e.preventDefault();
        location.reload();
    });

    // click
    $(".grid").click(function(e){

        // click init
        var $this = $(this);
        var row = $this.data("row");
        var col = $this.data("column");
        var resultOfMove;

        // if player click on a market spot
        // `move` would not be counted
        // and player will be informed
        if ($this.attr("data-select")) {
            $(".warning").html("Player " + player + "'s turn - <strong>You cannot click on a marked spot</strong>");
            return;
        } else {
            // resultOfMove can be 0, 1 or 2
            // 0 is a draw
            // 1 and 2 are players
            resultOfMove = move(row, col, player);
        }

        // updating top info panel text
        // and marking board cells
        // according to player number
        if (player === 1) {
            $(".warning").text("Player 2's turn");
            $this.addClass("marked-o").attr({
                "data-select" : "selected"
            });
        } else {
            $(".warning").text("Player 1's turn");
            $this.addClass("marked-x").attr({
                "data-select" : "selected"
            });
        }

        // if not a draw
        if (resultOfMove != 0) {
            showWinnerMessage(player);
        }

        // if out of moves without winner === draw
        if (currentMoves >= totalMoves && resultOfMove === 0) {
            $(".overlay .theMessage").text("It's a draw!");
            showMessage();
        }

        switchPlayer();
        currentMoves += 1;

    });

    // functions

    function switchPlayer() {
        player = (player === 1) ? 2 : 1;
    }

    function showMessage() {
        $(".warning").addClass("hide");
        $(".overlay").fadeIn("1000");
        $(".message").addClass("show");
    }

    function showWinnerMessage(player) {
        $(".overlay .theMessage").text("Well done Player " + player + ", You've won the game!");
        showMessage();
    }

    // main tic-tac-toe logic
    // while returning 0, it is draw
    // if return !0, then it is a number of player that win ( 1 or 2 )
    function move(row, col, player) {
        var toAdd = (player === 1) ? 1 : -1;
        rows[row] += toAdd;
        cols[col] += toAdd;
        if (row === col) {
            diagonal += toAdd;
        }
        if (col === (cols.length - row - 1)) {
            antiDiagonal += toAdd;
        }
        var size = rows.length;
        if (Math.abs(rows[row]) === size ||
            Math.abs(cols[col]) === size ||
            Math.abs(diagonal) === size  ||
            Math.abs(antiDiagonal) === size) {
            return player;
        }
        return 0;
    };

}());
