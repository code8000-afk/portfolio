document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.scroll-section');
    const menuLinks = document.querySelectorAll('.quick-menu a:not(.btn-top)');
    const miniHeader = document.getElementById('miniHeader');
    const infoSection = document.getElementById('sec-info');
    const improvementItems = document.querySelectorAll('.improvement-item');

    /* 1. 퀵메뉴 스크롤스파이 */
    const navObserverOptions = {
        root: null,
        rootMargin: '-30% 0px -50% 0px',
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                menuLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => navObserver.observe(section));

    /* 2. 스크롤 위치 기반 카드 Fade-in 감지 */
    const cardObserverOptions = {
        root: null,
        rootMargin: '-5% 0px -10% 0px',
        threshold: 0.05
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            } else {
                entry.target.classList.remove('in-view');
            }
        });
    }, cardObserverOptions);

    improvementItems.forEach(item => cardObserver.observe(item));

    /* 3. 하단 미니 헤더 토글 */
    window.addEventListener('scroll', function() {
        const infoBottom = infoSection.getBoundingClientRect().bottom;
        if (infoBottom < -50) {
            miniHeader.classList.add('visible');
        } else if (infoBottom > 0) {
            miniHeader.classList.remove('visible');
        }
    });
});




document.addEventListener('DOMContentLoaded', function() {
    
    /* 프로젝트 필터링 부드러운 애니메이션 인터랙션 */
    const tabBtns = document.querySelectorAll('.filter-tabs .tab-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const projectCount = document.querySelector('.list-section-title span');

    if (tabBtns.length > 0 && projectCards.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // 1) 탭 버튼 active 클래스 전환
                tabBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');
                let visibleCount = 0;

                // 2) 카드별 페이드 아웃/인 처리
                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');

                    if (filterValue === 'all' || filterValue === category) {
                        visibleCount++;
                        card.classList.remove('filter-hide');
                        card.classList.add('filter-show');
                    } else {
                        card.classList.remove('filter-show');
                        card.classList.add('filter-hide');
                    }
                });

                // 3) 상단 개수 카운터 업데이트
                if (projectCount) {
                    projectCount.textContent = `(${visibleCount})`;
                }
            });
        });
    }

});



$(document).ready(function() {
    // 1. URL 해시(#) 체크 후 해당 카드로 부드럽게 스크롤
    const hash = window.location.hash;
    if (hash && $(hash).length) {
        // 메인 페이지의 CSS 키프레임 애니메이션(fadeInUp) 실행 고려 400ms 지연
        setTimeout(function() {
            const targetOffset = $(hash).offset().top - 80; // 상단 여백 80px 여유
            $('html, body').animate({
                scrollTop: targetOffset
            }, 600);
        }, 400);
    }

    // 2. 방문자 카운트 로직
    const todayStr = new Date().toISOString().slice(0, 10);
    const hasVisitedSession = sessionStorage.getItem('visited_today');
    const lastVisitDate = localStorage.getItem('last_visit_date');
    const isNewVisitor = !hasVisitedSession || (lastVisitDate !== todayStr);

    if (isNewVisitor) {
        updateVisitorCount(todayStr, true);
        sessionStorage.setItem('visited_today', 'true');
        localStorage.setItem('last_visit_date', todayStr);
    } else {
        updateVisitorCount(todayStr, false);
    }
});

function updateVisitorCount(todayStr, isIncrease) {
    /* 실제 운용 시 DB/API 연동 구역 */
}


$(document).ready(function() {
    // 1. 카드 클릭 시 해당 카드의 ID를 세션에 저장
    $('.project-card').on('click', function() {
        const cardId = $(this).attr('id');
        if (cardId) {
            sessionStorage.setItem('last_clicked_card', cardId);
        }
    });

    // 2. 저장된 카드 ID가 있는 경우 스크롤 즉시 이동 & 선택 표시 클래스 추가
    const savedCardId = sessionStorage.getItem('last_clicked_card');

    if (savedCardId && $('#' + savedCardId).length) {
        const $targetCard = $('#' + savedCardId);
        const targetOffset = $targetCard.offset().top - 80; // 상단 헤더 여백 80px

        // [애니메이션 없이 즉시 이동]
        $(window).scrollTop(targetOffset);

        // [선택되었던 카드에 활성화 클래스 추가]
        $('.project-card').removeClass('active-card');
        $targetCard.addClass('active-card');

        // 이동 및 표시 완료 후 세션 지우기 (재접속 시 초기화)
        sessionStorage.removeItem('last_clicked_card');
    } else {
        // URL에 직접 해시(#)가 들어온 경우
        const hash = window.location.hash;
        if (hash && $(hash).length) {
            const targetOffset = $(hash).offset().top - 80;
            $(window).scrollTop(targetOffset);
            $(hash).addClass('active-card');
        }
    }

    // 3. 방문자 카운트 로직
    const todayStr = new Date().toISOString().slice(0, 10);
    const hasVisitedSession = sessionStorage.getItem('visited_today');
    const lastVisitDate = localStorage.getItem('last_visit_date');
    const isNewVisitor = !hasVisitedSession || (lastVisitDate !== todayStr);

    if (isNewVisitor) {
        updateVisitorCount(todayStr, true);
        sessionStorage.setItem('visited_today', 'true');
        localStorage.setItem('last_visit_date', todayStr);
    } else {
        updateVisitorCount(todayStr, false);
    }
});

function updateVisitorCount(todayStr, isIncrease) {
    /* 실제 운용 시 DB/API 연동 구역 */
}



