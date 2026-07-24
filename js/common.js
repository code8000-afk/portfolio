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
