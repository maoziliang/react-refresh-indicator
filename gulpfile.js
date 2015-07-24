var gulp = require('gulp'),
    eslint = require('gulp-eslint');

gulp.task('eslint', function () {
  gulp.src([
    '*.jsx',
  ]).pipe(eslint(__dirname + '/.eslint.json'))
    .pipe(eslint.format());
});

