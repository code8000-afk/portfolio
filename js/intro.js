(function () {
    'use strict';

    $(document).ready(function() {
        var intro = document.getElementById('portfolio-intro');
        var stage = document.getElementById('portfolio-stage');
        var count = document.getElementById('intro-count');
        var pageTransition = document.getElementById('page-transition');
        var transitionTitle = document.getElementById('transition-title');

        if (!intro || !stage) return;

        var hasPlayedIntro = sessionStorage.getItem('intro_played_jisu');

        if (hasPlayedIntro) {
            intro.style.display = 'none';
            stage.classList.add('is-instant');
            stage.classList.add('is-ready');
            document.documentElement.classList.remove('intro-lock');
            document.body.classList.remove('intro-lock');
        } else {
            document.documentElement.classList.add('intro-lock');

            var introDuration = 3000; 
            var startTime = Date.now();
            var finished = false;

            function finishIntro() {
                if (finished) return;
                finished = true;

                sessionStorage.setItem('intro_played_jisu', 'true');
                intro.classList.add('is-leaving');
                stage.classList.add('is-ready');
                
                document.documentElement.classList.remove('intro-lock');
                document.body.classList.remove('intro-lock');

                setTimeout(function () {
                    if (intro && intro.parentNode) intro.parentNode.removeChild(intro);
                }, 1200);
            }

            function updateTimer() {
                if (finished) return;
                var elapsed = Date.now() - startTime;
                var remaining = Math.ceil((introDuration - elapsed) / 1000);

                if (count) count.textContent = Math.max(0, remaining);

                if (elapsed >= introDuration) {
                    finishIntro();
                    return;
                }
                requestAnimationFrame(updateTimer);
            }
            
            requestAnimationFrame(updateTimer);

            intro.addEventListener('click', finishIntro);
            document.addEventListener('keydown', function (event) {
                if (finished) return;
                if (event.key === 'Enter' || event.key === ' ' || event.key === 'Escape') {
                    event.preventDefault();
                    finishIntro();
                }
            });

            setTimeout(function () { if (!finished) finishIntro(); }, 6000);
        }

        /* ==========================================================
           부드러운 3D Hover & Glow 인터랙션 (1024px 초과 해상도에서만 작동)
           ========================================================== */
        const cards = document.querySelectorAll('.project-card');

        cards.forEach($card => {
            let bounds;

            function rotateToMouse(e) {
                // 💡수정 3: 창 너비가 1024px 이하일 때는 3D 동작을 실행하지 않습니다.
                if (window.innerWidth <= 1024) return;

                const mouseX = e.clientX;
                const mouseY = e.clientY;
                const leftX = mouseX - bounds.x;
                const topY = mouseY - bounds.y;
                const center = {
                    x: leftX - bounds.width / 2,
                    y: topY - bounds.height / 2
                };
                const distance = Math.sqrt(center.x**2 + center.y**2);
                
                $card.style.transform = `
                    scale3d(1.03, 1.03, 1.03)
                    rotate3d(
                        ${center.y / 150},
                        ${-center.x / 150},
                        0,
                        ${Math.log(distance) * 1.2}deg
                    )
                `;
                
                const glow = $card.querySelector('.glow');
                if(glow) {
                    glow.style.backgroundImage = `
                        radial-gradient(
                            circle at
                            ${center.x * 2 + bounds.width/2}px
                            ${center.y * 2 + bounds.height/2}px,
                            rgba(255, 255, 255, 0.4),
                            rgba(0, 0, 0, 0.02)
                        )
                    `;
                }
            }

            $card.addEventListener('mouseenter', () => {
                // 💡수정 3: 창 너비가 1024px 이하일 때는 이벤트를 등록하지 않습니다.
                if (window.innerWidth <= 1024) return;
                
                bounds = $card.getBoundingClientRect();
                document.addEventListener('mousemove', rotateToMouse);
            });

            $card.addEventListener('mouseleave', () => {
                document.removeEventListener('mousemove', rotateToMouse);
                // 리셋 코드는 해상도 상관없이 무조건 실행하여 잔상/버그를 방지합니다.
                $card.style.transform = '';
                
                const glow = $card.querySelector('.glow');
                if(glow) glow.style.backgroundImage = '';
            });
        });

        /* ==========================================================
           PROJECT FILTER
           ========================================================== */
        const $tabBtns = $('.filter-tabs .tab-btn');
        const $projectCards = $('.project-card');
        const $projectCount = $('.list-section-title span');

        $tabBtns.on('click', function() {
            $tabBtns.removeClass('active');
            $(this).addClass('active');

            const filterValue = $(this).attr('data-filter');
            let visibleCount = 0;

            $projectCards.each(function() {
                const category = $(this).attr('data-category');

                if (filterValue === 'all' || filterValue === category) {
                    visibleCount++;
                    $(this).removeClass('is-filter-hidden').addClass('is-filtering-in');
                    
                    $(this).css('animation', 'none');
                    this.offsetHeight; 
                    $(this).css('animation', '');

                    setTimeout(() => {
                        $(this).removeClass('is-filtering-in');
                    }, 600); 

                } else {
                    $(this).addClass('is-filter-hidden').removeClass('is-filtering-in');
                }
            });

            if ($projectCount.length) {
                $projectCount.text(`(${visibleCount})`);
            }
        });

        /* ==========================================================
           CARD CLICK & PAGE TRANSITION
           ========================================================== */
        $('.project-card .card-link').on('click', function(event) {
            var href = $(this).attr('href');
            var cardId = $(this).closest('.project-card').attr('id');

            if (cardId) sessionStorage.setItem('last_clicked_card', cardId);

            if (!href || href === '#') return;
            if (event.ctrlKey || event.metaKey || event.shiftKey) return;

            event.preventDefault();

            var title = $(this).find('.card-title').text().trim();
            if (title && transitionTitle) {
                transitionTitle.textContent = title;
            }

            if (pageTransition) {
                pageTransition.classList.add('is-active');
                setTimeout(function () {
                    window.location.href = href;
                }, 2000);
            } else {
                window.location.href = href;
            }
        });

        const savedCardId = sessionStorage.getItem('last_clicked_card');
        const hash = window.location.hash;
        const delayTime = hasPlayedIntro ? 200 : 1100;

        if (savedCardId && $('#' + savedCardId).length) {
            setTimeout(function() {
                const targetOffset = $('#' + savedCardId).offset().top - 80;
                $('.list-container').animate({ scrollTop: targetOffset }, 400);
                sessionStorage.removeItem('last_clicked_card');
            }, delayTime); 
        } else if (hash && $(hash).length) {
            setTimeout(function() {
                const targetOffset = $(hash).offset().top - 80;
                $('.list-container').animate({ scrollTop: targetOffset }, 400);
            }, delayTime);
        }
    });
})();