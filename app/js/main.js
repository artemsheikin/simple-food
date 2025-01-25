document.addEventListener('DOMContentLoaded', () => {
	// Переменные для меню
	const burgerButtons = document.querySelectorAll('.burger, .burgers');
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
		if (!e.target.closest('.burger, .burgers, .header__list')) {
			mobileMenu.classList.remove('menu--active');
			body.classList.remove('lock');
			logo.classList.remove('logo--active');
			body.style.backgroundColor = 'rgba(0, 0, 0, 0)';
		}
	});

	// Инициализация Swiper
	new Swiper('.testimonials-swiper__wrapper', {
		slidesPerView: 1,
		speed: 600,
		pagination: {
			el: '.testimonials-swiper__pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.testimonials-swiper__button-next',
			prevEl: '.testimonials-swiper__button-prev',
		},
		grabCursor: true,
	});

	// Фильтрация категорий товаров
	const list = document.querySelector('.product-categories__menu');
	const items = document.querySelectorAll('.product-categories__item');

	if (list) {
		list.addEventListener('click', (event) => {
			const target = event.target.closest('.product-categories__btn');
			if (!target) return;

			const targetId = target.dataset.id;

			// Убираем активный класс у всех кнопок
			document
				.querySelectorAll('.product-categories__btn--active')
				.forEach((btn) => btn.classList.remove('product-categories__btn--active'));

			// Добавляем активный класс на выбранную кнопку
			target.classList.add('product-categories__btn--active');

			// Фильтрация товаров по выбранной категории
			items.forEach((item) => {
				item.style.display = item.classList.contains(targetId) ? 'grid' : 'none';
			});
		});

		// Устанавливаем начальное состояние фильтрации
		const defaultCategory = document.querySelector('[data-id="burgers"]');
		if (defaultCategory) {
			defaultCategory.classList.add('product-categories__btn--active'); // Активируем кнопку "burgers"
			items.forEach((item) => {
				item.style.display = item.classList.contains('burgers') ? 'grid' : 'none';
			});
		}
	}

});
