document.addEventListener('DOMContentLoaded', function() {
    // 1. 현황판의 모든 링크 버튼과 모든 콘텐츠 영역을 가져옵니다. (.my- 접두사 적용)
    const statusLinks = document.querySelectorAll('.my-status-item');
    const sections = document.querySelectorAll('.my-content-section');

    statusLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            
            // 2. 클릭 시 우선 모든 섹션의 하이라이트 효과를 지웁니다.
            sections.forEach(sec => sec.classList.remove('my-active-highlight'));

            // 3. 클릭한 항목의 이동할 목적지(id)를 찾습니다.
            const targetId = this.getAttribute('href');
            
            if(targetId && targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                
                // 4. 목적지 섹션이 존재한다면 하이라이트 클래스를 추가합니다.
                if(targetSection) {
                    targetSection.classList.add('my-active-highlight');
                }
            }
        });
    });
});


/* ==========================================================================
[JavaScript] 리스트 타입(카드형/목록형) 토글 제어
========================================================================== */
document.addEventListener('DOMContentLoaded', function() {
  const typeButtons = document.querySelectorAll('.my-st-header .list-tpye-btn');
  const myPageWrapper = document.querySelector('.my-mypage-wrapper');

  typeButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      // 1. 기존의 활성화 관련 클래스 모두 제거
      typeButtons.forEach(function(btn) {
        btn.classList.remove('list-tpye-active', 'list-type-c-active', 'list-type-l-active');
      });

      // 2. 현재 클릭한 버튼에 active 클래스 추가
      this.classList.add('list-tpye-active');

      // 3. 버튼의 aria-label에 맞춰서 래퍼 클래스 교체
      if (!myPageWrapper) return;

      if (this.getAttribute('aria-label') === '카드형 보기') {
        myPageWrapper.classList.remove('list-type-list');
        myPageWrapper.classList.add('list-type-card');
      } else if (this.getAttribute('aria-label') === '목록형 보기') {
        myPageWrapper.classList.remove('list-type-card');
        myPageWrapper.classList.add('list-type-list');
      }
    });
  });
});

// form 생성함수 (form name, mothod, action, target)
function fn_js_comm_create_form(nm,mt,ac,tg){
	var form = document.createElement("form");
	
	form.setAttribute("method",mt);
	form.setAttribute("action",ac);
	form.setAttribute("name",nm)
	form.setAttribute("target",tg);
	
	return form;
}

// input 생성함수 (form name, input name, input value)
function fn_js_comm_add_input(form,nm,vu){
	
	var input1 = document.createElement("input");
	input1.setAttribute("type","hidden");
	input1.setAttribute("name",nm);
	input1.setAttribute("value",vu);
	
	form.appendChild(input1);
	
	return form;
}

function gpLoading(blockYn){
	$("body").append(`<div class="genie-loading" id="loadingDummyDiv1">
						 <span><strong class="sr-only">로딩이미지</strong></span>
						 <b><strong class="sr-only">지니플러스 로고</strong></b>
						 <p>잠시만 기다려주세요</p>
					 </div>`);
	if(blockYn == "Y"){
		$("body").append("<div id=\"loadingDummyDiv2\" style=\"margin: 0px; padding: 0px; border: currentColor; left: 0px; top: 0px; width: 100%; height: 100%; position: fixed; z-index: 98; cursor: wait; opacity: 0.6; background-color: rgb(166, 186, 207); \"></div>");
	}
}

function gpLoadingOut(){
	$("#loadingDummyDiv1").remove();
	$("#loadingDummyDiv2").remove();
}

/* ==========================================================================
[20260619 수정] 스크롤 시 상단 색상 추가
========================================================================== */
$(window).on('scroll', function() { if ($(window).scrollTop() > 1) { $('.sub-header-area').addClass('is-scrolled'); } else { $('.sub-header-area').removeClass('is-scrolled'); } });


