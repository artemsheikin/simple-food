document.addEventListener('DOMContentLoaded', () => {
	// Управление мобильным меню
	const burgerOpen = document.querySelector('.burger--open');
	const burgerClose = document.querySelector('.burger--close');
	const mobileMenu = document.querySelector('.header__wrapper');
	const body = document.body;
	const logo = document.querySelector('.header__logo');

	const toggleMenu = (isOpen) => {
		mobileMenu.classList.toggle('menu--active', isOpen);
		burgerClose.classList.toggle('burger--active', isOpen);
		logo.classList.toggle('logo--active', isOpen);
		body.classList.toggle('lock', isOpen);
	};

	// Открытие/закрытие через бургер
	burgerOpen?.addEventListener('click', () => toggleMenu(true));
	burgerClose?.addEventListener('click', () => toggleMenu(false));

	// Закрытие при клике вне меню
	document.addEventListener('click', (event) => {
		if (
			mobileMenu.classList.contains('menu--active') && // Меню открыто
			!mobileMenu.contains(event.target) && // Клик не по меню
			!burgerOpen.contains(event.target) // Клик не по кнопке открытия
		) {
			toggleMenu(false);
		}
	});

	let productSwiper = null;
	let restaurantsSwiper = null;

	const initProductSwiper = () => {
		if (window.innerWidth <= 1200 && window.innerWidth > 992) {
			// Инициализация слайдера, если ширина окна между 992 и 1200
			if (!productSwiper) {
				productSwiper = new Swiper('.product-categories__swiper-menu', {
					slidesPerView: 'auto',
					spaceBetween: window.innerWidth <= 576 ? 10 : 20,
					grabCursor: true,
				});
			} else {
				productSwiper.update();
			}
		} else if (productSwiper) {
			productSwiper.destroy(true, true);
			productSwiper = null;
		}
	};

	const initRestaurantsSwiper = () => {
		if (window.innerWidth <= 992) {
			// Инициализация слайдера при ширине меньше 992px
			const slidesPerView =
				window.innerWidth <= 576 ? 1 :
					window.innerWidth < 992 ? 2 : 3;

			if (!restaurantsSwiper) {
				restaurantsSwiper = new Swiper('.top-restaurants__swiper', {
					slidesPerView,
					spaceBetween: 20,
					grabCursor: true,
					pagination: {
						el: '.top-restaurants__pagination',
						clickable: true,
					},
				});
			} else {
				restaurantsSwiper.params.slidesPerView = slidesPerView;
				restaurantsSwiper.update();
			}
		} else if (restaurantsSwiper) {
			// Отключаем слайдер, если ширина больше или равна 992px
			restaurantsSwiper.destroy(true, true);
			restaurantsSwiper = null;
		}
	};

	const initSwipers = () => {
		initProductSwiper();
		initRestaurantsSwiper();
	};

	// Таймаут на ресайз, чтобы не дергало при каждом пикселе
	let resizeTimeout;
	window.addEventListener('resize', () => {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(initSwipers, 200);
	});

	initSwipers();
	new Swiper('.testimonials__wrapper', {
		slidesPerView: 1,
		speed: 600,
		pagination: { el: '.testimonials__pagination', clickable: true },
		navigation: { nextEl: '.testimonials__button-next', prevEl: '.testimonials__button-prev' },
		grabCursor: true,
	});

	// Фильтрация товаров по категориям
	const list = document.querySelector('.product-categories__menu');
	const items = document.querySelectorAll('.product-categories__item');

	if (list) {
		list.addEventListener('click', (event) => {
			const target = event.target.closest('.product-categories__btn');
			if (!target) return;

			list.querySelectorAll('.product-categories__btn').forEach(btn => btn.classList.remove('product-categories__btn--active'));
			target.classList.add('product-categories__btn--active');

			const category = target.dataset.category;
			items.forEach(item => item.style.display = item.dataset.category === category ? 'grid' : 'none');
		});

		const defaultCategory = list.querySelector('[data-category="burgers"]');
		defaultCategory?.classList.add('product-categories__btn--active');
		items.forEach(item => item.style.display = item.dataset.category === 'burgers' ? 'grid' : 'none');
	}
});  