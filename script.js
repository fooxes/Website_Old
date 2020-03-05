window.addEventListener('scroll', function(e) {
  document.getElementById("fooxes-container").style.transform = "translateY(-" + (window.pageYOffset / 2) + "px)";
});