/* ==========================================================================
[20260619] 푸터 관련 기관 영역
========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.custom_dropdown').forEach(dropdown => {
        const btn = dropdown.querySelector('.dropdown_btn');
        
        // 1. 버튼 클릭 시 토글
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = dropdown.classList.toggle('is_open');
            btn.setAttribute('aria-expanded', isOpen);
            
            // 다른 드롭다운은 닫기
            document.querySelectorAll('.custom_dropdown').forEach(other => {
                if (other !== dropdown) {
                    other.classList.remove('is_open');
                    other.querySelector('.dropdown_btn').setAttribute('aria-expanded', 'false');
                }
            });
        });

        // 2. 외부 클릭 시 닫기
        document.addEventListener('click', () => {
            dropdown.classList.remove('is_open');
            btn.setAttribute('aria-expanded', 'false');
        });

        // 3. Tab 키로 포커스가 완전히 빠져나갈 때 닫기 (접근성 핵심)
        dropdown.addEventListener('focusout', (e) => {
            if (!dropdown.contains(e.relatedTarget)) {
                dropdown.classList.remove('is_open');
                btn.setAttribute('aria-expanded', 'false');
            }
        });
    });
});

/* ==========================================================================
[20260619] 로그인 - 간편인증 탭
========================================================================== */
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.gne-tab-btn');
    const tabContents = document.querySelectorAll('.gne-tab-content');

    tabButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // 1. 모든 탭 버튼에서 active 클래스 제거 및 클릭한 탭에 추가
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // 2. 모든 탭 콘텐츠 영역 숨기고 클릭한 index의 콘텐츠만 표시
            tabContents.forEach(content => content.classList.remove('active'));
            tabContents[index].classList.add('active');
        });
    });
});

/* ==========================================================================
[20260624] 서브 - 좌측 메뉴 스크롤 오류 
========================================================================== */
window.addEventListener('scroll', function() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  // 스크롤이 맨 밑에 도달했는지 체크 (오차 범위 5px 고려)
  const isAtBottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 5;

  if (isAtBottom) {
    sidebar.classList.add('is-bottom');
  } else {
    sidebar.classList.remove('is-bottom');
  }
});


