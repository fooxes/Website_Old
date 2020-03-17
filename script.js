/*
 window.addEventListener('scroll', function(e) {
 document.getElementById("fooxes-container").style.transform = "translateY(-" + (window.pageYOffset / 2) + "px)";
 });
 */

document.addEventListener("DOMContentLoaded", function() {

  /* LAZY LOADING OF IMAGES
   * https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video
   */

  let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  let active = false;

  const lazyLoad = function() {
    if (active === false) {
      active = true;

      setTimeout(function() {
        timer = setInterval(function() {
          lazyImages.forEach(function(lazyImage) {
            if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
              lazyImage.src = lazyImage.dataset.src;
              lazyImage.srcset = lazyImage.dataset.srcset;
              lazyImage.classList.remove("lazy");

              lazyImages = lazyImages.filter(function(image) {
                return image !== lazyImage;
              });

              if (lazyImages.length === 0) {
                debugger;
                timer.clear();
              }
            }
          });

          active = false;
        }, 200);
      }, 200);
    }
  };
  lazyLoad();

  /* SCROLLING INDICATOR */
  slider = document.getElementsByClassName("slider")[0];
  firstSlide = slider.children[0];
  const classPagingIndictorDotActive = "paging-indictor-dot--active";
  const classPagingIndictorDot = "paging-indictor-dot";

  slider.addEventListener("scroll", function(e) {

    // Remove old active
    let pagingIndictorDotActive = document.getElementsByClassName(classPagingIndictorDotActive)[0];
    pagingIndictorDotActive.classList.remove(classPagingIndictorDotActive);

    // Add new active
    let index = Math.round(slider.scrollLeft / firstSlide.offsetWidth);
    let pagingIndictorDot = document.getElementsByClassName(classPagingIndictorDot)[index];
    pagingIndictorDot.classList.add(classPagingIndictorDotActive);
  });
});

/* EXAMPLE ARROWS */ {

  let timer = 0; // Registered globally to be able to clear it later

  currentIndex = 0;
  const scrollInterval = 5000;

  // FUNCTIONS CALLED VIA HTML

  function prevSlide(automated) {
    nextIndex = currentIndex - 1;

    if (nextIndex < 0) {
      nextIndex = slider.children.length;
    }

    scrollToSlide(nextIndex, automated);
  }

  nextSlide = function(automated) { // Different style to call this from setTimer() and setIntervall()
    nextIndex = currentIndex + 1;

    if (nextIndex > slider.children.length - 1) {
      nextIndex = 0;
    }

    scrollToSlide(nextIndex, automated);
  };

  // CORE FUNCTIONS

  function scrollToSlide(index, automated) {
    slider.scrollLeft  = firstSlide.offsetWidth * index;
    currentIndex = index;

    if (!automated) {
      stopAutoScroll();
    }

    return false; // https://stackoverflow.com/questions/128923/whats-the-effect-of-adding-return-false-to-a-click-event-listener
  }

  // SCROLL EVERY 3 SECONDS

  startAutoScroll = function () {
    timer = setInterval(function () {
      nextSlide(true);
    }, scrollInterval);
  };
  startAutoScroll ();

  stopAutoScroll = function () {
    clearInterval(timer);
  };
}