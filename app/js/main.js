$(function () {
	let swiper = new Swiper('.testimonials-swiper', {
		slidesPerView: 1,
		loop: true,
		speed: 600, // Плавное перелистывание
		pagination: {
			el: '.testimonials-swiper__pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.testimonials-swiper__button-next',
			prevEl: '.testimonials-swiper__button-prev',
		},
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		grabCursor: true,
	})

	const list = document.querySelector('.categories__menu')
	const items = document.querySelectorAll('.product')
	const listItems = document.querySelectorAll('.categories__btn')

	function filter() {
		list.addEventListener('click', (event) => {
			// Найти ближайший элемент с классом 'categories__btn'
			const target = event.target.closest('.categories__btn')
			if (!target) return

			const targetId = target.dataset.id

			// Убедиться, что клик был по кнопке или её дочернему элементу
			listItems.forEach((listItem) =>
				listItem.classList.remove('categories__btn--active')
			)
			target.classList.add('categories__btn--active')

			switch (targetId) {
				case 'burgers':
				case 'pizza':
				case 'sandwiches':
				case 'asian-cuisine':
				case 'sets':
					getItems(targetId)
					break
			}
		})
	}

	function getItems(className) {
		items.forEach((item) => {
			if (item.classList.contains(className)) {
				item.style.display = 'grid'
			} else {
				item.style.display = 'none'
			}
		})
	}

	// Изначально показываем бургеры и устанавливаем активный класс на кнопку бургеров
	getItems('burgers')
	const initialActiveButton = document.querySelector('[data-id="burgers"]')
	if (initialActiveButton) {
		initialActiveButton.classList.add('categories__btn--active')
	}

	filter()
})
