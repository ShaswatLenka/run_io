
(function($) {
    


	var settings = {

		// Full screen header?
			fullScreenHeader: true,

		// Parallax background effect?
			parallax: true,

		// Parallax factor (lower = more intense, higher = less intense).
			parallaxFactor: 10

	};

	skel.breakpoints({
		wide: '(max-width: 1680px)',
		normal: '(max-width: 1080px)',
		narrow: '(max-width: 840px)',
		mobile: '(max-width: 736px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		if (skel.vars.mobile) {

			settings.parallax = false;
			$body.addClass('is-scroll');

		}

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				$body.removeClass('is-loading');
			});

		// CSS polyfills (IE<9).
			if (skel.vars.IEVersion < 9)
				$(':last-child').addClass('last-child');

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on mobile.
			skel.on('+mobile -mobile', function() {
				$.prioritize(
					'.important\\28 mobile\\29',
					skel.breakpoint('mobile').active
				);
			});

		// Scrolly links.
			$('.scrolly-middle').scrolly({
				speed: 1000,
				anchor: 'middle'
			});

			$('.scrolly').scrolly({
				speed: 1000,
				offset: function() { return (skel.breakpoint('mobile').active ? 70 : 190); }
			});

		// Full screen header.
			if (settings.fullScreenHeader) {

				var $header = $('#header');

				if ($header.length > 0) {

					var $header_header = $header.find('header');

					$window
						.on('resize.overflow_fsh', function() {

							if (skel.breakpoint('mobile').active)
								$header.css('padding', '');
							else {

								var p = Math.max(192, ($window.height() - $header_header.outerHeight()) / 2);
								$header.css('padding', p + 'px 0 ' + p + 'px 0');

							}

						})
						.trigger('resize.overflow_fsh');

					$window.load(function() {
						$window.trigger('resize.overflow_fsh');
					});

				}

			}

		// Parallax background.

			// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
				if (skel.vars.browser == 'ie'
				||	skel.vars.mobile)
					settings.parallax = false;

			if (settings.parallax) {

				var $dummy = $(), $bg;

				$window
					.on('scroll.overflow_parallax', function() {

						// Adjust background position.
							$bg.css('background-position', 'center ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');

					})
					.on('resize.overflow_parallax', function() {

						// If we're in a situation where we need to temporarily disable parallax, do so.
							if (!skel.breakpoint('wide').active
							||	skel.breakpoint('narrow').active) {

								$body.css('background-position', '');
								$bg = $dummy;

							}

						// Otherwise, continue as normal.
							else
								$bg = $body;

						// Trigger scroll handler.
							$window.triggerHandler('scroll.overflow_parallax');

					})
					.trigger('resize.overflow_parallax');

			}

		// Poptrox.
			$('.gallery').poptrox({
				useBodyOverflow: false,
				usePopupEasyClose: false,
				overlayColor: '#0a1919',
				overlayOpacity: (skel.vars.IEVersion < 9 ? 0 : 0.75),
				usePopupDefaultStyling: false,
				usePopupCaption: true,
				popupLoaderText: '',
				windowMargin: 10,
				usePopupNav: true
			});

	});
    
    //for random word 
var words = [
  'code',
  'caffeine',
  'friends',
  'mentors',
  'tech_talks',
  'schwag',
  'hashtags',
  'fun',
  'freebies',
  'inventions',
  'ideas',
];
var letters = "abcdefghijklmnopqrstuvwxyz#%&^+=-",
    speed = 250,
    steps = 4,
    loader = document.querySelector('#loader');

function getRandomWord() {
  var randomWord = words[Math.floor(Math.random() * words.length)];
  return randomWord;
}
function getRandomLetter() {
  var randomLetter = letters[Math.floor(Math.random() * letters.length)];
  return randomLetter;
}

function randomWordLoop() {
  var word = getRandomWord();
  var textLength = word.length;
  for(var i = 0; i < textLength; i++) {    
    (function(i,word){
      letterAppear(i, word);
    })(i,word)
  }
  
  function letterAppear(i, word) {
    setTimeout(function() {
      randomLetters(i, word);
    }, speed*i);  
  }

  function randomLetters(i, word) {
    for (var j = 0; j <= steps; j++) {
      charsAnim(i, word, j);
    }
  }

  function charsAnim(i, word, j) {
    setTimeout(function() {
      var count = j; 
      if (j < steps) {           
        randomChar(i, word, count, j);
      } else {
        goodChar(i, word, count, j);
      }
      /* seems it fails less if I divide j, don't know why */
      /*}, (speed/steps)*(j / 1.8));*/
    }, ((speed/steps)*j) - (speed/steps));
  }

  function randomChar(i, word, count, j) {
    var letter = getRandomLetter();    
    if (j > 0) {
      var oldText = loader.textContent.slice(0, -1);
    } else {
      var oldText = loader.textContent;
    }
    loader.textContent = oldText + letter;    
  }
  function goodChar(i, word, count, j) {
    var oldText = loader.textContent.slice(0, -1);  
    loader.textContent = oldText + word[i];
    if (i == textLength - 1 ) {
      removeWord();
    }
  }
  
  function removeWord() {
    setTimeout(function() {
      for (var k = 0; k < textLength; k++) {
         removeLetters(k);
      }
    }, speed*2);
  }
  function removeLetters(k) {
    setTimeout(function() {
      removeLetter(k);
    }, 75*k);
  }
  function removeLetter(k) {
    var actualText = loader.textContent.slice(0, -1);
    loader.textContent = actualText;
    if (k == textLength - 1) {
      randomWordLoop();
    }
  }
}

randomWordLoop();

})(jQuery);