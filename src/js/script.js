// slick-slider
$(document).ready(function() {
  $(".carousel--container").slick({
    dots: true,
    arrows: true,
    autoplay: true
  });

  // hamburger menu
  $(".hamburger").click(function() {
    $(".hamburger").toggleClass("active");
    $(".nav--links").toggleClass("active");
  });
});
