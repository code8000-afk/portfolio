const ROOT = document.documentElement;
const MIN = 10;
const THRESHOLD = innerHeight * (1.2 - 0.225);
const update = e => {
  const scroll = Math.floor(scrollY / innerHeight * 100);
  if (scrollY > THRESHOLD) {
    const progress = Math.floor((scrollY - THRESHOLD) / (document.body.scrollHeight - innerHeight - THRESHOLD) * 100);
    ROOT.style.setProperty('--content', progress);
  }
  ROOT.style.setProperty('--scroll', Math.max(0, Math.min(scroll, 100 - MIN)));
};
window.addEventListener('scroll', update);



window.addEventListener('scroll', function() {
  const subScrollBox = document.querySelectorAll('.sub_scroll_title');
  const scrollPosition = window.pageYOffset;

  for (const box of subScrollBox) {
    const scroll_titleElement = document.querySelector('.sub_scroll_title'); // .sub_scroll_title 요소 선택

    if (scrollPosition >= 500) {
      if (!scroll_titleElement.classList.contains('scroll_title')) { // .scroll_title 클래스가 없으면 추가
        scroll_titleElement.classList.add('scroll_title');
      }
    } else {
      if (scroll_titleElement.classList.contains('scroll_title')) { // .scroll_title 클래스가 있으면 제거
        scroll_titleElement.classList.remove('scroll_title');
      }
    }
  }
});


