var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');


var paths = {
    pages: ['src/*.html'],
    clientDest: 'bin/www'
};

gulp.task('client', ['copy-html'], function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['client/gui/board.ts', 'client/gui/index.ts'],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(paths.clientDest));
});

gulp.task('copy-html', function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest(paths.clientDest));
});