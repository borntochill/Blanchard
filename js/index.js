document.addEventListener('DOMContentLoaded', function () {
  new Accordion('.accordion-container', {
    openOnInit: [0]
  });

  const headSwiper = new Swiper('.header__swiper', {
    allowTouchMove: false,
    loop: true,
    effect: 'fade',
    speed: 10000,
    autoplay: {
      delay: 10000
    }
  });
  // dropdown
  const params = {
    btnClassName: "header__btn-bot",
    dropClassName: "header__list-sub-block",
    activeClassName: "is-active",
    disabledClassName: "is-disabled"
  };

  function onDisable(evt) {
    if (evt.target.classList.contains(params.disabledClassName)) {
      evt.target.classList.remove(
        params.disabledClassName,
        params.activeClassName
      );
      evt.target.removeEventListener("animationend", onDisable);
    }
  }

  function setMenuListener() {
    document.body.addEventListener("click", (evt) => {
      const activeElements = document.querySelectorAll(
        `.${params.btnClassName}.${params.activeClassName}, .${params.dropClassName}.${params.activeClassName}`
      );

      if (
        activeElements.length &&
        !evt.target.closest(`.${params.activeClassName}`)
      ) {
        activeElements.forEach((current) => {
          if (current.classList.contains(params.btnClassName)) {
            current.classList.remove(params.activeClassName);
          } else {
            current.classList.add(params.disabledClassName);
          }
        });
      }

      if (evt.target.closest(`.${params.btnClassName}`)) {
        const btn = evt.target.closest(`.${params.btnClassName}`);
        const path = btn.dataset.path;
        const drop = document.querySelector(
          `.${params.dropClassName}[data-target="${path}"]`
        );

        btn.classList.toggle(params.activeClassName);

        if (!drop.classList.contains(params.activeClassName)) {
          drop.classList.add(params.activeClassName);
          drop.addEventListener("animationend", onDisable);
        } else {
          drop.classList.add(params.disabledClassName);
        }
      }
    });
  }

  setMenuListener();

  // scroll
  document.querySelectorAll('.header__list-sub').forEach(el => {
    new SimpleBar(el)
  });

  const swiper = new Swiper('.gallery__swiper', {

    // Optional parameters
    direction: 'horizontal',
    loop: true,

    // Navigation arrows
    navigation: {
      nextEl: '.gallery-swiper-button-next',
      prevEl: '.gallery-swiper-button-prev',
    },

    pagination: {
      el: '.swiper-pagination',
      type: 'fraction'
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 0,
        slidesPerGroup: 1
      },
      620: {
        slidesPerView: 2,
        spaceBetween: 34,
        slidesPerGroup: 2
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 34,
        slidesPerGroup: 2
      },
      1500: {
        slidesPerView: 3,
        spaceBetween: 50,
        slidesPerGroup: 3,
      },
    }
  });


  const element = document.querySelector('.gallery__select');
  const choices = new Choices(element, {
    searchEnabled: false,
  });

  const eventsSwiper = new Swiper('.events__swiper', {
    // Optional parameters

    direction: 'horizontal',
    loop: false,

    // Navigation arrows
    navigation: {
      nextEl: '.events-swiper-button-next',
      prevEl: '.events-swiper-button-prev',
    },

    pagination: {
      el: '.events__swiper-pagination',
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 3,
        slidesPerGroup: 1
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 34,
        slidesPerGroup: 2
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 34,
        slidesPerGroup: 3
      },
      1800: {
        slidesPerView: 3,
        spaceBetween: 50,
        slidesPerGroup: 3
      }
    }
  });


  const swiperNext = document.getElementById('swiperNext')
  swiperNext.addEventListener('click', () => {
    eventsSwiper.slideNext();
  });


  const projectsSwiper = new Swiper('.partner__swiper', {
    direction: 'horizontal',
    loop: true,

    // Navigation arrows
    navigation: {
      nextEl: '.partner__swiper-button-next',
      prevEl: '.partner__swiper-button-prev',
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 34,
        slidesPerGroup: 2
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 50,
        slidesPerGroup: 2
      },
      1800: {
        slidesPerView: 3,
        spaceBetween: 50,
        slidesPerGroup: 3
      },

    }
  });


  let tabsBtn = document.querySelectorAll('.tabs-nav__btn');
  let tabsItem = document.querySelectorAll('.tabs__item');

  tabsBtn.forEach(function (element) {
    element.addEventListener('click', function (e) {
      const tabpath = e.currentTarget.dataset.tabpath;

      tabsBtn.forEach(function (btn) {
        btn.classList.remove('tabs-nav__btn--active')
      });
      e.currentTarget.classList.add('tabs-nav__btn--active');

      tabsItem.forEach(function (element) {
        element.classList.remove('tabs__item--active')
      });
      document.querySelector(`[data-target="${tabpath}"]`).classList.add('tabs__item--active');
    });
  });

  ymaps.ready(init);

  function init() {
    // Создание карты.
    var myMap = new ymaps.Map("map", {
      // Координаты центра карты.
      // Порядок по умолчанию: «широта, долгота».
      // Чтобы не определять координаты центра карты вручную,
      // воспользуйтесь инструментом Определение координат.
      center: [55.758468, 37.601088],
      // Уровень масштабирования. Допустимые значения:
      // от 0 (весь мир) до 19.
      zoom: 14
    });
    let myPlacemark = new ymaps.Placemark([55.758468, 37.601088], {}, {
      iconLayout: 'default#image',
      iconImageHref: 'img/map.svg',
      iconImageSize: [20, 20],
      iconImageOffset: [-15, -40]
    });

    myMap.geoObjects
      .add(myPlacemark);

    myMap.behaviors.disable('scrollZoom');
    myMap.controls.remove('searchControl');
    myMap.controls.remove('typeSelector');
    myMap.controls.remove('trafficControl');
    myMap.controls.remove('fullscreenControl');


  };

  let selector = document.querySelector("input[type='tel']");
  let im = new Inputmask("+7 (999)-999-99-99");
  im.mask(selector);

  new JustValidate('.form', {
    rules: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 10
      },
      tel: {
        required: true,
        function: (name, value) => {
          const phone = selector.inputmask.unmaskedvalue()
          return Number(phone) && phone.length === 10
        }
      },
    },
  });


  tippy('.projects__btn-tooltip-1', {
    content: 'Пример современных тенденций — современная методология разработки',
  });
  tippy('.projects__btn-tooltip-2', {
    content: 'Приятно, граждане, наблюдать, как сделанные на базе аналитики выводы вызывают у вас эмоции',
  });
  tippy('.projects__btn-tooltip-3', {
    content: 'В стремлении повысить качество',
  });


  document.querySelector(".header__burger").addEventListener("click", function () {
    document.querySelector(".header__nav").classList.add("header__nav--active");
  });
  document.querySelector(".header__btn-close").addEventListener("click", function () {
    document.querySelector(".header__nav").classList.remove("header__nav--active");
  });

  document.querySelector(".header__search-btn").addEventListener("click", function () {
    document.querySelector(".header__search-form").classList.add("header__search-form--active");
  });
  document.querySelector(".header__search-form-btn-close").addEventListener("click", function () {
    document.querySelector(".header__search-form").classList.remove("header__search-form--active");
  });
})
