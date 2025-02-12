document.addEventListener('DOMContentLoaded', () => {
	// Переменные для меню
	const burgerButtons = document.querySelectorAll('.burger, .burger-one');
	const mobileMenu = document.querySelector('.header__list');
	const logo = document.querySelector('.logo');
	const body = document.body;

	// Функция переключения меню
	function toggleMenu() {
		const isMenuActive = mobileMenu.classList.toggle('menu--active');
		body.classList.toggle('lock', isMenuActive);
		logo.classList.toggle('logo--active', isMenuActive);
		body.style.transition = 'background-color 0.8s ease';
		body.style.backgroundColor = isMenuActive ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0)';
	}

	// Обработчики клика для кнопок бургер-меню
	burgerButtons.forEach((button) => button.addEventListener('click', toggleMenu));

	// Закрытие меню при клике вне его области
	document.addEventListener('click', (e) => {
		if (!e.target.closest('.burger, .burger-one, .header__list')) {
			mobileMenu.classList.remove('menu--active');
			body.classList.remove('lock');
			logo.classList.remove('logo--active');
			body.style.backgroundColor = 'rgba(0, 0, 0, 0)';
		}
	});

	// Инициализация Swiper
	new Swiper('.testimonials__wrapper', {
		slidesPerView: 1,
		speed: 600,
		pagination: {
			el: '.testimonials__pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.testimonials__button-next',
			prevEl: '.testimonials__button-prev',
		},
		grabCursor: true,
	});

	// Фильтрация товаров по `data-category`
	const list = document.querySelector('.product-categories__menu');
	const items = document.querySelectorAll('.product-categories__item');

	if (list) {
		list.addEventListener('click', (event) => {
			const target = event.target.closest('.product-categories__btn');
			if (!target) return;

			const buttons = list.querySelectorAll('.product-categories__btn');
			const targetCategory = target.dataset.category;

			// Убираем активный класс у всех кнопок
			buttons.forEach(btn => {
				btn.classList.remove('product-categories__btn--active');
				btn.removeAttribute('tabindex');
			});

			// Добавляем активный класс на выбранную кнопку
			target.classList.add('product-categories__btn--active');
			target.setAttribute('tabindex', '-1');

			// Фильтрация товаров по `data-category`
			items.forEach(item => {
				item.style.display = item.dataset.category === targetCategory ? 'grid' : 'none';
			});
		});

		// Устанавливаем начальное состояние (по умолчанию "burgers")
		const defaultCategory = list.querySelector('[data-category="burgers"]');
		if (defaultCategory) {
			defaultCategory.classList.add('product-categories__btn--active');
			defaultCategory.setAttribute('tabindex', '-1');

			items.forEach(item => {
				item.style.display = item.dataset.category === 'burgers' ? 'grid' : 'none';
			});
		}
	}
});
