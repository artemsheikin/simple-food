const { src, dest, watch, parallel, series } = require('gulp')
const scss = require('gulp-sass')(require('sass'))
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const uglify = require('gulp-uglify')
const imagemin = require('gulp-imagemin')
const del = require('del')
const browserSync = require('browser-sync').create()
const fileInclude = require('gulp-file-include')
const svgSprite = require('gulp-svg-sprite')

function browsersync() {
	browserSync.init({
		server: {
			baseDir: 'app/',
		},
		notify: false,
	})
}

function styles() {
	return src('app/scss/style.scss')
		.pipe(scss({ outputStyle: 'compressed' }))
		.pipe(concat('style.min.css'))
		.pipe(
			autoprefixer({
				overrideBrowserslist: ['last 10 versions'],
				grid: true,
			})
		)
		.pipe(dest('app/css'))
		.pipe(browserSync.stream())
}

function scripts() {
	return src([
		'node_modules/swiper/swiper-bundle.js', // Подключаем Swiper
		'app/js/main.js',
	])
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(dest('app/js'))
		.pipe(browserSync.stream())
}

function images() {
	return src('app/images/**/*.*')
		.pipe(
			imagemin([
				imagemin.gifsicle({ interlaced: true }),
				imagemin.mozjpeg({ quality: 75, progressive: true }),
				imagemin.optipng({ optimizationLevel: 5 }),
				imagemin.svgo({
					plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
				}),
			])
		)
		.pipe(dest('dist/images'))
}

const htmlInclude = () => {
	return src(['app/html/*.html']) // Находит любой .html файл в папке "html", куда будем подключать другие .html файлы
		.pipe(
			fileInclude({
				prefix: '@',
				basepath: '@file',
			})
		)
		.pipe(dest('app')) // указываем, в какую папку поместить готовый файл html
		.pipe(browserSync.stream())
}

function watching() {
	watch(['app/scss/**/*.scss'], styles)
	watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts)
	watch(['app/**/*.html']).on('change', browserSync.reload)
	watch(['app/html/**/*.html'], htmlInclude)
	watch(['app/images/icons/*.svg'], svgSprites)
}

function build() {
	return src([
		'app/**/*.html',
		'app/css/style.min.css',
		'app/js/main.min.js',
		'app/images/**/*.*', // Добавляем изображения
	], {
		base: 'app',
	}).pipe(dest('dist'))
}
function cleanDist() {
	return del('dist')
}

function svgSprites() {
	return src('app/images/icons/*.svg') // выбираем в папке с иконками все файлы с расширением svg
		.pipe(
			svgSprite({
				mode: {
					stack: {
						sprite: '../sprite.svg', // указываем имя файла спрайта и путь
					},
				},
			})
		)
		.pipe(dest('app/images')) // указываем, в какую папку поместить готовый файл спрайта
}

exports.styles = styles
exports.scripts = scripts
exports.browsersync = browsersync
exports.watching = watching
exports.images = images
exports.cleanDist = cleanDist
exports.htmlInclude = htmlInclude
exports.build = series(cleanDist, images, build)
exports.svgSprites = svgSprites

exports.default = parallel(
	svgSprites,
	styles,
	htmlInclude,
	scripts,
	browsersync,
	watching
)
