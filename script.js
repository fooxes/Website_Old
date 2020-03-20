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

  // ADD HOVER EFFECTS TO SCRUM
  let elements = document.getElementsByClassName("list-item__theme-scrum");
  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    element.addEventListener('mouseover', function(e) {
      displayScrumItem(e);
    });
    element.addEventListener('click', function(e) {
      displayScrumItem(e);
    });
  }
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

  displayScrumItem = function(e) {

    // Bail, if childelement
    if (!e.target.classList.contains("list-item__theme-scrum")) {
      return;
    }

    var dayIndex = Array.prototype.indexOf.call(e.target.parentNode.children, e.target);
    console.log(dayIndex);

    let descriptionIndex;
    switch(dayIndex) {
      case 0:
        descriptionIndex = 0;
        break;
      case 8:
        descriptionIndex = 2;
        break;
      case 9:
        descriptionIndex = 3;
        break;
      case 10:
        descriptionIndex = 0;
        break;
      case 18:
        descriptionIndex = 2;
        break;
      case 19:
        descriptionIndex = 3;
        break;
      default:
        descriptionIndex = 1;
    }

    // Hide all others
    for (let i = 0; i < 4; i++) {
      document.getElementsByClassName("subline--theme-scrum")[i].style.display = "none";
      document.getElementsByClassName("description--theme-scrum")[i].style.display = "none";
    }

    // Show current one
    document.getElementsByClassName("subline--theme-scrum")[descriptionIndex].style.display = "block";
    document.getElementsByClassName("description--theme-scrum")[descriptionIndex].style.display = "block";

    for (let i = 0; i < 20; i++) {
      document.getElementsByClassName("list-item__theme-scrum")[i].style.animationPlayState = "paused";
    }
  }
}