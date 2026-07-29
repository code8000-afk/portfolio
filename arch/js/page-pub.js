var page = {
	main : {
		onLoad : function(){
			page.main.mainVisualFunc();
		},
 
		// 메인비주얼
		mainVisualFunc : function(){
			// var interleaveOffset = 0.1;
			var mainVisSwiperOptions = {
				// effect: 'fade',
				// fadeEffect: {
				// 	crossFade: true
				// },
				loop: true, // 기존 loop 옵션 유지
				// simulateTouch: false,
				speed: 2000,
				parallax: true,
				autoplay: {
					delay: 5000,
					disableOnInteraction: false
				},
				watchSlidesProgress: true,
				pagination: {
					el: ".sect_visual .swiper-pagination",
					type: "progressbar"
				},
				navigation: {
					nextEl: ".sect_visual .swiper-button-next",
					prevEl: ".sect_visual .swiper-button-prev"
				},
				observeParents: true,
				observer: true,
				on: {
					beforeInit: function () {
						var slideCnt = $('.sect_visual').find('.swiper-slide').length;

						// 슬라이드 개수가 1개 이하이면 Swiper 초기화를 중단합니다.
						if (slideCnt <= 1) {
							this.destroy(true, true); // Swiper 초기화를 완전히 해제합니다.
							return;
						}

						$('.sect_visual').find('.all_num').text(slideCnt);
					},
					activeIndexChange : function() {
						var swiper = this;
						$('.sect_visual').find('.active_num').text(this.realIndex + 1);
						// console.log(this.realIndex)

						// console.log($('.sect_visual .swiper-slide').eq(this.previousIndex).attr('class'))
						// 영상 재생중일때 슬라이드 넘기면
						if ($('.sect_visual .swiper-slide').eq(this.previousIndex).hasClass('movie')) {
							$('.sect_visual .swiper-slide.movie .btn_play').show();
							$('.sect_visual .wrap_swiper_tools').show();
							$('.sect_visual .wrap_txt').show();
							$(".sect_visual").find(".btn-swiper-play").removeClass("play").addClass("paused");
							swiper.autoplay.start();
							$('.sect_visual .swiper-slide.movie .video').hide().attr('src', '');
						}
					},
 
				}
			};

			// 슬라이드 개수를 체크하여 loop 옵션값을 설정합니다.
			var slideCnt = $('.sect_visual').find('.swiper-slide').length;
			if (slideCnt <= 1) {
				mainVisSwiperOptions.loop = false;
			}

			var mainVisSwiper = new Swiper(".sect_visual .swiper-container", mainVisSwiperOptions);
			var swiperBtn = $(".sect_visual").find(".btn-swiper-play");
			swiperBtn.off("click").on("click",function(){
				if($(this).hasClass("paused")) {
					swiperBtn.removeClass("paused").addClass("play");
					mainVisSwiper.autoplay.stop();
				}
				else {
					swiperBtn.removeClass("play").addClass("paused");
					mainVisSwiper.autoplay.start();
				}
			});

		}, // 메인비주얼 끝
	},
	




}
