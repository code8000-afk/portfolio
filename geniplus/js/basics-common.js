/* ==========================================================================
[jQuery] 팝업창, 모달 및 LNB 애니메이션 연동 제어
========================================================================== */
$(document).ready(function(){
	// 1. 팝업 및 모달 열기 이벤트
	$('.btn-popup-open').on('click', function(){
		var target = '#' + $(this).data('target');
		if ($(target).hasClass('common-modal_wrap')) {
			$(target).addClass('active');
			$('body').css('overflow', 'hidden'); 
		} else {
			$(target).fadeIn(200);
		}
	});

	// 2. 팝업 및 모달 닫기 이벤트 (통합 제어)
	$('.btn-popup-close').on('click', function(){
		var $targetOverlay = $(this).closest('.soe_overlay');
		var $targetModal = $(this).closest('.common-modal_wrap');
		if ($targetOverlay.length > 0) {
			$targetOverlay.fadeOut(200);
		}
		if ($targetModal.length > 0) {
			$targetModal.removeClass('active');
			$('body').css('overflow', ''); 
		}
	});

	// 3. ESC 키 누르면 열려있는 모든 모달/팝업 닫기
	$(document).on('keydown', function(e){
		if (e.keyCode === 27) {
			$('.soe_overlay').fadeOut(200);
			$('.common-modal_wrap').removeClass('active');
			$('body').css('overflow', '');
		}
	});

	// 4. LNB (상단 드롭다운) 제어 - Slide 애니메이션 통합 구조
	$('.lnb .fn-dropdown button').on('click', function(e) {
		e.stopPropagation();
		
		var $this = $(this);
		var $targetUl = $this.next('ul');
		
		$('.lnb .fn-dropdown button').not($this).removeClass('active');
		$('.lnb .fn-dropdown ul').not($targetUl).slideUp(200);
		
		$this.toggleClass('active');
		$targetUl.stop().slideToggle(200);
	});

	// LNB 바깥 영역 클릭 시 드롭다운 닫기 예외 처리
	$(document).on('click', function() {
		$('.lnb .fn-dropdown button').removeClass('active');
		$('.lnb .fn-dropdown ul').slideUp(200);
	});
});


/* ==========================================================================
[Vanilla JS] 레이아웃, 컴포넌트, 비밀번호 및 약관 제어 (DOMContentLoaded 통합)
========================================================================== */
document.addEventListener("DOMContentLoaded", function() {
    
	/* ----------------------------------------------------------------------
	1. 메인 사이드바 토글 및 초기 모바일 상태 설정 (내부 콘텐츠 사이드바와 분리)
	---------------------------------------------------------------------- */
	const sidebarToggleBtn = document.getElementById('sidebarToggle');
	const sidebar = document.getElementById('sidebar');
	
	if (sidebarToggleBtn && sidebar) {
		const checkInitialState = function() {
			const isMobile = window.matchMedia('(max-width: 1024px)').matches;
			if (isMobile) {
				sidebar.classList.remove('is-open');
				sidebar.classList.add('is-closed');
				sidebarToggleBtn.classList.remove('is-open');
				sidebarToggleBtn.classList.add('is-closed');
			}
		};
		
		checkInitialState();

		sidebarToggleBtn.addEventListener('click', function() {
			const isMobile = window.matchMedia('(max-width: 1024px)').matches;
			
			if (isMobile) {
				if (sidebar.classList.contains('is-open')) {
					sidebar.classList.replace('is-open', 'is-closed');
					sidebarToggleBtn.classList.replace('is-open', 'is-closed');
				} else {
					sidebar.classList.remove('is-closed');
					sidebar.classList.add('is-open');
					sidebarToggleBtn.classList.remove('is-closed');
					sidebarToggleBtn.classList.add('is-open');
				}
			} else {
				sidebar.classList.toggle('is-closed');
				sidebarToggleBtn.classList.toggle('is-closed');
			}
		});
	}

	/* ----------------------------------------------------------------------
	2. 사이드바 아코디언 메뉴(Depth) 열림/닫힘 기능
	---------------------------------------------------------------------- */
	const menuLinks = document.querySelectorAll('.nav-item.has-sub > a');
	
	menuLinks.forEach(link => {
		link.addEventListener('click', function(e) {
			e.preventDefault();
			
			const parentLi = this.parentElement;
			parentLi.classList.toggle('open');
			
			const siblings = parentLi.parentElement.children;
			Array.from(siblings).forEach(sibling => {
				if(sibling !== parentLi && sibling.classList.contains('has-sub')) {
					sibling.classList.remove('open');
				}
			});
		});
	});

	/* ----------------------------------------------------------------------
	3. 비밀번호 표시/숨김 토글 기능
	---------------------------------------------------------------------- */
	const togglePwBtn = document.querySelector('.gne-pw-toggle');
	const pwInput = document.getElementById('login_pw');

	if (togglePwBtn && pwInput) {
		togglePwBtn.addEventListener('click', function() {
			const icon = this.querySelector('i');
			
			if (pwInput.type === 'password') {
				pwInput.type = 'text';
				icon.classList.remove('xi-eye-off');
				icon.classList.add('xi-eye');
				this.setAttribute('aria-label', '비밀번호 숨김');
			} else {
				pwInput.type = 'password';
				icon.classList.remove('xi-eye');
				icon.classList.add('xi-eye-off');
				this.setAttribute('aria-label', '비밀번호 표시');
			}
		});
	}

	/* ----------------------------------------------------------------------
	4. 회원가입 약관 동의 관련 기능 (전체동의 및 개별 바인딩)
	---------------------------------------------------------------------- */
	const checkAll = document.getElementById('check-agree-all');
	const radioAgrees = document.querySelectorAll('input[type="radio"][id$="-2"]');
	const checkAgrees = document.querySelectorAll('input[type="checkbox"][id^="terms_check"]');
	
	if(checkAll) {
		checkAll.addEventListener('change', function() {
			const isChecked = this.checked;
			
			radioAgrees.forEach(radio => {
				radio.checked = isChecked;
			});
			
			checkAgrees.forEach(checkbox => {
				checkbox.checked = isChecked;
			});
		});
	}

	// 약관 읽기 버튼 동적 이벤트 매핑
	const termsButtons = document.querySelectorAll('.gne-agree-header .btn');
	const targetIds = ['term-content-1', 'term-content-2', 'term-content-3', 'term-content-4', 'term-content-5'];
	
	termsButtons.forEach((btn, index) => {
		btn.addEventListener('click', function() {
			const title = this.previousElementSibling.textContent;
			openTermsModal(title, targetIds[index]);
		});
	});
});


