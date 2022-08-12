var symbols = ['00a', '00b', '01a', '01b', '02a', '02b',
  '03a', '03b', '04a', '04b',
  '05a', '05b', '06a', '06b', '07a', '07b'],
  opened = [],
  match = 0,
  moves = 0,
  $deck = $('.deck'),
  $deckOpen = $('.deck open'),
  $scorePanel = $('#score-panel'),
  $moveNum = $scorePanel.find('.moves'),
  $ratingStars = $scorePanel.find('i'),
  $restart = $scorePanel.find('.restart'),
  delay = 800,
  gameCardsQTY = symbols.length / 2,
  rank3stars = gameCardsQTY + 2,
  rank2stars = gameCardsQTY + 6,
  rank1stars = gameCardsQTY + 10,
  time = 0
  timeStart = false;
    


// Shuffle function From http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
}

return array;
}

// Initial Game
function initGame() {
    var cards = shuffle(symbols);
    document.getElementById("time").innerHTML = "00:00";
    timeStart = false;
    time = 0;
    $deck.empty();
    match = 0;
    moves = 0;
    $moveNum.html(moves);
    $ratingStars.removeClass('fa-star-o').addClass('fa-star');
	for (var i = 0; i < cards.length; i++) {
		$deck.append($('<li class="card" value=' + cards[i] + '><img src =".\\img\\card.png"/ height = 80 width = 100 id ="img_'+cards[i]+'"></li>'))
        //$deck.append($('<li class="card" value=' + cards[i] + '><img src="img\\' + [i] + '.png" height="100" width="50"><i class="fa fa-' + cards[i] + '"></i></li>'))
  }

  

   // $('.card').hide();

//<img src="img\\'+[i]+'.png" height="100" width="50">

};

// Set Rating and final Score
function setRating(moves) {
	var rating = 3;
	if (moves > rank3stars && moves < rank2stars) {
		$ratingStars.eq(2).removeClass('fa-star').addClass('fa-star-o');
		rating = 2;
	} else if (moves > rank2stars && moves < rank1stars) {
		$ratingStars.eq(1).removeClass('fa-star').addClass('fa-star-o');
		rating = 1;
	} else if (moves > rank1stars) {
		$ratingStars.eq(0).removeClass('fa-star').addClass('fa-star-o');
		rating = 0;
	}	
	return { score: rating };
};

// End Game
function endGame(moves, score) {
	swal({
		allowEscapeKey: false,
		allowOutsideClick: false,
		title: 'Congratulations! You Won!',
    text: 'With ' + moves + ' Moves, ' + score + ' Stars' + ', ' + time +' sec',
		type: 'success',
		confirmButtonColor: '#9BCB3C',
		confirmButtonText: 'Play again!'
	}).then(function(isConfirm) {
		if (isConfirm) {
      location.reload();
			initGame();
		}
  })

}

// Restart Game
$restart.on('click', function() {
  swal({
    allowEscapeKey: false,
    allowOutsideClick: false,
    title: 'Are you sure?',
    text: "Your progress will be Lost!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#9BCB3C',
    cancelButtonColor: '#EE0E51',
    confirmButtonText: 'Yes, Restart Game!'
  }).then(function(isConfirm) {
    if (isConfirm) {
      location.reload();
      initGame();
    }
  })
});

function startTime() {
  if (timeStart) {
    var min = 0;
    var sec = 0
    var timer = 0;

    timer = setInterval(function () {
      time++;

      min = Math.floor(time / 60);

      sec = time % 60;
      min = min % 60;

      var tm = min;
      var ts = sec;

      if (tm < 10) {
        tm = "0" + min;
      }

      if (ts < 10) {
        ts = "0" + sec;
      }

      document.getElementById("time").innerHTML = tm + ":" + ts;
    }, 1000);
  } else {
      clearInterval(timer);
  }
}


  var cardcase = [];
// Card flip
// card = $this.context.innerHTML;
$deck.on('click', '.card:not(".match, .open")', function () {
  if (!timeStart) {
    timeStart = true;
    startTime();
  }

  
	if($('.open').length > 1) {return true; }
  
  var $this = $(this),
    card = $(this).attr("value");
  
    cardcase.push(card);
    console.log(cardcase[0],cardcase[1]);

    $this.addClass('open');
    $('#img_' + card + '').attr("src", "img\\" + card.substr(1, 1) + ".png");
    $('#img_' + card + '').attr("height", "70");
    $('#img_' + card + '').attr("width", "60");
    $('#img_' + card + '').css('margin', '2px'); 
  
	opened.push(card.substr(0,2));

	// Compare with opened card
  if (opened.length > 1) {


    $('#img_' + card + '').attr("src", "img\\" + card.substr(1, 1) + ".png");

    if (card.substr(0, 2) === opened[0]) {
      $deck.find('.open').addClass('match animated infinite rubberBand');
      setTimeout(function() {
        $deck.find('.match').removeClass('open show animated infinite rubberBand');
        cardcase = [];
      //  $('#img_'+card+'').attr("src","img\\" + card.substr(1,1) + ".png");
    //    $('#img_'+card+'').attr("src",".\\img\\card.png");  
      }, delay);
      match++;
    } else {

        $deck.find('.open').addClass('notmatch animated infinite wobble');

			setTimeout(function() {
        $deck.find('.open').removeClass('animated infinite wobble');



      }, delay);

      setTimeout(function () {
        
        $deck.find('.open').removeClass('open show notmatch animated infinite wobble');


      }, delay);

      setTimeout(function () {
      
      console.log(cardcase[0], cardcase[1]);

      $('#img_' + cardcase[0] + '').attr("src",".\\img\\card.png");  
      $('#img_' + cardcase[0] + '').attr("height", "80");
      $('#img_' + cardcase[0] + '').attr("width", "100");
      $('#img_' + cardcase[0] + '').css('margin', '0'); 
  
      $('#img_' + cardcase[1] + '').attr("src",".\\img\\card.png");  
      $('#img_' + cardcase[1] + '').attr("height", "80");
      $('#img_' + cardcase[1] + '').attr("width", "100");
      $('#img_' + cardcase[1] + '').css('margin', '0'); 
  
      cardcase = [];

      }, delay);
    
    }

    opened = [];
    moves++;


		setRating(moves);
    $moveNum.html(moves);

  }
	
	// End Game if match all cards
	if (gameCardsQTY === match) {
		setRating(moves);
		var score = setRating(moves).score;
		setTimeout(function() {
			endGame(moves, score);
		}, 1000);
  }
});

initGame();
