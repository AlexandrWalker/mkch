// const { init } = require("browser-sync");

(() => {
  document.addEventListener('DOMContentLoaded', () => {

    var product__slider = new Swiper(".product__slider-init", {
      slidesPerView: 2,
      spaceBetween: 10,
      speed: 600,
      mousewheel: {
        forceToAxis: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        521: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        769: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
    });

    var history__slider = new Swiper(".history__slider-init", {
      slidesPerView: "auto",
      spaceBetween: 0,
      slidesPerGroup: 1,
      watchSlidesProgress: true,
      speed: 600,
      init: false,
      mousewheel: {
        forceToAxis: true,
      },
      on: {
        slideChange: () => updateLineFills(history__slider),
      },
    });

    updateLineFills(history__slider);

    /**
     * Обновление состояния линий в слайдере.
     * Активные линии соответствуют текущему слайду и всем предыдущим.
     *
     * @param {Swiper} history__slider - Экземпляр слайдера Swiper.
     */
    function updateLineFills(history__slider) {
      const { slides, activeIndex } = history__slider;

      slides.forEach((slide, index) => {
        const lineSpan = slide.querySelector('.history__slider-line span');
        lineSpan?.classList.toggle('active', index <= activeIndex);
      });
    }

    var values__thumbs = new Swiper(".values__thumbs-init", {
      spaceBetween: 30,
      speed: 600,
      loop: true,
      watchSlidesProgress: true,
      grabCursor: false,
      mousewheel: false,
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
      },
      on: {
        touchEnd: function (s, e) {
          let range = 5;
          let diff = s.touches.diff = s.isHorizontal() ? s.touches.currentX - s.touches.startX : s.touches.currentY
            - s.touches.startY
          if (diff < range || diff > -range) s.allowClick = true;
        }
      },
    });

    var values__slider = new Swiper(".values__slider-init", {
      spaceBetween: 30,
      speed: 600,
      loop: true,
      grabCursor: true,
      mousewheel: {
        forceToAxis: true,
      },
      navigation: {
        prevEl: ".swiper-button-prev",
        nextEl: ".swiper-button-next",
      },
    });

    values__thumbs.controller.control = values__slider;
    values__slider.controller.control = values__thumbs;

    function harmonicFunc() {
      const items = document.querySelectorAll('.work__item'),
        itemsActive = document.getElementsByClassName('work__item-active'),
        worthRePrev = document.getElementsByClassName('re-prev'),
        worthPrev = document.getElementsByClassName('prev'),
        worthNext = document.getElementsByClassName('next'),
        worthReNext = document.getElementsByClassName('re-next');

      items.forEach(element => {
        if (element !== items[0]) {
          element.addEventListener('mouseover', function () {
            if (itemsActive.length > 0 && itemsActive[0] !== this) {
              itemsActive[0].classList.remove('work__item-active');
            }
            if (worthRePrev.length > 0) {
              worthRePrev[0].classList.remove('re-prev');
            }
            if (worthPrev.length > 0) {
              worthPrev[0].classList.remove('prev');
            }
            if (worthNext.length > 0) {
              worthNext[0].classList.remove('next');
            }
            if (worthReNext.length > 0) {
              worthReNext[0].classList.remove('re-next');
            }

            this.classList.add('work__item-active');

            var prePrev = this.previousElementSibling;
            var preNext = this.nextElementSibling;

            if (this.previousElementSibling) {
              this.previousElementSibling.classList.add('prev');

              if (prePrev.previousElementSibling) {
                prePrev.previousElementSibling.classList.add('re-prev');
              }
            }
            if (this.nextElementSibling) {
              this.nextElementSibling.classList.add('next');

              if (preNext.nextElementSibling) {
                preNext.nextElementSibling.classList.add('re-next');
              }
            }
          });
          element.addEventListener('mouseout', function () {
            if (worthRePrev.length > 0) {
              worthRePrev[0].classList.remove('re-prev');
            }
            if (worthPrev.length > 0) {
              worthPrev[0].classList.remove('prev');
            }
            if (worthNext.length > 0) {
              worthNext[0].classList.remove('next');
            }
            if (worthReNext.length > 0) {
              worthReNext[0].classList.remove('re-next');
            }
            items[0].classList.add('work__item-active');
            this.classList.remove('work__item-active');
            if (items[0].nextElementSibling) {
              items[0].nextElementSibling.classList.add('next');
              items[1].nextElementSibling.classList.add('re-next');
            }
          });
        }
      });
    }
    harmonicFunc();

    function accordionFunc() {
      var accordionHead = document.querySelectorAll('.accordion'),
        accordionActive = document.getElementsByClassName('active');

      Array.from(accordionHead).forEach(function (accordionItem, i, accordionHead) {
        accordionItem.addEventListener('click', function (e) {
          if (accordionActive.length > 0 && accordionActive[0] !== this) {
            accordionActive[0].classList.remove('active');
          }
          this.classList.toggle('active');
          console.log('ass');

          if (document.getElementById('menu')) {
            const menu = document.getElementById('menu');
            if (menu.querySelector('.active')) {
              menu.classList.add('menu-active');
            } else {
              menu.classList.remove('menu-active');
            }
          }
        });
      });
    }
    accordionFunc();

    /**
     * Активация любого количества модальных окон
     */
    function modalFunc() {
      var modal__btn = document.querySelector('.modal__btn');

      if (!modal__btn) {
        return;
      } else {

        var close = document.querySelectorAll('.modal__close-btn');
        var openBtn = document.querySelectorAll('.modal__btn');

        Array.from(openBtn, openButton => {
          openButton.addEventListener('click', e => {

            let open = document.getElementsByClassName('open');

            if (open.length > 0 && open[0] !== this) {
              open[0].classList.remove('open');
            }

            let modalId = e.target.getAttribute('data-id');
            if (modalId) {
              document.getElementById(modalId).classList.add('open');
              document.body.classList.add('no-scroll');
            } else {
              return
            }

            Array.from(close, closeButton => {
              closeButton.addEventListener('click', e => {
                document.getElementById(modalId).classList.remove("open");
                document.body.classList.remove('no-scroll');
              });

              window.addEventListener('keydown', (e) => {
                if (e.key === "Escape") {
                  document.getElementById(modalId).classList.remove("open")
                  document.body.classList.remove('no-scroll');
                }
              });

              document.querySelector(".modal.open .modal__box").addEventListener('click', event => {
                event._isClickWithInModal = true;
              });

              document.getElementById(modalId).addEventListener('click', event => {
                if (event._isClickWithInModal) return;
                event.currentTarget.classList.remove('open');
                document.body.classList.remove('no-scroll');
              });
            });
          });
        });
      }
    };
    modalFunc();

    /**
     * Управляет поведением меню-бургера.
     */
    function burgerNav() {
      const burger = document.getElementById('burger');
      const menu = document.getElementById('menu');
      const closeButton = document.querySelector('.menu__close');
      const overlay = document.querySelector('.menu__overlay');

      /**
       * Переключает видимость меню.
       */
      const toggleMenu = () => {
        const isOpened = burger.classList.toggle('burger--opened');
        menu.classList.toggle('menu--opened', isOpened);
        lenis.stop();
      };

      /**
       * Закрывает меню.
       */
      const closeMenu = () => {
        burger.classList.remove('burger--opened');
        menu.classList.remove('menu--opened');

        const accordionActive = menu.getElementsByClassName('active');

        if (accordionActive.length > 0 && accordionActive[0] !== this) {
          accordionActive[0].classList.remove('active');
        }

        menu.classList.remove('menu-active');

        lenis.start();
      };

      // Открытие/закрытие меню по клику на бургер
      burger.addEventListener('click', toggleMenu);

      // Закрытие меню по клику на кнопку закрытия или на overlay
      [closeButton, overlay].forEach((element) => element.addEventListener('click', closeMenu));

      // Закрытие меню при клике вне области меню и бургера
      document.addEventListener('click', (event) => {
        if (!menu.contains(event.target) && !burger.contains(event.target)) {
          closeMenu();
        }
      });

      document.querySelectorAll('.menu__list a').forEach((element) => element.addEventListener('click', closeMenu));
    }
    burgerNav();

    const numbs = document.querySelector('.numbs');
    if (numbs) {
      function counter(array, time = 2000) {
        let n = 0;
        const num = Number(array.dataset.val);
        let interval = setInterval(() => {
          n < num ? (n += num / (time / 10)) : clearInterval(interval);
          n < num ? (n += num / (time / 10)) : numbs.classList.add('active');
          array.classList.contains('frac')
            ? (array.innerHTML = new Intl.NumberFormat('ru-RU').format(n.toFixed(1)))
            : (array.innerHTML = new Intl.NumberFormat('ru-RU').format(Math.round(n)));
        }, 10);
      }

      const numbBoxes = document.querySelectorAll('.numbs');
      numbBoxes.forEach((numbBox) => {
        const numbs = numbBox.querySelectorAll('.number');
        numbs.forEach((numb) => {
          gsap.to(numb, {
            scrollTrigger: {
              trigger: numbBox,
              start: `top 80%`,
              // start: `top 60%`,
              // markers: true,
            },
            onStart: () => counter(numb),
          });
        });
      });
    }

    const searchBtn = document.getElementById('search__btn');
    if (searchBtn) {
      searchBtn.addEventListener('click', function () {

        searchBtn.parentNode.classList.toggle('search--show');

        window.addEventListener('keydown', (e) => {
          if (e.key === "Escape") {
            searchBtn.parentNode.classList.remove("search--show")
          }
        });

        document.addEventListener('click', (e) => {
          const withinBoundaries = e.composedPath().includes(searchBtn.parentNode);

          if (!withinBoundaries) {
            searchBtn.parentNode.classList.remove("search--show")
          }
        })
      });
    }

    /**
     * Управляет переключением вкладок на странице.
     * Добавляет и удаляет классы активности для кнопок и панелей вкладок.
     * Поддерживает вложенные табы любой глубины и сохраняет активное состояние у вложенных табов при переключении внешних.
     */
    function tabsFunc() {
      document.querySelectorAll('.tabs').forEach((tabsContainer) => {
        tabsContainer.addEventListener('click', (event) => {
          const tabsBtn = event.target.closest('.tabs__btn');
          if (!tabsBtn || !tabsContainer.contains(tabsBtn)) return;

          // Останавливаем всплытие, чтобы вложенные табы не влияли на родительские
          event.stopPropagation();

          // Ищем ближайший контейнер, к которому принадлежит нажатая кнопка
          const currentTabsContainer = tabsBtn.closest('.tabs');
          if (!currentTabsContainer) return;

          // Сбрасываем активные состояния кнопок и панелей только внутри текущего уровня
          const tabsBtns = Array.from(currentTabsContainer.querySelectorAll('.tabs__btn'));
          const tabsPanels = Array.from(currentTabsContainer.querySelectorAll('.tabs__panel'));
          const tabsFilter = Array.from(currentTabsContainer.querySelectorAll('.tabs__filter'));

          tabsBtns.forEach((btn) => {
            if (btn.closest('.tabs') === currentTabsContainer) {
              btn.classList.remove('tabs__btn--active');
            }
          });

          tabsPanels.forEach((panel) => {
            if (panel.closest('.tabs') === currentTabsContainer) {
              panel.classList.remove('tabs__panel--active');
            }
          });

          tabsFilter.forEach((filter) => {
            if (filter.closest('.tabs') === currentTabsContainer) {
              filter.classList.remove('tabs__filter--active');
              filter.parentNode.classList.remove('show');
            }
          });

          // Устанавливаем активное состояние для выбранной вкладки
          tabsBtn.classList.add('tabs__btn--active');
          const targetPanel = currentTabsContainer.querySelectorAll(
            `.tabs__panel[data-tab="${tabsBtn.dataset.tab}"]`,
          );
          const targetFilter = currentTabsContainer.querySelectorAll(
            `.tabs__filter[data-tab="${tabsBtn.dataset.tab}"]`,
          );
          if (targetPanel) {
            targetPanel.forEach(targetPanels => {
              targetPanels.classList.add('tabs__panel--active');
            });
          }
          if (targetFilter) {
            targetFilter.forEach(targetFilters => {
              targetFilters.classList.add('tabs__filter--active');
              targetFilters.parentNode.classList.add('show');
            });
          }
        });

        tabsContainer.addEventListener('click', (event) => {
          const tabsBtn = event.target.closest('.tabs__c_btn');
          if (!tabsBtn || !tabsContainer.contains(tabsBtn)) return;

          // Останавливаем всплытие, чтобы вложенные табы не влияли на родительские
          event.stopPropagation();

          // Ищем ближайший контейнер, к которому принадлежит нажатая кнопка
          const currentTabsContainer = tabsBtn.closest('.tabs');
          if (!currentTabsContainer) return;

          // Сбрасываем активные состояния кнопок и панелей только внутри текущего уровня
          const tabsBtns = Array.from(currentTabsContainer.querySelectorAll('.tabs__c_btn'));
          const tabsCatalog = Array.from(currentTabsContainer.querySelectorAll('.tabs__catalog'));

          tabsBtns.forEach((btn) => {
            if (btn.closest('.tabs') === currentTabsContainer) {
              btn.classList.remove('tabs__c_btn--active');
            }
          });

          tabsCatalog.forEach((catalog) => {
            if (catalog.closest('.tabs') === currentTabsContainer) {
              event.stopPropagation();
              catalog.classList.remove('tabs__catalog--active');
            }
          });

          // Устанавливаем активное состояние для выбранной вкладки
          tabsBtn.classList.add('tabs__c_btn--active');
          const targetCatalog = currentTabsContainer.querySelector(
            `.tabs__catalog[data-tab="${tabsBtn.dataset.tab}"]`,
          );
          if (targetCatalog) {
            targetCatalog.classList.add('tabs__catalog--active');
          }

          console.log(tabsBtn.dataset.tab);
          if (tabsBtn.dataset.tab == 'b2b') {
            tabsBtn.parentNode.parentNode.classList.add('filter__parent--active');
          } else {
            tabsBtn.parentNode.parentNode.classList.remove('filter__parent--active');
          }
        });
      });
    };
    tabsFunc();

    /**
     * Выпадашка
     */
    const dropdown = document.querySelector('.dropdown--js');
    if (dropdown) {
      let dropdowns = document.querySelectorAll('.dropdown--js');
      dropdowns.forEach(dropdown => {

        function updateSelected() {
          let selectedValue = dropdown.querySelector('.dropdown__value');
          let selectedOption = document.querySelector('.dropdown__radio:checked');
          let selectedLabel = selectedOption.parentElement.querySelector('.dropdown__label');
          let text = selectedLabel.textContent;
          let data = selectedLabel.dataset.tab;
          let selectedDropdown = dropdown.querySelector('.dropdown__selected--js');
          selectedDropdown.querySelector('span').textContent = text;
          selectedValue.dataset.value = text;
          selectedDropdown.dataset.tab = data;
        }

        function toggleClass(el, className, add) {
          let addClass = add;
          if (typeof addClass === 'undefined') {
            addClass = !el.classList.contains(className);
            dropdown.querySelector('.dropdown__selected--js').click();
          }
          if (addClass) {
            el.classList.add(className);
          } else {
            el.classList.remove(className);
          }
        }

        let radios = dropdown.querySelectorAll('.dropdown__radio');
        let root = dropdown;

        for (let i = 0; i < radios.length; ++i) {
          let radio = radios[i];
          radio.addEventListener('change', function () {
            updateSelected();
          });
          radio.addEventListener('click', function () {
            toggleClass(root, 'is-active', false);
          });
        }

        let selectedLabel = dropdown.querySelector('.dropdown__selected--js');
        selectedLabel.addEventListener('click', function () {
          toggleClass(root, 'is-active');
        });

        // updateSelected();
      });
    }

    $(window).on('resize load', function () {

      const headerPhone = document.getElementById('header-phone');

      if (headerPhone) {
        if (window.innerWidth <= 520) {
          headerPhone.innerHTML = 'Связаться';
        } else {
          headerPhone.innerHTML = headerPhone.dataset.value;
        }
      }

      const cookieBtn = document.getElementById('cookie-btn');

      if (cookieBtn) {
        if (window.innerWidth <= 520) {
          cookieBtn.innerHTML = 'Ок';
        } else {
          cookieBtn.innerHTML = 'Принять';
        }
      }

      const productHeadDownload = document.querySelector('.product__head-download');

      if (productHeadDownload) {
        if (window.innerWidth <= 768) {
          productHeadDownload.querySelector('span').innerHTML = 'Каталог продукции';
        } else {
          productHeadDownload.querySelector('span').innerHTML = productHeadDownload.querySelector('span').dataset.value;
        }
      }
    });

    /**
     * Инициализация TransferElements
     */
    const madeLink = document.getElementById('made-link');
    const roskachestvo = document.getElementById('roskachestvo');
    const productDownload = document.querySelector('.product__head-download');
    const videoLink = document.querySelector('.video__link');
    const newsMain = document.querySelector('.news--main');

    if (madeLink) {
      new TransferElements(
        {
          sourceElement: madeLink,
          breakpoints: {
            768: {
              targetElement: document.querySelector('.transfer-pos--1')
            }
          },
        }
      );
    }
    if (roskachestvo) {
      new TransferElements(
        {
          sourceElement: roskachestvo,
          breakpoints: {
            768: {
              targetElement: document.querySelector('.transfer-pos--2')
            }
          },
        }
      );
    }
    if (productDownload) {
      new TransferElements(
        {
          sourceElement: productDownload,
          breakpoints: {
            768: {
              targetElement: document.querySelector('.product__body')
            }
          },
        }
      );
    }
    if (videoLink) {
      new TransferElements(
        {
          sourceElement: videoLink,
          breakpoints: {
            768: {
              targetElement: document.querySelector('.about__content')
            }
          },
        }
      );
    }
    if (newsMain) {
      new TransferElements(
        {
          sourceElement: newsMain.querySelector('.news__head-btn'),
          breakpoints: {
            768: {
              targetElement: newsMain.querySelector('.news__inner')
            }
          },
        }
      );
    }

    /**
     * Инициализация Lenis и ScrollTrigger
     */
    // Initialize a new Lenis instance for smooth scrolling
    const lenis = new Lenis({
      anchors: {
        offset: 100,
        onComplete: () => {
          console.log('scrolled to anchor')
        }
      }
    });

    // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
    // This ensures Lenis's smooth scroll animation updates on each GSAP tick
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // Convert time from seconds to milliseconds
    });

    // Disable lag smoothing in GSAP to prevent any delay in scroll animations
    gsap.ticker.lagSmoothing(0);

    gsap.registerPlugin(ScrollTrigger);

    $('.video__link').fancybox({
      openEffect: 'none',
      closeEffect: 'none',
      helpers: {
        media: {}
      }
    });

    const parallaxImgContainers = document.querySelectorAll('[data-animation="parallax-img"]');
    parallaxImgContainers.forEach(parallaxImgContainer => {
      const image = parallaxImgContainer.querySelector('img');
      gsap.fromTo(image,
        { y: '-7%' },
        {
          y: '7%',
          scrollTrigger: {
            trigger: parallaxImgContainer,
            start: 'top 60%',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    });

    $(window).on('resize load', function () {
      // window.addEventListener('resize load', function () {

      if (window.innerWidth <= '768') {
        history__slider.init();
      } else {
        /* history animation */
        const panelsContainers = document.getElementById("history__slider");

        if (panelsContainers) {
          let panelsContainer = document.querySelector("#history__slider"), tween;
          const panels = gsap.utils.toArray("#history__slider .history__slide");

          tween = gsap.to(panels, {
            x: () => -1 * (panelsContainer.scrollWidth - (innerWidth / 3)),
            ease: "none",
            scrollTrigger: {
              trigger: "#history__inner",
              pin: true,
              start: "top 20%",
              scrub: 1,
              end: () => "+=" + (panelsContainer.scrollWidth - innerWidth),
              // markers: true,
            }
          });
        }

        $(window).on('scroll', function () {

          const story__slides = document.querySelectorAll('.history__slide');

          story__slides.forEach(story__slide => {
            if (story__slide.getBoundingClientRect().left < window.innerWidth / 3 && story__slide.getBoundingClientRect().right > window.innerWidth / 3) {
              story__slide.classList.add('swiper-slide-active');
            } else {
              story__slide.classList.remove('swiper-slide-active');
            }
          });
        });
      }
    });

    if (('; ' + document.cookie).split(`; COOKIE_ACCEPT=`).pop().split(';')[0] !== '1') {
      const cookiesNotify = document.getElementById('cookie');

      if (cookiesNotify) {
        cookiesNotify.style.display = 'block';
      }
    }

  });
})();

function checkCookies() {
  document.cookie = 'COOKIE_ACCEPT=1;path=\'/\';expires:' + (new Date(new Date().getTime() + 86400e3 * 365).toUTCString());
  document.getElementById('cookie').remove();
}