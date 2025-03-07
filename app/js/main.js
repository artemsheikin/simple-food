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

	burgerOpen?.addEventListener('click', () => toggleMenu(true));
	burgerClose?.addEventListener('click', () => toggleMenu(false));

	// Инициализация Swiper с кэшированием экземпляров
	let swipers = {};

	const initSwiper = (selector, options, key) => {
		if (window.innerWidth <= 1200) {
			if (!swipers[key]) {
				swipers[key] = new Swiper(selector, options);
			} else {
				swipers[key].update();
			}
		} else {
			if (swipers[key]) {
				swipers[key].destroy(true, true);
				delete swipers[key];
			}
		}
	};

	const updateSwipers = () => {
		initSwiper('.product-categories__swiper-menu', {
			slidesPerView: 'auto',
			spaceBetween: window.innerWidth <= 576 ? 10 : 20,
			grabCursor: true,
		}, 'product');

		const slidesPerView = window.innerWidth <= 576 ? 1 : window.innerWidth <= 992 ? 2 : 3;
		initSwiper('.top-restaurants__swiper', {
			slidesPerView,
			spaceBetween: 20,
			grabCursor: true,
			pagination: { el: '.top-restaurants__pagination', clickable: true },
		}, 'restaurants');
	};

	updateSwipers();
	window.addEventListener('resize', updateSwipers);

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
