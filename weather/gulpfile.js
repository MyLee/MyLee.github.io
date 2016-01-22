//include gulp
var gulp = require('gulp');

//include plug-ins
var jshint = require('gulp-jshint');

//JS hint task
gulp.task('jhshint', function(){
    gulp.src('./src/scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});