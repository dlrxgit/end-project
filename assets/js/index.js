var ww = $(window).innerWidth();
var wh = $(window).innerHeight();
var sct = $(window).scrollTop();
var hs = location.hash;

var onTop = false;
var onBack = false;
var onTopSw = true;
var mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';

if ($.cookie('_currentTime')) {
	extra.videoElement.currentTime = $.cookie('_currentTime');
};

$(document).ready(() => {
	const links = [{
		icon: '<i class="fa-brands fa-vk fa-2xl"></i>',
		link: 'https://vk.me/deliorix',
	}, {
		icon: '<i class="fa-brands fa-telegram fa-2xl"></i>',
		link: 'tg://resolve?domain=deliorix',
	}, 
	{
		icon: '<i class="fa-solid fa-comments fa-2xl"></i>',
		link: '/forums'
	},
	{
		icon: '<i class="fa-brands fa-steam fa-2xl"></i>',
		link: 'https://steamcommunity.com/profiles/76561199159080157',
	}, {
		icon: '<i class="fa-brands fa-github fa-2xl"></i>',
		link: 'https://github.com/dlrxgit',
	},];

	for (let i in links) {
		let link = links[i];
		$('.links').append(`<a href="${link.link}" target="_blank" rel="noopener noreferrer">${link.icon}</a>`);
	}
});
/*
document.addEventListener('contextmenu', (e) => {
	e.preventDefault();
});

document.addEventListener('keydown', (e) => {
	if (e.ctrlKey && (e.shiftKey && e.keyCode === 73) || (e.keyCode === 67 || e.keyCode === 83 || e.keyCode === 85 || e.keyCode === 86 || e.keyCode === 117) || e.keyCode === 123) {
		e.preventDefault();
	}
});
*/
document.addEventListener('keydown', (e) => {
	if (e.keyCode === 32 && e.target === document.body) {
		e.preventDefault();
	}
});

document.addEventListener('keydown', (e) => {
	if (e.keyCode === 32) {
		if (extra.backgroundToggler) {
			extra.videoElement.play();
		} else {
			extra.videoElement.pause();
		}
		return (extra.backgroundToggler = !extra.backgroundToggler);
	}
});

document.addEventListener('DOMContentLoaded', function () {
	$('.top__volume').on('click', function () {
		if (extra.videoElement.volume === 0) {
			$(this).find('[data-fa-i2svg]').toggleClass('fa-volume-high');
			$('#video').animate({ volume: 0.01 }, extra.musicFadeIn);
		} else {
			$(this).find('[data-fa-i2svg]').toggleClass('fa-volume-xmark');
			$('#video').animate({ volume: 0 }, extra.musicFadeIn);
		}
	});
});

$.fn.extend({
	animateCSS: function (animationName) {
		const animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		this.addClass(`animate__animated ${animationName}`).one(animationEnd, () => {
			$(this).removeClass(`animate__animated ${animationName}`);
		});
		return this;
	},
});

$(function () {
	document.addEventListener(mousewheelevent, function (e) {
		if (onTop) {
			e.preventDefault();
			var delta = e.deltaY ? -(e.deltaY) : e.wheelDelta ? e.wheelDelta : -(e.detail);
			if (delta < 0 && onTopSw) {
				$('.top__scroll').click();
				onTopSw = false;
			} else if (delta > 0 && onTopSw) {
				onTopSw = false;
				$('.topContWrap').removeClass('is-fvNone');
				setTimeout(function () {
					$('html,body').stop(true, false).animate({ scrollTop: 0 }, 800, 'easeOutQuint', function () {
						onTopSw = true;
					});
				}, 160)
			}
		}
	}, { passive: false });

});

$(window).on('load', function () {
	ww = $(window).innerWidth();

	setTimeout(function () {
		$('.loading2').addClass('is-active');
		setTimeout(function () {
			$('.loadingWrap').fadeOut(500);

			$('.title').animateCSS(extra.effects[extra.getRandomIntInclusive(1, 6)]);

			setTimeout(() => {
				const typed = new Typed('#description', {
					strings: extra.description,
					typeSpeed: 80,
					onComplete: () => {
						$('span').siblings('.typed-cursor').css('visibility', 'hidden');
					},
				});
			}, 800);

			extra.videoElement.addEventListener('timeupdate', () => {
				$.cookie('_currentTime', extra.videoElement.currentTime, { expires: 1 });
			}, false);

			if (!extra.shouldIgnoreVideo) {
				extra.videoElement.play();
			}
		}, 800);
	}, 500);

	if (hs && $(hs)[0]) {
		$('.topContWrap').addClass('is-fvNone');
		$('body,html').animate({ scrollTop: 0 }, 10, function () {
			var position = $(hs).offset().top + 128;

			if (ww < 1025) {
				position = $(hs).offset().top;
			}

			$('body,html').stop(true, false).animate({ scrollTop: position }, 800, 'easeInOutQuint', function () {
				onTopSw = true;
			});
		});
	} else {
		$('body,html').animate({ scrollTop: 0 }, 10);
	}
});

$(function () {
	$('.under-anchor').on('click', function () {
		var speed = 800;
		var href = $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top + 1;

		$('.topContWrap').addClass('is-fvNone');
		$('body,html').stop(true, false).animate({ scrollTop: position }, speed, 'easeInOutQuint', function () {
			onTopSw = true;
		});
		return false;
	});

	var brpoint = 0;

	function resizescrollHandle() {
		ww = $(window).innerWidth();
		wh = $(window).innerHeight();
		sct = $(window).scrollTop();

		if (ww < 1024) {
			$('#video').replaceWith('<div id="image" style="background-image: url(assets/img/bg_mobile.png);"></div>');
			extra.shouldIgnoreVideo = true;
		} else {
			var contOT = $('.js-topContWrap').offset().top;
			if (sct == 0) {
				onTop = true;
				onBack = false;
			} else if (sct > 0 && sct < contOT) {
				onTop = true;
				onBack = true;
			} else if (sct == contOT) {
				onTop = false;
				onBack = true;
			} else {
				onTop = false;
				onBack = false;
			}

			if (sct < 0) {
				sct = 0;
			}
			if (sct > brpoint) {
				$('.topContWrap').addClass('is-fvNone');
			} else {
				$('.topContWrap').removeClass('is-fvNone');
			}
			brpoint = sct;
			if (sct > contOT) {
				brpoint = contOT;
			}
		}
	}

	$(window).on('load resize scroll', function () {
		resizescrollHandle();
	});
});