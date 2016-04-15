var gulp = require('gulp');
var uglify = require('gulp-uglifyjs');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');

gulp.task('dist', () => {
	gulp.src('./browser.js')
		.pipe(browserify())
		.pipe(uglify())
		.pipe(rename('jacksonparser.min.js'))
		.pipe(gulp.dest('./dist'))
});