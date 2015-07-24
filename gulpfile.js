var gulp = require('gulp'),
    eslint = require('gulp-eslint'),
    recess = require('gulp-recess');

gulp.task('eslint', function () {
  gulp.src([
    '*.jsx',
  ]).pipe(eslint(__dirname + '/.eslint.json'))
    .pipe(eslint.format());
});

gulp.task('lesslint', function () {
  gulp.src('./index.less')
    .pipe(recess())
    .pipe(recess.reporter());
});

gulp.task('lint', ['eslint', 'lesslint']);