/* ==========================================================================
[Global Functions] 약관 모달창 제어 스크립트 (onclick 전역 호출용 보존)
========================================================================== */
function openTermsModal(title, contentId) {
	const modalWrapper = document.getElementById('terms-modal');
	const modalTitle = document.getElementById('terms-modal-title-text');
	const modalContentArea = document.getElementById('terms-modal-content-area');
	const sourceContent = document.getElementById(contentId);

	if (modalWrapper && modalTitle && modalContentArea && sourceContent) {
		modalTitle.textContent = title;
		modalContentArea.innerHTML = sourceContent.innerHTML;
		
		modalWrapper.style.display = 'flex';
		setTimeout(() => {
			modalWrapper.classList.add('active');
		}, 10);
		
		/*document.body.style.overflow = 'hidden'; 20260604 약관동의 시 스크롤 영역 때문에 움직임 현상 수정*/
	}
}

function closeTermsModal() {
	const modalWrapper = document.getElementById('terms-modal');
	
	if (modalWrapper) {
		modalWrapper.classList.remove('active');
		
		setTimeout(() => {
			modalWrapper.style.display = 'none';
			document.body.style.overflow = '';
		}, 300);
	}
}


/* ==========================================================================
폰트 축소 확대 스크립트 20260615 수정
========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
	const html = document.documentElement;
	const statusView = document.querySelector('.scale-status');
	
	const BASE_PERCENT = 62.5; 
	const STEP_PERCENT = 9.375; 	
	
	let currentStep = 0; 
	const MAX_STEP = 4;  
	const MIN_STEP = -2; 

	const updateScale = () => {
		const newFontSize = BASE_PERCENT + (currentStep * STEP_PERCENT);
		html.style.fontSize = `${newFontSize}%`;
		statusView.textContent = `${100 + (currentStep * 15)}%`; 
	};

	if(document.querySelector('.icon-xi-zoom-in')){
		document.querySelector('.icon-xi-zoom-in').addEventListener('click', () => {
			if (currentStep < MAX_STEP) { currentStep++; updateScale(); }
		});
	}

	if(document.querySelector('.icon-xi-zoom-out')){
		document.querySelector('.icon-xi-zoom-out').addEventListener('click', () => {
			if (currentStep > MIN_STEP) { currentStep--; updateScale(); }
		});
	}

	if(document.querySelector('.scale-status')){
		document.querySelector('.scale-status').addEventListener('click', () => {
			currentStep = 0; updateScale();
		});
	}
});


/* ==========================================================================
프로필 열고 닫기
========================================================================== */
document.addEventListener('DOMContentLoaded', function() {
	const profileBtn = document.querySelector('.profile-name > button');
	const profileNameWrap = document.querySelector('.profile-name');
	const profileCloseBtn = document.querySelector('.btn-pop-close');

	if (profileBtn && profileNameWrap) {
		profileBtn.addEventListener('click', function(e) {
			e.stopPropagation();
			profileNameWrap.classList.toggle('is-active');
		});
	}

	if (profileCloseBtn && profileNameWrap) {
		profileCloseBtn.addEventListener('click', function(e) {
			e.stopPropagation();
			profileNameWrap.classList.remove('is-active');
		});
	}

	document.addEventListener('click', function(e) {
		if (profileNameWrap && !profileNameWrap.contains(e.target)) {
			profileNameWrap.classList.remove('is-active');
		}
	});
});


