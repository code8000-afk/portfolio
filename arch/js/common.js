// JavaScript Document

// 회원가입 완료 움직임 //
$(window).ready(function() {
  $('.sign_header_title').addClass('ba233');
});

// 배경 움직임 //
$(window).ready(function() {
  $('.sub_title_area').addClass('title_bg_active');
});

// 질의 응답 리스트 요소
const qaLists = document.querySelectorAll('.comp_qa_list');

// 각 질의 응답 리스트 요소에 대한 이벤트 처리
for (const qaList of qaLists) {
  qaList.addEventListener('click', function(event) {
    // 클릭된 질의 응답 리스트 요소
    const clickedQaList = event.target.closest('.comp_qa_list');

    // 현재 열려있는 질의 응답 리스트 요소 (있으면)
    const openQaList = document.querySelector('.comp_qa_area .qa_active');

    // 열려있는 질의 응답 리스트가 있다면 닫음
    if (openQaList) {
      openQaList.classList.remove('qa_active');
      openQaList.querySelector('button').title = "닫힘";
    }

    // 클릭된 질의 응답 리스트 열기
    clickedQaList.classList.add('qa_active');
    clickedQaList.querySelector('button').title = "열림";
  });
}

// 찜하기 기능 //
const bookmarkButtons = document.querySelectorAll('.bookmark_choice button');

bookmarkButtons.forEach(button => {
  button.addEventListener('click', () => {
   event.preventDefault();
    button.classList.toggle('bookmark_active');
  });
});



// 서브_공모 콘텐츠 네비게이션 fixed //
const compConNavi = document.querySelector('.comp_con_navi');
const compConData = document.querySelector('.comp_con_data');

window.addEventListener('scroll', function() {
  const scrollTop = window.pageYOffset;
  const compConDataTop = compConData.offsetTop;

  if (scrollTop >= compConDataTop) {
    compConNavi.classList.add('con_navi_fixed');
  } else {
    compConNavi.classList.remove('con_navi_fixed');
  }
});


// 메인 화면 (로그인 후 사용자,알림,편지 토글 기능)
$(function () {
const infoNameButton = document.querySelector('.info_name button');
const infoAlarmButton = document.querySelector('.info_alarm button');
const infoNameTab = document.querySelector('.info_name .tab_menu_text');
const infoAlarmTab = document.querySelector('.info_alarm .tab_menu_text');
const tabMenuCloseButtons = document.querySelectorAll('.tab_menu_colse');

let isMenuOpen = false;

infoNameTab.classList.remove('in_na_on');
infoAlarmTab.classList.remove('in_na_on');

infoNameButton.addEventListener('click', function() {
  infoNameTab.classList.toggle('in_na_on');
  infoAlarmTab.classList.remove('in_na_on');
  isMenuOpen = true;
});

infoAlarmButton.addEventListener('click', function() {
  infoAlarmTab.classList.toggle('in_na_on');
  infoNameTab.classList.remove('in_na_on');
  isMenuOpen = true;
});

document.addEventListener('click', function(event) {
  const target = event.target;
  if (!target.closest('.info_name') && !target.closest('.info_alarm')) {
    if (isMenuOpen) {
      infoNameTab.classList.remove('in_na_on');
      infoAlarmTab.classList.remove('in_na_on');
      isMenuOpen = false;
    }
  }
});

tabMenuCloseButtons.forEach(button => {
  button.addEventListener('click', function() {
    infoNameTab.classList.remove('in_na_on');
    infoAlarmTab.classList.remove('in_na_on');
    isMenuOpen = false;
  });
});
});


// 소개 화면 스크립트 //
var triggerPoint = 0.8; // 0 에서 1 사이의 값, 0.5는 화면의 절반 지점

$(window).scroll(function(){
  $('.animate').each( function(i){
    var bottom_of_object = $(this).offset().top + $(this).outerHeight();
    var bottom_of_window = $(window).scrollTop() + $(window).height() * triggerPoint;

    if( bottom_of_window > bottom_of_object ){
      $(this).addClass("aniactive");
      // 클래스 추가 시 dataYear 정보 업데이트
      const dataYear = $(this).data('year'); // 해당 요소의 data-year 속성 값 가져오기
      const hiLeftTextElements = document.querySelector('.intr_left_text h2');
      hiLeftTextElements.textContent = dataYear;
    } else {
      $(this).removeClass('aniactive');
    }
  });
});


// 상단이동 스크립트 //
$(function () {
  // 변수 선언
  const progressBar = document.querySelector('.bar');
  const progressRadius = 54;
  const progressCircumference = 2 * Math.PI * progressRadius;
  let previousScrollTop = 0; // 이전 스크롤 위치 기억

  // 프로그레스 업데이트 함수
  function updateProgress(per) {
    const progress = per / 100;
    const dashoffset = progressCircumference * (1 - progress);
    progressBar.style.strokeDashoffset = dashoffset;
  }

  // 프로그레스 바 초기화
  progressBar.style.strokeDasharray = progressCircumference;
  updateProgress(0); // 초기 프로그레스 0% 설정

  // 스크롤 이벤트 리스너 추가
  window.addEventListener('scroll', () => {
    // 스크롤 위치 계산
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    // 스크롤 위치에 따라 프로그레스 업데이트
    updateProgress(scrolled);

    // **스크롤 위치에 따라 .scroll_top 요소에 .show3 클래스 동적 추가 및 제거 (50px 버퍼 추가)**
    const circleProgressWrap = document.querySelector('.scroll_top');
    const buffer = 50; // 50px 버퍼 설정
    if (winScroll >= height - buffer) {
      circleProgressWrap.classList.add('scrool_bot');
    } else {
      circleProgressWrap.classList.remove('scrool_bot');
    }

    // **스크롤 위치가 100px 이하일 때만 active 클래스 토글**
    if (winScroll > 100) {
      circleProgressWrap.classList.add('active');
    } else {
      circleProgressWrap.classList.remove('active');
    }
  });

  // 페이지 상단으로 이동 기능
  $('#top').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 500);
  });

  // **.scroll_top 요소 클릭 시 .skipToContent 요소에 탭 포커스 설정**
  $('.scroll_top').click(function () {
    document.querySelector('.skipToContent').setAttribute('tabindex', '0');
    document.querySelector('.skipToContent').focus();
  });
});




// 필터 포커스 스크립트 //
const searchFilterButton = document.querySelector('.btn_filter');
const searchFilter = document.querySelector('.search_filter_wrap');
const closeButton = document.querySelector('.search_fil_close');

searchFilterButton.addEventListener('click', () => {
  searchFilter.classList.toggle('search_filteractive');
  // 추가: .search_filter 클릭 시 포커스 이동
  searchFilter.focus();
});

closeButton.addEventListener('click', () => {
  searchFilter.classList.remove('search_filteractive');
  // 추가: .search_fil_close 클릭 시 포커스 이동
  searchFilterButton.focus();
});

// 공모영역 타입 변경 스크립트 //
const typelbtn = document.getElementById('typelbtn');
const typegbtn = document.getElementById('typegbtn');
const subCompetitionsList = document.querySelector('.sub_competitions_list');

typelbtn.addEventListener('click', function () {
  typelbtn.classList.add('view_type_active');
  typegbtn.classList.remove('view_type_active');
  subCompetitionsList.classList.remove('list_gallery_transform');
});

typegbtn.addEventListener('click', function () {
  typelbtn.classList.remove('view_type_active');
  typegbtn.classList.add('view_type_active');
  subCompetitionsList.classList.add('list_gallery_transform');
});