/* ==========================================================================
[20260629] 서브 - 마이페이지 콘텐츠 선택 시 상단이동
========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const statusGrid = document.querySelector('.my-status-grid');
    const tassdContainer = document.querySelector('.my-status-secwrap');

    if (!statusGrid || !tassdContainer) return;

    statusGrid.addEventListener('click', (e) => {
        const targetLink = e.target.closest('a');
        if (!targetLink) return;

        const targetId = targetLink.getAttribute('href');
        if (!targetId || !targetId.startsWith('#')) return;

        const targetSection = tassdContainer.querySelector(targetId);
        const allSections = tassdContainer.querySelectorAll('.my-content-section');

        if (targetSection) {
            e.preventDefault();

            // 1. 상단 탭 활성화 클래스 변경
            statusGrid.querySelectorAll('.my-status-item').forEach(item => item.classList.remove('my-sta-active'));
            targetLink.classList.add('my-sta-active');

            // 2. [First] 모든 섹션의 변경 전 원래 스크린 위치(Top) 기록
            const firstPositions = new Map();
            allSections.forEach(section => {
                firstPositions.set(section, section.getBoundingClientRect().top);
            });

            // 3. 현재 화면 스크롤 위치 고정용 저장
            const currentScrollY = window.scrollY;

            // 4. DOM 구조 변경 (클릭한 섹션을 맨 위로 이동)
            tassdContainer.prepend(targetSection);
            window.scrollTo(0, currentScrollY);

            // 5. [Last & Invert & Play] 위치 이동 애니메이션 실행
            allSections.forEach(section => {
                const firstTop = firstPositions.get(section);
                const lastTop = section.getBoundingClientRect().top;
                const invertY = firstTop - lastTop; // 변경 전과 변경 후의 거리 차이 계산

                if (invertY !== 0) {
                    // 순간적으로 이전 위치로 역변환(Invert) 시킨 뒤, 트랜지션 해제
                    section.style.transition = 'none';
                    section.style.transform = `translateY(${invertY}px)`;

                    // 브라우저가 위치를 인식하도록 리플로우 강제 유도 후, 부드럽게 원래 자리(0)로 이동(Play)
                    requestAnimationFrame(() => {
                        section.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
                        section.style.transform = 'translateY(0)';
                    });
                }
            });

            // 6. 주소창 히스토리 관리
            history.pushState(null, null, targetId);
        }
    });
});




/* ==========================================================================
[20260706] 서브 - 마이페이지(내부영역) 특정 클래스 추가 시 하단 버튼영역 따라다니게
========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // 1. body에 bot-btn_area 클래스가 없으면 즉시 종료
    if (!document.body.classList.contains('bot-btn_area')) return;

    const utilBar = document.querySelector('.content-bottom-util');
    const footer = document.querySelector('.krds_footer');
    const pledgeWrap = document.querySelector('.pledge-wrap'); // 기준이 되는 부모 요소
    
    if (!utilBar || !footer || !pledgeWrap) return;

    function updateUtilBar() {
        const footerRect = footer.getBoundingClientRect();
        const pledgeRect = pledgeWrap.getBoundingClientRect(); // 부모 영역의 실시간 위치/너비
        const windowHeight = window.innerHeight;

        // 푸터가 화면 하단에 나타나기 시작하면 (맨 밑으로 내려가면)
        if (footerRect.top <= windowHeight) {
            utilBar.style.position = 'absolute';
            utilBar.style.bottom = '0';
            utilBar.style.left = '0';
            utilBar.style.width = '100%';
            utilBar.style.paddingBottom = '0';
        } else {
            // 스크롤이 올라가서 따라다닐 때 (fixed)
            utilBar.style.position = 'fixed';
            utilBar.style.bottom = '0';
            utilBar.style.left = pledgeRect.left + 'px';
            utilBar.style.width = pledgeRect.width + 'px';
            utilBar.style.paddingBottom = '';
        }
    }

    // 스크롤 및 브라우저 창 크기 조절 시 실시간 업데이트
    window.addEventListener('scroll', updateUtilBar);
    window.addEventListener('resize', updateUtilBar);

    // 사이드바 토글 시 부드러운 너비 동기화
    const sidebarToggle = document.getElementById('sidebarToggle');
    if(sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            let start = null;
            function step(timestamp) {
                if (!start) start = timestamp;
                let progress = timestamp - start;
                updateUtilBar();
                
                if (progress < 350) { 
                    window.requestAnimationFrame(step);
                }
            }
            window.requestAnimationFrame(step);
        });
    }
    
    updateUtilBar(); 
});


/* ==========================================================================
[20260720] 모바일 메뉴
========================================================================== */
$(document).ready(function() {
    // 1. 메뉴 열기 및 닫기
    $('.mobile-open-btn').on('click', function() {
        $('.mobile-overlay').addClass('is-active');
        $('.mobile-menu-wrap').addClass('is-active');
    });
    
    $('.mobile-close-btn, .mobile-overlay').on('click', function() {
        $('.mobile-overlay').removeClass('is-active');
        $('.mobile-menu-wrap').removeClass('is-active');
    });

    // 2. 메뉴 탭 클릭 이벤트 제어 (로그인 상태에 따라 분기)
    $('.mobile-menu-btn').on('click', function() {
        // 부모 요소에 is-logged-in 클래스가 있는지 확인
        if ($('.mobile-menu-wrap').hasClass('is-logged-in')) {
            // [로그인 상태] 아코디언 메뉴 동작
            $(this).toggleClass('is-open');
            $(this).next('.mobile-sub-menu').slideToggle(300);
        } else {
            // [비로그인 상태] 바로 링크로 이동
            var moveUrl = $(this).data('url');
            if(moveUrl) {
                window.location.href = moveUrl; // 원하는 주소로 이동
            }
        }
    });
});
