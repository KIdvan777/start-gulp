var gulp = require('gulp');
var sass = require('gulp-sass');
var min = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');

var browserSync = require('browser-sync').create();


gulp.task('sass', function(){
	gulp.src('start/style.scss')
	.pipe(sass())
	.pipe(autoprefixer())
	.pipe(gulp.dest('dev/css'));
});

gulp.task('min', function(){
 gulp.src('dev/css/*.css')
    .pipe(min({compatibility: 'ie8'}))
    .pipe(gulp.dest('public/css'));
});

gulp.task('serve', function(){
	browserSync.init({
		  server: 'dev'
	});
	browserSync.watch('dev/**/*.*').on('change',browserSync.reload);
});

gulp.task('watch', function(){
	gulp.watch('start/*.scss',['sass']);
	//gulp.watch('dev/css/*.css',['min']);
	
})
gulp.task('default',['sass','min','watch','serve']);