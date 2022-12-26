var sct = $(window).scrollTop();
var ww = $(window).innerWidth();
var wh = $(window).innerHeight();

$(function(){
	$('.top-anchor').on('click', function(){
		var speed = 800;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;

		$('.js-topContWrap').removeClass('is-fvNone');
		$('body,html').animate({scrollTop:position}, speed, 'easeInOutQuint');
		return false;
	});

	var pcD = '_pc.';
	var spD = '_sp.';
	var bp = 1024;
	var loadP = (bp < ww) ? pcD : spD;
	var viewP;

	$(window).on("resize", function(){
		ww = $(window).innerWidth();
		viewP = (bp < ww) ? pcD : spD;
		if (loadP != viewP) {
			setTimeout("window.location.reload()", 1);
		}
	});
});

function scrAnimation() {
	$(".aniType-title, .aniType-scrollCont").each(function(){
		var itempos = $(this).offset().top;
		if (sct > itempos - wh){
			$(this).addClass('is-active');
		} else {
			$(this).removeClass('is-active');
		}
	});
}

$(window).on('resize scroll',scrAnimation);

$(window).on('load', function() {
	setTimeout(function(){
		scrAnimation();
	},1500);
});