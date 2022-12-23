$(document).ready(function() {

  //Открытие и закрытие меню в мобильной версии
  $('.header__menu-icon').click(function(event) {
    $('.header__nav-list').toggleClass('header__nav-list--active');
    $('.header__menu-icon').toggleClass('header__menu-icon--active');
    $('.header__menu-icon').toggleClass('header__menu-icon--inactive');
    $('html').toggleClass('lock');
  });

  //Закрытие открытого меню в мобильной версии при скролле
  $(window).on('load scroll', function(){
    $('.header__nav-list').removeClass('header__nav-list--active');
    $('.header__menu-icon').removeClass('header__menu-icon--active');
    $('.header__menu-icon').addClass('header__menu-icon--inactive');
    $('html').removeClass('lock');
  });  

  //Скрытие и открытие пунктов, идущих пятыми и больше, в карточках секции Каталог
  $('.catalog__features').each(function(index, element) {
    if($(element).children('.catalog__feature').length > 4) {
      $(element).children('.catalog__feature').each(function(index, childElement) {
        if(index > 3) {
          $(childElement).hide();
        }
      });
      $(element).append('<button type="button" class="catalog__button-read-more">Подробнее...</button>');
      $('.catalog__button-read-more').on('click', function(){
        $(this).siblings().slideDown();
        $(this).hide();
        $('.catalog__cards').animate({height: '1048px'});
      });
    }
  });
 
  //Открытие модального окна
  $('.header__button, .catalog__button').on('click', function(){
    $('.popup__content .popup__inner-content').addClass('popup__inner-content--active');
    $('.popup__content .popup__inner-content:last-child').removeClass('popup__inner-content--active');
    $('.popup').addClass('popup--active');
    disableScroll();
  });  
  
  //Закрытие модального окна по нажатию на крестик в нем
  $('.popup__icon-close').on('click', function(){
    $('.popup').removeClass('popup--active');
    enableScroll();
  });   

  //Маска для ввода номера телефона
  $('#phone').mask('+7 (999) 999-99-99');

  //Проверка формы перед отправкой, отменяем автоматическую отправку формы, появление окна благодарности
  $('.popup__button').on('click', function(e) {
    let isFormValid = $('#form')[0].checkValidity();
    if(!isFormValid) {
      $('#form')[0].reportValidity();
    }
    else {
      e.preventDefault();
      $(this).closest('.popup__inner-content').removeClass('popup__inner-content--active');
      $('.popup__content .popup__inner-content:last-child').addClass('popup__inner-content--active');
      $('#form')[0].reset();
    }
  });   

  //Закрытие модального окна при клике в область вне него
  $(document).on('click', function(e) {
    if($('.popup').hasClass('popup--active')) {
      let popup = $('.popup__content, .header__button, .catalog__button');
      if(!popup.is(e.target) && popup.has(e.target).length === 0) {
        $('.popup').removeClass('popup--active');
        enableScroll();
      }
    }  
  });

});

//Отключение скролла на сайте
function disableScroll() { 
  let pagePosition = window.scrollY;
  document.body.classList.add('disable-scroll');
  document.body.dataset.position = pagePosition;
  document.body.style.top = -pagePosition + 'px';
  document.documentElement.style.scrollBehavior = 'auto';
}

 //Включение скролла на сайте
function enableScroll() { 
  let pagePosition = parseInt(document.body.dataset.position, 10);
  document.body.style.top = 'auto';
  document.body.classList.remove('disable-scroll');
  window.scroll({top: pagePosition, left: 0});
  document.body.removeAttribute('data-position');
  document.documentElement.style.scrollBehavior = 'smooth';
}

//Слайдеры
var swiper = new Swiper(".reviews__cards", {
  slidesPerView: 3,
  spaceBetween: 20,
  grabCursor: true, 
  navigation: {
    nextEl: ".reviews__swiper-button-next",
    prevEl: ".reviews__swiper-button-prev",
  },
  pagination: {
    el: ".reviews__swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    885: {
      slidesPerView: 2,
    },
    1285: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".catalog__cards", {
  slidesPerView: 3,
  spaceBetween: 20,
  grabCursor: true, 
  navigation: {
    nextEl: ".catalog__swiper-button-next",
    prevEl: ".catalog__swiper-button-prev",
  },
  pagination: {
    el: ".catalog__swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    885: {
      slidesPerView: 2,
    },
    1285: {
      slidesPerView: 3,
    },
  },
});

//Анимация при скролле
AOS.init({
  disable: "mobile",
  once: true,
});
