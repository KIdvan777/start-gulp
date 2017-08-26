var gulp = require('gulp');
var sass = require('gulp-sass');
var min = require('gulp-clean-css');
var minifyHTML = require('gulp-minify-html');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
//var pngcrush = require('imagemin-pngcrush');

var browserSync = require('browser-sync').create();


gulp.task('sass', function(){
	gulp.src('start/style.scss')
	.pipe(sass())
	.pipe(autoprefixer())
	.pipe(gulp.dest('dev/css'));
});

gulp.task('min', function(){
 gulp.src('dev/css/**/*.*')
 	.pipe(concat('style.min.css'))
    .pipe(min({compatibility: 'ie8'}))
    .pipe(gulp.dest('public/css'));
});

gulp.task('html', function() {
  gulp.src('dev/*.html')
    .pipe( minifyHTML())
    .pipe(gulp.dest('public'));
});

gulp.task('js', function() {
  gulp.src('dev/js/**/*.*')
    .pipe(concat('script.min.js'))
    .pipe( uglify())
    .pipe(gulp.dest('public/js'))
});

gulp.task('img', function(){
	gulp.src('dev/images/*')
	.pipe(imagemin({
		progressive: true,
      	svgoPlugins: [{ removeViewBox: false }]
      	//use: [pngcrush()]
	}))
	.pipe(gulp.dest('public/img'));
});

gulp.task('serve', function(){
	browserSync.init({
		  server: 'dev'
	});
	browserSync.watch('dev/**/*.*').on('change',browserSync.reload);
});

gulp.task('default',[
	'sass',
	'min',
	'html',
	'js',
	'img',
	'serve'
	]);
