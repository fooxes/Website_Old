window.addEventListener('scroll', function(e) {
  document.getElementById("fooxes-background").style.top = -window.pageYOffset / 2 + "px";
});