//Main navigation scroll spy for shadow
$(window).scroll(function() {
  var y = $(window).scrollTop();
  var hero_hight = $('#hero-area').height()
  if (y > hero_hight) {
    $("#header").addClass('--not-top');
    $("#header").addClass('fixed-top');
    $("#logo").attr("src", "/images/morja-logo-color.svg");
    $("#logo-collapsed").attr("src", "/images/morja-logo-color.svg");
  } else {
    $("#header").removeClass('--not-top');
    $("#header").removeClass('fixed-top');
    $("#logo").attr("src", "/images/morja-logo-white.svg");
    $("#logo-collapsed").attr("src", "/images/morja-logo-white.svg");
  }
});