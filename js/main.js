
// $('.overlayWin').hide();
// $('.overlayStart').hide();
$('document').ready(function() {
$('.overlayStart').show(1000);
var playerData = {};
addPlayer("player1");
$('.player1Image').attr('src', playerData.player1.image);
addPlayer("player2");
$('.player2Image').attr('src', playerData.player2.image);
addWinStates("winStates");
console.log(playerData);
console.log(playerData.player1.image);
//I'M CREATING A BOX CALLED PLAYERNUMBER, AND AT THE VERY END, I AM TAKING THIS BOX AND THEN PUTTING INTO MY LARGER BOX (OBJECT) AND THEN ASSIGNED IT THE STRING PLAYER1
function addPlayer(playerNumber) {
  playerData[playerNumber]= new PlayerCreate();
}

function addWinStates(winStates) {
  playerData[winStates]= new WinStateCreate();
}

function WinStateCreate() {
  this.winToggle = 0;
  this.gameStart = 0;
}

function PlayerCreate() {
    this.image = 'img/runner.png';
    return this;
}

function getJson (playerUrl, playerName) {
  console.log(playerUrl);
  $.ajax({
    type:"GET",
    dataType:"json",
    url: playerUrl,
    success: onSuccess,
    failure: onFailure,
  });
  function onFailure(json) {
    console.log('error!!!');
  }

  function onSuccess(json){
    console.log(json);
    console.log(json.avatar_url);
    console.log(playerData);
    playerData[playerName].image= json.avatar_url;
    console.log(playerData.player1.image);
    if (playerName === "player1") {
      player1ImageChange();
    }
    else if (playerName === "player2") {
      player2ImageChange();
    }
    else if (playerName === "player3") {
      player3ImageChange();
    }
    else if (playerName === "player4") {
      player4ImageChange();
    }
  }
}

function startGame() {
  $('.overlayStart').hide();
  $('.raceBoard').show(1000);
  $('.justinRightSide').show(1000);
  setTimeout(function() {
    $('.justinRightSide').attr('src', 'img/justin2.png');
  }, 1000);
  setTimeout(function() {
    $('.justinRightSide').attr('src', 'img/justin1.png');
  }, 2000);
  setTimeout(function() {
    $('.justinRightSide').attr('src', 'img/justinGo.png');
  }, 3000);
  setTimeout(function() {
    playerData.winStates.gameStart=1;
  }, 3000);
  setTimeout(function() {
    $('.justinRightSide').hide(1000);
  }, 4000);
}

$('.startGame').on('click', function(event) {
  startGame();
});

$('.player1Submit').on('click', function(event) {
  event.preventDefault(event);
  var playerName = $('.player1NameTextInput').val();
  var playerUrl= 'https://api.github.com/users/'+playerName;
  var json = getJson(playerUrl, "player1");
  setTimeout(player1ImageChange, 2000);
});

$('.player2Submit').on('click', function(event) {
  event.preventDefault(event);
  var playerName = $('.player2NameTextInput').val();
  var playerUrl= 'https://api.github.com/users/'+playerName;
  var json = getJson(playerUrl, "player2");
  setTimeout(player2ImageChange, 2000);
});

$('.player3Submit').on('click', function(event) {
  event.preventDefault(event);
  addPlayer("player3");
  $('.player3Image').attr('src', playerData.player3.image);
  var playerName = $('.player3NameTextInput').val();
  var playerUrl= 'https://api.github.com/users/'+playerName;
  var json = getJson(playerUrl, "player3");
  setTimeout(player3ImageChange, 2000);
});

$('.player4Submit').on('click', function(event) {
  event.preventDefault(event);
  addPlayer("player4");
  $('.player4Image').attr('src', playerData.player4.image);
  var playerName = $('.player4NameTextInput').val();
  var playerUrl= 'https://api.github.com/users/'+playerName;
  var json = getJson(playerUrl, "player4");
  setTimeout(player4ImageChange, 2000);
});

function player1ImageChange() {
  $('.player1Image').attr('src', " ");
  console.log("done");
  $('.player1Image').attr('src', playerData.player1.image);
}

function player2ImageChange() {
  $('.player1Image').attr('src', " ");
  console.log("done");
  console.log(playerData.player2.image);
  $('.player2Image').attr('src', playerData.player2.image);
}

function player3ImageChange() {
  $('.player1Image').attr('src', " ");
  console.log("done");
  $('.player3Image').attr('src', playerData.player3.image);
}

function player4ImageChange() {
  $('.player1Image').attr('src', " ");
  console.log("done");
  $('.player4Image').attr('src', playerData.player4.image);
}

function postWin(playerWin) {
  console.log(playerWin + "WINS THE GAME!");
  var winnerArray = [];
  var width1 = calculateWidthPercent('.player1Track');
  var width2 = calculateWidthPercent('.player2Track');
  var width3 = calculateWidthPercent('.player3Track');
  var width4 = calculateWidthPercent('.player4Track');
  var widthArray = [width1, width2, width3, width4];
  for (var i = 0; i < widthArray.length; i++) {
    if (widthArray[i] >= "90%") {
      winnerArray.push("PLAYER " + (i+1));
    }
  }
  if (winnerArray.length ===1) {
    $('.playerWinText').html(playerWin + " SUBMITS PULL REQUEST!!!!!111``7");
    $('.overlayWin').show();
  }
  else {
    $('.playerWinText').html("THERE'S A PULL REQUEST TIE?!?!?! PLAY AGAIN!");
  }
}

//.css only returns widths in pixels (if the width is located in the CSS file instead of inline in the HTML)
//this hack takes the pixel output and converts it into a percent
function calculateWidthPercent(parentDiv) {
  return (Math.floor((100-(( 100 * parseFloat($(parentDiv).css('width')) / parseFloat($('.raceBoard').css('width')) )))) + '%');
}

$('.reset').on('click', function(event) {
  console.log("THIS SHIT BE WORKING");
  $('.playerTracks').css({marginLeft: '0%'});
  $('.overlayWin').hide();
  $('.raceBoard').hide();
  $('.overlayStart').show(1000);
  playerData.winStates.gameStart=0;
});

// var width = ((( 100 * parseFloat($(this).css('width')) / parseFloat($(this).parent().css('width')) )) + '%');
$('body').on('keyup', function(event) {
  if (playerData.winStates.gameStart !==0) {
    var width1 = calculateWidthPercent('.player1Track');
    var width2 = calculateWidthPercent('.player2Track');
    var width3 = calculateWidthPercent('.player3Track');
    var width4 = calculateWidthPercent('.player4Track');
    if (((width1>="90%")||(width2>="90%")||(width3>="90%")||(width4>="90%"))) {
    }
    else if(event.which==49) {
      $('.player1Track').css({marginLeft: '+=90%'});
      console.log(calculateWidthPercent('.player1Track'));
      var widthFinal = calculateWidthPercent('.player1Track');
      if (widthFinal>="90%") {
        setTimeout(function() {
          postWin("PLAYER 1");
        }, 200);
      }
    }
    else if(event.which===48) {
      $('.player2Track').css({marginLeft: '+=90%'});
      console.log(calculateWidthPercent('.player2Track'));
      var widthFinal2 = calculateWidthPercent('.player2Track');
      if (widthFinal2>="90%") {
        setTimeout(function() {
          postWin("PLAYER 2");
        }, 500);
      }
    }
    else if(event.which==90) {
      $('.player3Track').css({marginLeft: '+=1%'});
      console.log(calculateWidthPercent('.player3Track'));
      var widthFinal3 = calculateWidthPercent('.player3Track');
      if (widthFinal3>="90%") {
        setTimeout(function() {
          postWin("PLAYER 3");
        }, 500);
      }
    }
    else if(event.which==39) {
      $('.player4Track').css({marginLeft: '+=1%'});
      console.log(calculateWidthPercent('.player4Track'));
      var widthFinal4 = calculateWidthPercent('.player4Track');
      if (widthFinal4>="90%") {
        setTimeout(function() {
          postWin("PLAYER 4");
        }, 500);
      }
    }
  }

});

// $('body').on('keyup', function(event) {
//   var width1 = calculateWidthPercent('.player1Track');
//   var width2 = calculateWidthPercent('.player2Track');
//   var width3 = calculateWidthPercent('.player3Track');
//   var width4 = calculateWidthPercent('.player4Track');
//   if (((width1>="90%")||(width2>="90%")||(width3>="90%")||(width4>="90%"))!==false) {
//   }
//   else if(event.which===48) {
//     $('.player2Track').css({marginLeft: '+=90%'});
//     console.log(calculateWidthPercent('.player2Track'));
//     var widthFinal = calculateWidthPercent('.player2Track');
//     if (widthFinal>="90%") {
//       postWin("PLAYER 2");
//     }
//   }
// });
//
// $('body').on('keyup', function(event) {
//   var width1 = calculateWidthPercent('.player1Track');
//   var width2 = calculateWidthPercent('.player2Track');
//   var width3 = calculateWidthPercent('.player3Track');
//   var width4 = calculateWidthPercent('.player4Track');
//   if (((width1>="90%")||(width2>="90%")||(width3>="90%")||(width4>="90%"))!==false) {
//   }
//   else if(event.which==90) {
//     $('.player3Track').css({marginLeft: '+=1%'});
//     console.log(calculateWidthPercent('.player3Track'));
//     var widthFinal = calculateWidthPercent('.player3Track');
//     if (widthFinal>="90%") {
//       postWin("PLAYER 3");
//     }
//   }
// });
//
// $('body').on('keyup', function(event) {
//   var width1 = calculateWidthPercent('.player1Track');
//   var width2 = calculateWidthPercent('.player2Track');
//   var width3 = calculateWidthPercent('.player3Track');
//   var width4 = calculateWidthPercent('.player4Track');
//   if (((width1>="90%")||(width2>="90%")||(width3>="90%")||(width4>="90%"))!==false) {
//   }
//   if
//   else if(event.which==39) {
//     $('.player4Track').css({marginLeft: '+=1%'});
//     console.log(calculateWidthPercent('.player4Track'));
//     var widthFinal = calculateWidthPercent('.player4Track');
//     if (widthFinal>="90%") {
//       postWin("PLAYER 4");
//     }
//   }
// });
// });
});