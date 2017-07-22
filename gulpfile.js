const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
 
var cssMin = require('gulp-css');
 
gulp.task('css', function(){
  return gulp.src('src/**/*.css')
    .pipe(cssMin())
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(gulp.dest('public/'));
});