/* ==========================================================================
   전자평가 좌측메뉴 (독립 제어)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.querySelector('.btn_sidebar_toggle');
  const targetArea = document.querySelector('.new_evlall_area');
  
  if (toggleBtn && targetArea) {
    toggleBtn.addEventListener('click', function() {
      targetArea.classList.toggle('menu-collapsed');
      
      const isCollapsed = targetArea.classList.contains('menu-collapsed');
      const tooltipSpan = this.querySelector('.tooltip_txt');
      const icon = this.querySelector('i');
      
      if (isCollapsed) {
        if (tooltipSpan) tooltipSpan.textContent = '사이드바 열기';
        if (icon) icon.innerHTML = '&#xe990;';
      } else {
        if (tooltipSpan) tooltipSpan.textContent = '사이드바 닫기';
        if (icon) icon.innerHTML = '&#xe98e;';
      }
    });
  }
});


/* ==========================================================================
   푸터영역
   ========================================================================== */
	document.addEventListener('DOMContentLoaded', () => {
		document.querySelectorAll('.footer-quick .layout .link').forEach((btn, index) => {
			btn.addEventListener('click', () => {
				const targetId = `popFootLink${index + 1}`;
				const targetPopup = document.getElementById(targetId);
				if (targetPopup) targetPopup.classList.add('is-open');
			});
		});
		document.querySelectorAll('.popup-close').forEach(closeBtn => {
			closeBtn.addEventListener('click', (e) => {
				e.currentTarget.closest('.popup-wrap').classList.remove('is-open');
			});
		});
		document.querySelectorAll('.popup-wrap').forEach(wrap => {
			wrap.addEventListener('click', (e) => {
				if (e.target === wrap) wrap.classList.remove('is-open');
			});
		});
	});

/* ==========================================================================
   [JavaScript] 연장 버튼 클릭 시 시간 표시 컴포넌트 애니메이션 재실행 제어
   ========================================================================== */
document.addEventListener('DOMContentLoaded', function() {
	if(document.querySelector('.btn-prolong')){
	    document.querySelector('.btn-prolong').addEventListener('click', function() {
	        const timeEl = document.querySelector('.profile-time');
	        if (!timeEl) return; // 요소가 없는 경우 예외 처리
	        timeEl.classList.remove('is-active');
	        void timeEl.offsetWidth; 
	        timeEl.classList.add('is-active');
	    });
	}
});




document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.main-container');
    const rightArea = document.querySelector('.main-right-area');
    const noticeBox = document.querySelector('.notice-rolling-box');
    const accItems = document.querySelectorAll('.acc-item');

    if (!container || !noticeBox) return;

    // 1. 초기 셋팅
    container.classList.add('intro-mode');
    document.body.classList.add('intro-start');

    // 2. 좌측 텍스트 요소 애니메이션 완료 감지
    noticeBox.addEventListener('animationend', (e) => {
        if (e.animationName === 'fadeInUp') {
            
            // 글자가 완전히 나온 뒤 1.2초 후 좌측으로 이동 시작
            setTimeout(() => {
                
                // 이동하기 직전에 트랜지션 효과를 켬 (처음 로딩 시 밀림 방지)
                container.classList.add('is-moving');
                
                // 브라우저가 위 클래스를 완벽히 적용할 수 있게 프레임 분리
                requestAnimationFrame(() => {
                    // intro-mode를 제거하여 좌측 이동 시작
                    container.classList.remove('intro-mode');
                    
                    // 좌측 영역이 이동하는 속도와 우측 아코디언이 밀려들어오는 타이밍을 맞춰 show-right 실행
                    if (rightArea) {
                        setTimeout(() => {
                            rightArea.classList.add('show-right');
                        }, 300); 
                    }
                });

            }, 1200); 
        }
    });

    // 3. 우측 아코디언 메뉴 클릭 로직
    accItems.forEach((item) => {
        item.addEventListener('click', function() {
            if (this.classList.contains('active')) return;
            accItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });

        item.addEventListener('animationend', function(e) {
            if (e.animationName === 'slideInLeft') {
                this.style.animation = 'none';
                this.style.opacity = '1';
                this.style.transform = 'none';
            }
        });
    });
});



