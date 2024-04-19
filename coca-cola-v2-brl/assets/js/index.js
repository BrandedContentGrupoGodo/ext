var $window = $(window);
var $document = $(document);
var $navButtons = $("nav a").filter("[href^=#]");
var $navGoPrev = $(".go-prev");
var $navGoNext = $(".go-next");
var $slidesContainer = $(".slides-container");
var $slides = $(".slide");
var $currentSlide = $slides.first();
var isAnimating = false;
var pageHeight = $window.innerHeight();
var keyCodes = {
  UP: 38,
  DOWN: 40,
};

var touchStartY = 0;
var touchEndY = 0;
var isTouchDevice = 'ontouchstart' in document.documentElement;

$window.on("resize", onResize).resize();
$window.on("mousewheel DOMMouseScroll", onMouseWheel);
$document.on("keydown", onKeyDown);
$navButtons.on("click", onNavButtonClick);
$navGoPrev.on("click", goToPrevSlide);
$navGoNext.on("click", goToNextSlide);

$window.on("touchstart", onTouchStart);
$window.on("touchmove", onTouchMove);

function onTouchStart(event) {
  if (event.touches && event.touches.length > 0) {
    touchStartY = event.touches[0].clientY;
  }
}

function onTouchMove(event) {
  if (event.touches && event.touches.length > 0) {
    touchEndY = event.touches[0].clientY;
    handleTouchMove();
    
    if (isTouchDevice) {
      return;
    }

    event.preventDefault();
  }
}

function handleTouchMove() {
  var touchDifference = touchEndY - touchStartY;

  if (touchDifference > 50) {
    // Scroll down
    goToNextSlide();
  } else if (touchDifference < -50) {
    // Scroll up
    goToPrevSlide();
  }
}

function onNavButtonClick(event) {
  var $button = $(this);
  var $slide = $($button.attr("href"));

  if ($slide.length) {
    event.preventDefault();
    goToSlide($slide);
  }
}

function onKeyDown(event) {
  var PRESSED_KEY = event.keyCode;

  if (PRESSED_KEY == keyCodes.UP) {
    goToPrevSlide();
    event.preventDefault();
  } else if (PRESSED_KEY == keyCodes.DOWN) {
    goToNextSlide();
    event.preventDefault();
  }
}

function onMouseWheel(event) {
  var delta = event.originalEvent ? (event.originalEvent.wheelDelta / 30 || -event.originalEvent.detail || event.originalEvent.deltaY / 3) : 0;

  if (delta < -1) {
    goToNextSlide();
  } else if (delta > 1) {
    goToPrevSlide();
  }

  if (!event.cancelable) return;

  event.preventDefault();
}

$window[0].addEventListener("mousewheel", onMouseWheel, { passive: true });
$window[0].addEventListener("DOMMouseScroll", onMouseWheel, { passive: true });

goToSlide($currentSlide);

function goToPrevSlide() {
  if ($currentSlide.prev().length) {
    goToSlide($currentSlide.prev());
  }
}

function goToNextSlide() {
  if ($currentSlide.next().length) {
    goToSlide($currentSlide.next());
  }
}

function goToSlide($slide) {
  if (!isAnimating && $slide.length) {
    isAnimating = true;
    $currentSlide = $slide;

    TweenLite.to($slidesContainer, 1, {
      scrollTo: { y: pageHeight * $currentSlide.index() },
      onComplete: onSlideChangeEnd,
    });

    $navButtons.removeClass("active");
    $navButtons.filter("[href=#" + $currentSlide.attr("id") + "]").addClass("active");
  }
}

function onSlideChangeEnd() {
  isAnimating = false;
}

function onResize(event) {
  var newPageHeight = $window.innerHeight();

  if (pageHeight !== newPageHeight) {
    pageHeight = newPageHeight;
    TweenLite.set([$slidesContainer, $slides], { height: pageHeight + "px" });
    TweenLite.set($slidesContainer, { scrollTo: { y: pageHeight * $currentSlide.index() } });
  }
}
