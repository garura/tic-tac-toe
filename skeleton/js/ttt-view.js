var View = function (game, $el) {
  this.game = game;
  this.$el = $el;
  this.setupBoard();
  this.bindEvents();
};

View.prototype.bindEvents = function () {
  this.$el.on("click", ".board-square", this.makeMove.bind(this));
};

View.prototype.makeMove = function (e) {
  var pos = $(e.currentTarget).attr("pos").split(",").map(function(ele){
    return parseInt(ele);
  });

  var currentPlayer = this.game.currentPlayer;

  try {
    this.game.playMove(pos);
    var $mark = $("<p>").html(currentPlayer.toUpperCase());
    $(e.currentTarget).addClass("clicked").addClass(currentPlayer).append($mark);
    $(e.currentTarget).removeClass("unclicked");
  }
  catch (err) {
    window.alert("Invalid move! Try again.");
  }

  if (this.game.isOver()) {
    var $block = $("<p>").addClass("win-msg").html("You win, " + this.game.winner() + "!");
    $("body").append($block);
    this.$el.off("click", ".board-square");
    $(".board-square").css("background-color", "white");
    $(".board-square").css("color", "red");
    $("." + currentPlayer).css("background-color", "green");
    $("." + currentPlayer).css("color", "white");


  }

};

function otherPlayer(currentPlayer) {
  if (currentPlayer === "x") {
    return "o";
  } else {
    return "x";
  }
}

View.prototype.setupBoard = function () {
  for (var i = 0; i < 3; i++) {
    var $row = $("<ul>").addClass("board-row"); //
    for (var j = 0; j < 3; j++) {
      var $square = $("<li>").addClass("board-square").addClass("unclicked").attr("pos", [i,j]);
      $row.append($square);
    }
    this.$el.append($row);
  }
};

module.exports = View;
