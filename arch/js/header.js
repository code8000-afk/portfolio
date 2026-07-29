
// 스크롤 시 헤더영역 고정 //
window.addEventListener('scroll', function() {
  var header = document.querySelector('.header'); // 헤더 요소 선택
  var scrollTop = window.pageYOffset; // 현재 스크롤 위치
  
  if (scrollTop > 50) {
    header.classList.add('header_fixed'); // 스크롤 50px 이상되면 'on' 클래스 추가
  } else {
    header.classList.remove('header_fixed'); // 50px 이하 스크롤되면 'on' 클래스 제거
  }
});


// 스크롤 내리면 상단메뉴 사라지고 올리면 생성되는 스크립트 //
var header = document.querySelector('.header');
var prevScrollPos = 0; // 이전 스크롤 위치를 0으로 초기화

window.addEventListener('scroll', function() {
  var currentScrollPos = window.pageYOffset;

  if (currentScrollPos > prevScrollPos) {
    header.classList.add('header_hide');
  } else {
    header.classList.remove('header_hide');
  }

  prevScrollPos = currentScrollPos;
});



// 상단 메뉴 영역 열고 닫기

// 메뉴 요소 및 서브메뉴 요소 선택
var nav = document.querySelector('.header .lnb');
var lnbMenu = nav.querySelectorAll('.depth1 > li > a'); // 메인 메뉴 선택
var lnbSubMenu = nav.querySelectorAll('.depth2');

// 메뉴 항목 마우스 오버 이벤트 처리
lnbMenu.forEach(function(menu, idx) {
  menu.addEventListener('mouseover', function() {
    // 다른 서브메뉴 닫기
    lnbSubMenu.forEach(function(subMenu) {
      subMenu.classList.remove('on');
    });

    // 다른 메뉴 항목 비활성화 표시 제거
    lnbMenu.forEach(function(item) {
      item.parentNode.classList.remove('on');
    });

    // 현재 메뉴의 서브메뉴 표시 및 활성화 표시 추가
    var currentIdx = idx;
    lnbSubMenu[currentIdx].classList.add('on');
    menu.parentNode.classList.add('on');
  });
});

// 메뉴 영역 마우스 아웃 이벤트 처리
nav.addEventListener('mouseleave', function() {
  lnbSubMenu.forEach(function(subMenu) {
    subMenu.classList.remove('on');
  });
  lnbMenu.forEach(function(item) {
    item.parentNode.classList.remove('on');
  });
});

// 포커스 이동 이벤트 처리
lnbMenu.forEach(function(menu, idx) {
  menu.addEventListener('focus', function() {
    // 다른 서브메뉴 닫기
    lnbSubMenu.forEach(function(subMenu) {
      subMenu.classList.remove('on');
    });

    // 다른 메뉴 항목 비활성화 표시 제거
    lnbMenu.forEach(function(item) {
      item.parentNode.classList.remove('on');
    });

    // 현재 메뉴의 서브메뉴 표시 및 활성화 표시 추가
    var currentIdx = idx;
    lnbSubMenu[currentIdx].classList.add('on');
    menu.parentNode.classList.add('on');
  });
});

// 포커스 이동 시 창 닫기 이벤트 처리
document.addEventListener('focusout', function(event) {
  if (!nav.contains(event.relatedTarget)) {
    lnbSubMenu.forEach(function(subMenu) {
      subMenu.classList.remove('on');
    });
    lnbMenu.forEach(function(item) {
      item.parentNode.classList.remove('on');
    });
  } else if (!event.relatedTarget.closest('.depth1')) {
    lnbSubMenu.forEach(function(subMenu) {
      subMenu.classList.remove('on');
    });
    lnbMenu.forEach(function(item) {
      item.parentNode.classList.remove('on');
    });
  }
});




// 사이트맵 //
// sitemap_btn 요소 선택
var sitemapBtn = document.querySelector('.sitemap_btn');
// sitemap_area 요소 선택
var sitemapArea = document.querySelector('.sitemap_area');
// sitemap_close 요소 선택
var sitemapClose = document.querySelector('.sitemap_close');
// body 요소 선택
var body = document.querySelector('body');

// sitemap_btn 클릭 이벤트 처리
sitemapBtn.addEventListener('click', function() {
  sitemapArea.classList.toggle('sitemap_on');
  body.style.overflow = 'hidden'; // body overflow hidden 추가
});

// sitemap_close 클릭 이벤트 처리
sitemapClose.addEventListener('click', function() {
  sitemapArea.classList.remove('sitemap_on');
  body.style.overflow = 'auto'; // body overflow hidden 제거
});

// tab 포커싱 이동 시 sitemap_area 제거
sitemapArea.addEventListener('focusout', function(event) {
  if (!sitemapArea.contains(event.relatedTarget)) {
    sitemapArea.classList.remove('sitemap_on');
    body.style.overflow = 'auto'; // body overflow hidden 제거
  }
});



