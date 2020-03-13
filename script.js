/*
 window.addEventListener('scroll', function(e) {
 document.getElementById("fooxes-container").style.transform = "translateY(-" + (window.pageYOffset / 2) + "px)";
 });
 */

/* LAZY LOADING OF IMAGES
 * https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video
 */
document.addEventListener("DOMContentLoaded", function() {
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
});