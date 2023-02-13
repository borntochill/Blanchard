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
    dropClassName: "header__dropdown",
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
        const nav = btn.dataset.nav;
        const drop = document.querySelector(
          `.${params.dropClassName}[data-target="${nav}"]`
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

  // gallery swiper
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

  // partner swiper
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

  // tabs
  let tabsBtn = document.querySelectorAll('.tabs-nav__link');
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
  // map
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
  document.querySelector(".nav__btn_close").addEventListener("click", function () {
    document.querySelector(".header__nav").classList.remove("header__nav--active");
  });

  document.querySelector(".header__search-btn").addEventListener("click", function () {
    document.querySelector(".header__search-form").classList.add("header__search-form--active");
  });
  document.querySelector(".search-form__btn_close").addEventListener("click", function () {
    document.querySelector(".header__search-form").classList.remove("header__search-form--active");
  });
  // modal
  class Modal {
    constructor(options) {
      let defaultOptions = {
        isOpen: () => {},
        isClose: () => {},
      }
      this.options = Object.assign(defaultOptions, options);
      this.modal = document.querySelector('.modal');
      this.speed = false;
      this.animation = false;
      this.isOpen = false;
      this.modalContainer = false;
      this.previousActiveElement = false;
      this.fixBlocks = document.querySelectorAll('.fix-block');
      this.focusElements = [
        'a[href]',
        'input',
        'button',
        'select',
        'textarea',
        '[tabindex]'
      ];
      this.events();
    }

    events() {
      if (this.modal) {
        document.addEventListener('click', function (e) {
          const clickedElement = e.target.closest('[data-path]');
          if (clickedElement) {
            let target = clickedElement.dataset.path;
            let animation = clickedElement.dataset.animation;
            let speed = clickedElement.dataset.speed;
            this.animation = animation ? animation : 'fade';
            this.speed = speed ? parseInt(speed) : 300;
            this.modalContainer = document.querySelector(`[data-target="${target}"]`);
            this.open();
            return;
          }

          if (e.target.closest('.modal__close')) {
            this.close();
            return;
          }
        }.bind(this));

        window.addEventListener('keydown', function (e) {
          if (e.keyCode == 27) {
            if (this.isOpen) {
              this.close();
            }
          }

          if (e.keyCode == 9 && this.isOpen) {
            this.focusCatch(e);
            return;
          }

        }.bind(this));

        this.modal.addEventListener('click', function (e) {
          if (!e.target.classList.contains('modal__dialog') && !e.target.closest('.modal__dialog') && this.isOpen) {
            this.close();
          }
        }.bind(this));
      }
    }

    open() {
      this.previousActiveElement = document.activeElement;

      this.modal.style.setProperty('--transition-time', `${this.speed / 1000}s`);
      this.modal.classList.add('is-open');
      this.disableScroll();

      this.modalContainer.classList.add('modal-open');
      this.modalContainer.classList.add(this.animation);

      setTimeout(() => {
        this.options.isOpen(this);
        this.modalContainer.classList.add('animate-open');
        this.isOpen = true;
        this.focusTrap();
      }, this.speed);
    }

    close() {
      if (this.modalContainer) {
        this.modalContainer.classList.remove('animate-open');
        this.modalContainer.classList.remove(this.animation);
        this.modal.classList.remove('is-open');
        this.modalContainer.classList.remove('modal-open');

        this.enableScroll();
        this.options.isClose(this);
        this.isOpen = false;
        this.focusTrap();
      }
    }

    focusCatch(e) {
      const focusable = this.modalContainer.querySelectorAll(this.focusElements);
      const focusArray = Array.prototype.slice.call(focusable);
      const focusedIndex = focusArray.indexOf(document.activeElement);

      if (e.shiftKey && focusedIndex === 0) {
        focusArray[focusArray.length - 1].focus();
        e.preventDefault();
      }

      if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
        focusArray[0].focus();
        e.preventDefault();
      }
    }

    focusTrap() {
      const focusable = this.modalContainer.querySelectorAll(this.focusElements);
      if (this.isOpen) {
        focusable[0].focus();
      } else {
        this.previousActiveElement.focus();
      }
    }

    disableScroll() {
      let pagePosition = window.scrollY;
      this.lockPadding();
      document.body.classList.add('disable-scroll');
      document.body.dataset.position = pagePosition;
      document.body.style.top = -pagePosition + 'px';
    }

    enableScroll() {
      let pagePosition = parseInt(document.body.dataset.position, 10);
      this.unlockPadding();
      document.body.style.top = 'auto';
      document.body.classList.remove('disable-scroll');
      window.scroll({
        top: pagePosition,
        left: 0
      });
      document.body.removeAttribute('data-position');
    }

    lockPadding() {
      let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
      this.fixBlocks.forEach((el) => {
        el.style.paddingRight = paddingOffset;
      });
      document.body.style.paddingRight = paddingOffset;
    }

    unlockPadding() {
      this.fixBlocks.forEach((el) => {
        el.style.paddingRight = '0px';
      });
      document.body.style.paddingRight = '0px';
    }
  }

  const modal = new Modal({
    isOpen: (modal) => {
      console.log(modal);
      console.log('opened');
    },
    isClose: () => {
      console.log('closed');
    },
  });
})
